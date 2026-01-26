import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { getRemoteConfigStatuses } from "@/lib/remoteConfigServer";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "no-store" } as const;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_GET = 60; // 60 requests per minute

function parseKeysParam(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean)
    .filter((k) => /^[a-zA-Z0-9_-]+$/.test(k));
}

export async function GET(request: NextRequest) {
  try {
    const rate = rateLimit(request, {
      prefix: "remote-config:get",
      windowMs: RATE_LIMIT_WINDOW,
      max: RATE_LIMIT_MAX_GET,
    });
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "عدد الطلبات كثير جداً. الرجاء المحاولة لاحقاً." },
        { status: 429, headers: { ...NO_STORE_HEADERS, ...rate.headers } }
      );
    }

    const { searchParams } = new URL(request.url);
    const keys = parseKeysParam(searchParams.get("keys"));
    if (keys.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid `keys` query param" },
        { status: 400, headers: { ...NO_STORE_HEADERS, ...rate.headers } }
      );
    }

    const configs = await getRemoteConfigStatuses(keys);

    return NextResponse.json({ configs }, { headers: { ...NO_STORE_HEADERS, ...rate.headers } });
  } catch (error) {
    console.error("Error fetching remote config:", error);
    return NextResponse.json(
      { error: "Failed to fetch remote config" },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}
