import raw from "@/data/seo-audit.json";
import type { SeoReport } from "../../scripts/seo-audit.d.mts";

export const seoReport = raw as unknown as SeoReport;
export type { SeoReport, SeoRoute, SeoIssue, SeoStructuredData } from "../../scripts/seo-audit.d.mts";
