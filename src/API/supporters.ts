import type { ProjectKey } from "../config/projects";
import { supportersApiUrl } from "./config";

export type Supporter = {
  donor_name: string;
  project_key: ProjectKey;
  total_satang: string;
  donation_count: number;
};

export type SupportersPage = {
  supporters: Supporter[];
  hasMore: boolean;
  nextOffset: number;
};

export function isSupportersApiConfigured(): boolean {
  return Boolean(supportersApiUrl);
}

export async function getSupporters(
  project: ProjectKey,
  offset = 0,
  limit = 30,
): Promise<SupportersPage> {
  if (!supportersApiUrl)
    throw new Error("Supporters API URL is not configured");
  const url = new URL(supportersApiUrl, window.location.origin);
  url.searchParams.set("offset", String(offset));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("project", project);
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok)
    throw new Error(`Supporters API returned HTTP ${response.status}`);
  const page = (await response.json()) as Omit<SupportersPage, 'nextOffset'>;
  return {
    supporters: page.supporters.filter((supporter) => supporter.project_key === project),
    hasMore: page.hasMore,
    nextOffset: offset + page.supporters.length,
  };
}
