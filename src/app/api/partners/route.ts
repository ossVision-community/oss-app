import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getDb, isMongoConfigured } from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { isRemoteConfigEnabled } from "@/lib/remoteConfigServer";
import { partnerFormSchema } from "@/lib/validations";
import { PartnerInquiryData } from "@/lib/types";

export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_POST = 5; // 5 requests per minute
const RATE_LIMIT_MAX_GET = 20; // 20 requests per minute

const NO_STORE_HEADERS = { "Cache-Control": "no-store" } as const;

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

function isAuthorized(request: NextRequest): boolean {
  const provided = request.headers.get("x-api-key");
  const expected = process.env.API_SECRET_KEY;
  if (!provided || !expected) return false;
  return safeEqual(provided, expected);
}

function sanitizeString(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

function sanitizeData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export async function POST(request: NextRequest) {
  try {
    const rate = rateLimit(request, {
      prefix: "partners:post",
      windowMs: RATE_LIMIT_WINDOW,
      max: RATE_LIMIT_MAX_POST,
    });
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "عدد الطلبات كثير جداً. الرجاء المحاولة لاحقاً." },
        {
          status: 429,
          headers: {
            ...NO_STORE_HEADERS,
            ...rate.headers,
          },
        }
      );
    }

    if (!isMongoConfigured()) {
      return NextResponse.json(
        { error: "إرسال الطلبات غير متاح حالياً. الرجاء المحاولة لاحقاً." },
        { status: 503, headers: { ...NO_STORE_HEADERS, ...rate.headers } }
      );
    }

    const rawData = await request.json();
    const validationResult = partnerFormSchema.safeParse(rawData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "البيانات المدخلة غير صحيحة", details: validationResult.error.flatten() },
        { status: 400, headers: NO_STORE_HEADERS }
      );
    }

    const partnersOpen = await isRemoteConfigEnabled("partnerButton");
    if (!partnersOpen) {
      return NextResponse.json(
        { error: "باب الشراكات مقفل حالياً. قريباً!" },
        { status: 503, headers: { ...NO_STORE_HEADERS, ...rate.headers } }
      );
    }

    const partnerData = sanitizeData(validationResult.data as Record<string, unknown>);

    const db = await getDb();
    const collection = db.collection<PartnerInquiryData>("partners");

    const inquiry: PartnerInquiryData = {
      ...(partnerData as unknown as PartnerInquiryData),
      submittedAt: new Date(),
      status: "new" as const,
    };

    const result = await collection.insertOne(inquiry);

    return NextResponse.json(
      { message: "وصلتنا رسالتك، بنرجع لك قريباً", id: result.insertedId.toString() },
      { status: 201, headers: { ...NO_STORE_HEADERS, ...rate.headers } }
    );
  } catch (error) {
    console.error("Error saving partner inquiry:", error);
    return NextResponse.json(
      { error: "حدث خطأ في إرسال الطلب. الرجاء المحاولة مرة أخرى." },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const rate = rateLimit(request, {
      prefix: "partners:get",
      windowMs: RATE_LIMIT_WINDOW,
      max: RATE_LIMIT_MAX_GET,
    });
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "عدد الطلبات كثير جداً. الرجاء المحاولة لاحقاً." },
        { status: 429, headers: { ...NO_STORE_HEADERS, ...rate.headers } }
      );
    }

    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: "غير مصرح بالوصول" },
        { status: 401, headers: { ...NO_STORE_HEADERS, ...rate.headers } }
      );
    }

    if (!isMongoConfigured()) {
      return NextResponse.json(
        { error: "الخدمة غير متاحة حالياً" },
        { status: 503, headers: { ...NO_STORE_HEADERS, ...rate.headers } }
      );
    }

    const db = await getDb();
    const collection = db.collection<PartnerInquiryData>("partners");

    const inquiries = await collection
      .find({})
      .sort({ submittedAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json(inquiries, { headers: { ...NO_STORE_HEADERS, ...rate.headers } });
  } catch (error) {
    console.error("Error fetching partner inquiries:", error);
    return NextResponse.json(
      { error: "حدث خطأ في جلب الطلبات" },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}
