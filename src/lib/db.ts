import type { Db } from "mongodb";
import clientPromise from "@/lib/mongodb";

type DbEnv = "dev" | "live";

function resolveDbEnv(raw: string | undefined): DbEnv | null {
  if (!raw) return null;
  const normalized = raw.trim().toLowerCase();
  if (normalized === "dev") return "dev";
  if (normalized === "live" || normalized === "prod" || normalized === "production") return "live";
  return null;
}

export function getMongoDbName(): string {
  if (process.env.MONGODB_DB_NAME) return process.env.MONGODB_DB_NAME;

  const envFromVar = resolveDbEnv(process.env.MONGODB_DB_ENV);
  const envFromNode: DbEnv = process.env.NODE_ENV === "production" ? "live" : "dev";
  const selectedEnv = envFromVar ?? envFromNode;

  const uriDbName = (() => {
    try {
      const uri = process.env.MONGODB_URI;
      if (!uri) return null;
      const url = new URL(uri);
      const dbName = url.pathname?.replace(/^\//, "")?.trim();
      return dbName ? dbName : null;
    } catch {
      return null;
    }
  })();

  if (selectedEnv === "live") return process.env.MONGODB_DB_NAME_LIVE ?? "live";
  return process.env.MONGODB_DB_NAME_DEV ?? uriDbName ?? "dev";
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(getMongoDbName());
}
