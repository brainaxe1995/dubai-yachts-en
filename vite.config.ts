// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { writeReport } from "./scripts/seo-audit.mjs";

/**
 * Runs the SEO validation on every build (and once on dev server start),
 * regenerates src/data/seo-audit.json and fails production builds on errors.
 */
function seoValidationPlugin() {
  return {
    name: "seo-validation",
    apply: () => true,
    buildStart(this: { warn: (m: string) => void; error: (m: string) => never }) {
      let report;
      try {
        report = writeReport();
      } catch (err) {
        this.warn(`SEO validation could not run: ${(err as Error).message}`);
        return;
      }
      const { errors, warnings, routes } = report.summary;
      const lines: string[] = [];
      for (const i of report.globalIssues) lines.push(`  [${i.level}] ${i.rule}: ${i.message}`);
      for (const r of report.routes)
        for (const i of r.issues) lines.push(`  [${i.level}] ${r.path} — ${i.rule}: ${i.message}`);
      // eslint-disable-next-line no-console
      console.log(`\n[seo] ${routes} routes checked — ${errors} error(s), ${warnings} warning(s)`);
      if (lines.length) console.log(lines.join("\n"));
      if (errors > 0 && process.env["NODE_ENV"] === "production") {
        this.error(`SEO validation failed with ${errors} error(s). See /seo-audit for details.`);
      }
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Hostinger runs Node.js — pin preset so build produces .output/server/index.mjs for Node
  nitro: { preset: "node-server" },
  vite: {
    plugins: [seoValidationPlugin()],
  },
});
