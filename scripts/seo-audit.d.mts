export interface SeoIssue { level: "error" | "warning"; rule: string; message: string; routes?: string[] }
export interface SeoStructuredData {
  type: string;
  status: "valid" | "invalid" | "dynamic";
  message: string | null;
  missingRequired?: string[];
  missingRecommended?: string[];
  warnings?: string[];
  json?: string;
}
export interface SeoAlternate { hreflang: string; href: string }
export interface SeoRoute {
  file: string; path: string; title: string | null; description: string | null;
  ogTitle: string | null; ogDescription: string | null; ogUrl: string | null; ogImage: string | null;
  canonical: string | null; alternates: SeoAlternate[]; robots: string | null; noindex?: boolean;
  structuredData: SeoStructuredData[]; hasHead: boolean; issues: SeoIssue[];
}
export interface SeoReport {
  generatedAt: string; baseUrl: string; sitemapPaths: string[]; robotsSitemap: string | null;
  routes: SeoRoute[]; globalIssues: SeoIssue[];
  summary: { routes: number; errors: number; warnings: number };
}
export declare function audit(): SeoReport;
export declare function writeReport(): SeoReport;
export declare const BASE_URL: string;
