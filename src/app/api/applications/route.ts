import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { JoinApplicationData } from "@/lib/types";
import { joinFormSchema } from "@/lib/validations";

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
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
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: "عدد الطلبات كثير جداً. الرجاء المحاولة لاحقاً." },
        { status: 429 }
      );
    }

    const rawData = await request.json();
    
    // Server-side validation using Zod schema
    const validationResult = joinFormSchema.safeParse(rawData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "البيانات المدخلة غير صحيحة", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    // Sanitize validated data
    const applicationData = sanitizeApplicationData(validationResult.data as Record<string, unknown>);

    const client = await clientPromise;
    const db = client.db("dev");
    const collection = db.collection<JoinApplicationData>("applications");

    // Check if email already exists (use sanitized email)
    const existingApplication = await collection.findOne({
      email: applicationData.email as string,
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مسجل مسبقاً" },
        { status: 400 }
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
      },
      { status: 201 }
    );
  } catch (error) {
    // Don't expose internal errors to clients
    console.error("Error saving application:", error);
    return NextResponse.json(
      { error: "حدث خطأ في تقديم الطلب. الرجاء المحاولة مرة أخرى." },
      { status: 500 }
    );
  }
}

// Protected GET endpoint - requires API key
export async function GET(request: NextRequest) {
  try {
    // Check for API key authentication
    const apiKey = request.headers.get("x-api-key");
    const expectedApiKey = process.env.API_SECRET_KEY;
    
    if (!expectedApiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
        { error: "غير مصرح بالوصول" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("dev");
    const collection = db.collection<JoinApplicationData>("applications");

    const applications = await collection
      .find({})
      .sort({ submittedAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "حدث خطأ في جلب الطلبات" },
      { status: 500 }
    );
  }
}
