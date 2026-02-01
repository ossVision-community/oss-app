import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getDb } from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { isRemoteConfigEnabled } from "@/lib/remoteConfigServer";
import { JoinApplicationData } from "@/lib/types";
import { joinFormSchema } from "@/lib/validations";

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

// Sanitize string input to prevent XSS
function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .trim();
}

// Sanitize application data
function sanitizeApplicationData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(v => typeof v === "string" ? sanitizeString(v) : v);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rate = rateLimit(request, {
      prefix: "applications:post",
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

    const rawData = await request.json();
    
    // Server-side validation using Zod schema
    const validationResult = joinFormSchema.safeParse(rawData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "البيانات المدخلة غير صحيحة", details: validationResult.error.flatten() },
        { status: 400, headers: NO_STORE_HEADERS }
      );
    }

    // Sanitize validated data
    const applicationData = sanitizeApplicationData(validationResult.data as Record<string, unknown>);

    const db = await getDb();
    const collection = db.collection<JoinApplicationData>("applications");

    // Check if application already exists (use sanitized personal email)
    const existingApplication = await collection.findOne({
      $or: [
        { personalEmail: applicationData.personalEmail as string },
        // Backward compatibility for older records
        { email: applicationData.personalEmail as string } as unknown as Record<string, string>,
      ],
    });

    if (existingApplication) {
      return NextResponse.json(
        {
          message: "تم تقديم طلبك بنجاح",
          id: existingApplication._id.toString(),
          alreadySubmitted: true,
        },
        { status: 200, headers: { ...NO_STORE_HEADERS, ...rate.headers } }
      );
    }

    const applicationsOpen = await isRemoteConfigEnabled("applicationButton");
    if (!applicationsOpen) {
      return NextResponse.json(
        { error: "التقديم مقفل حالياً. قريباً!" },
        { status: 503, headers: { ...NO_STORE_HEADERS, ...rate.headers } }
      );
    }

    // Add metadata
    const application: JoinApplicationData = {
      ...(applicationData as unknown as JoinApplicationData),
      submittedAt: new Date(),
      status: "pending" as const,
    };

    const result = await collection.insertOne(application);

    return NextResponse.json(
      {
        message: "تم تقديم طلبك بنجاح",
        id: result.insertedId.toString(),
        alreadySubmitted: false,
      },
      { status: 201, headers: { ...NO_STORE_HEADERS, ...rate.headers } }
    );
  } catch (error) {
    // Don't expose internal errors to clients
    console.error("Error saving application:", error);
    return NextResponse.json(
      { error: "حدث خطأ في تقديم الطلب. الرجاء المحاولة مرة أخرى." },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}

// Protected GET endpoint - requires API key
export async function GET(request: NextRequest) {
  try {
    const rate = rateLimit(request, {
      prefix: "applications:get",
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

    const db = await getDb();
    const collection = db.collection<JoinApplicationData>("applications");

    const applications = await collection
      .find({})
      .sort({ submittedAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json(applications, { headers: { ...NO_STORE_HEADERS, ...rate.headers } });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "حدث خطأ في جلب الطلبات" },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}
