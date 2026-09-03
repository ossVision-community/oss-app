import { MongoClient, MongoClientOptions } from "mongodb";

const options: MongoClientOptions = {};

let clientPromise: Promise<MongoClient> | undefined;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/** Error thrown when the app is running without a MongoDB connection string. */
export class MongoNotConfiguredError extends Error {
  constructor() {
    super('Missing environment variable: "MONGODB_URI"');
    this.name = "MongoNotConfiguredError";
  }
}

export function getMongoUri(): string | undefined {
  const uri = process.env.MONGODB_URI?.trim();
  return uri ? uri : undefined;
}

export function isMongoConfigured(): boolean {
  return Boolean(getMongoUri());
}

/**
 * Connects lazily, on first use, so that importing this module never throws.
 * Next.js evaluates route modules at build time to collect page data; throwing
 * at module scope would fail the build on any machine without MONGODB_URI set.
 */
export function getMongoClient(): Promise<MongoClient> {
  const uri = getMongoUri();
  if (!uri) {
    return Promise.reject(new MongoNotConfiguredError());
  }

  // In development the promise is kept on `global` so it survives the module
  // reloads caused by HMR; in production a module-scoped promise is enough.
  // Either way the connection is created once and reused across requests.
  const cached =
    process.env.NODE_ENV === "development" ? global._mongoClientPromise : clientPromise;
  if (cached) return cached;

  const client = new MongoClient(uri, options);
  const connecting = client.connect().catch((error) => {
    // Don't cache a failed connection, so the next request can retry.
    if (process.env.NODE_ENV === "development") {
      global._mongoClientPromise = undefined;
    } else {
      clientPromise = undefined;
    }
    throw error;
  });

  if (process.env.NODE_ENV === "development") {
    global._mongoClientPromise = connecting;
  } else {
    clientPromise = connecting;
  }
  return connecting;
}
