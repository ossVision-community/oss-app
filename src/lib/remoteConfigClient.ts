"use client";

type RemoteConfigsResponse = {
  configs?: Record<string, boolean>;
};

export async function fetchRemoteConfig(keys: string[]): Promise<Record<string, boolean>> {
  const params = new URLSearchParams({ keys: keys.join(",") });
  const response = await fetch(`/api/remote-config?${params.toString()}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  const json = (await response.json()) as RemoteConfigsResponse;
  return json.configs ?? {};
}

