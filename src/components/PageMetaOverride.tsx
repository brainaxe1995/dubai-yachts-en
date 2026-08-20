import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { getConfig } from "@/data/config";

// Reads admin-edited per-page meta from localStorage and mutates document.title +
// <meta name="description"> after route change. Server-render still emits the route's
// baked-in defaults (SEO bots see those). Admin sees their overrides live in-browser;
// for permanent SEO publish, admin copies config snippet and dev bakes it in.
export function PageMetaOverride() {
  const location = useLocation();
  useEffect(() => {
    if (typeof document === "undefined") return;
    const cfg = getConfig();
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const key = cfg.pageMeta[path] || cfg.pageMeta[`${path}/`];
    if (!key) return;
    if (key.title && key.title.trim().length > 0) {
      document.title = key.title;
      const ogT = document.querySelector('meta[property="og:title"]');
      if (ogT) ogT.setAttribute("content", key.title);
    }
    if (key.description && key.description.trim().length > 0) {
      let desc = document.querySelector('meta[name="description"]');
      if (!desc) {
        desc = document.createElement("meta");
        desc.setAttribute("name", "description");
        document.head.appendChild(desc);
      }
      desc.setAttribute("content", key.description);
      const ogD = document.querySelector('meta[property="og:description"]');
      if (ogD) ogD.setAttribute("content", key.description);
    }
  }, [location.pathname]);
  return null;
}
