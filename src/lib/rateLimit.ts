import { NextRequest } from "next/server";

type StoreRecord = { count: number; resetTime: number };

const rateLimitStore = new Map<string, StoreRecord>();

export type RateLimitOptions = {
  prefix: string;
  windowMs: number;
  max: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfterSeconds: number | null;
  headers: Record<string, string>;
};

export function getRateLimitKey(request: NextRequest): string {
  const candidates = [
    request.headers.get("cf-connecting-ip"),
    request.headers.get("x-real-ip"),
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  ].filter(Boolean) as string[];
  return candidates[0] ?? "unknown";
}

function buildHeaders(result: Omit<RateLimitResult, "headers">): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetTime / 1000)),
  };
  if (result.retryAfterSeconds != null) headers["Retry-After"] = String(result.retryAfterSeconds);
  return headers;
}

export function rateLimit(request: NextRequest, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();

  if (rateLimitStore.size > 10_000) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (now > v.resetTime) rateLimitStore.delete(k);
    }
  }

  const ip = getRateLimitKey(request);
  const key = `${options.prefix}:${ip}`;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    const resetTime = now + options.windowMs;
    rateLimitStore.set(key, { count: 1, resetTime });
    const base = {
      allowed: true,
      limit: options.max,
      remaining: Math.max(0, options.max - 1),
      resetTime,
      retryAfterSeconds: null,
    } as const;
    return { ...base, headers: buildHeaders(base) };
  }

  if (record.count >= options.max) {
    const retryAfterSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
    const base = {
      allowed: false,
      limit: options.max,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfterSeconds,
    } as const;
    return { ...base, headers: buildHeaders(base) };
  }

  record.count++;
  const base = {
    allowed: true,
    limit: options.max,
    remaining: Math.max(0, options.max - record.count),
    resetTime: record.resetTime,
    retryAfterSeconds: null,
  } as const;
  return { ...base, headers: buildHeaders(base) };
}

