import { getDb, isMongoConfigured } from "@/lib/db";

type RemoteConfigDoc = {
  _id: string;
  status: boolean;
};

export async function getRemoteConfigStatuses(keys: string[]): Promise<Record<string, boolean>> {
  const uniqueKeys = Array.from(new Set(keys)).filter(Boolean);
  if (uniqueKeys.length === 0) return {};

  // Without a database the flags simply stay off, so the site still renders.
  if (!isMongoConfigured()) {
    return Object.fromEntries(uniqueKeys.map((key) => [key, false]));
  }

  const db = await getDb();
  const collection = db.collection<RemoteConfigDoc>("remote-config");

  const docs = await collection
    .find({ _id: { $in: uniqueKeys } }, { projection: { _id: 1, status: 1 } })
    .toArray();

  const configs: Record<string, boolean> = {};
  for (const key of uniqueKeys) configs[key] = false;
  for (const doc of docs) configs[doc._id] = Boolean(doc.status);
  return configs;
}

export async function isRemoteConfigEnabled(key: string): Promise<boolean> {
  const configs = await getRemoteConfigStatuses([key]);
  return Boolean(configs[key]);
}

