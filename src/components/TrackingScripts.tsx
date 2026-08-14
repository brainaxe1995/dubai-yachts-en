import { useEffect } from "react";
import { getConfig } from "@/data/config";

export function TrackingScripts() {
  useEffect(() => {
    const cfg = getConfig();
    const t = cfg.tracking;

    if (t.gtmId) injectGtm(t.gtmId);
    if (t.ga4Id) injectGa4(t.ga4Id);
    if (t.googleAdsId) injectGoogleAds(t.googleAdsId);
    if (t.metaPixelId) injectMetaPixel(t.metaPixelId);
    if (t.tiktokPixelId) injectTikTokPixel(t.tiktokPixelId);
    if (t.snapchatPixelId) injectSnapchatPixel(t.snapchatPixelId);
  }, []);

  return null;
}

type WinExt = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  ttq?: unknown;
  snaptr?: (...args: unknown[]) => void;
};

function addScript(src: string, async = true) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = async;
  document.head.appendChild(s);
}

function addInlineScript(id: string, code: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.text = code;
  document.head.appendChild(s);
}

function injectGa4(id: string) {
  addScript(`https://www.googletagmanager.com/gtag/js?id=${id}`);
  addInlineScript(
    "ga4-init",
    `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`
  );
}

function injectGtm(id: string) {
  addInlineScript(
    "gtm-init",
    `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`
  );
}

function injectGoogleAds(id: string) {
  addScript(`https://www.googletagmanager.com/gtag/js?id=${id}`);
  addInlineScript(
    "gads-init",
    `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`
  );
}

function injectMetaPixel(id: string) {
  addInlineScript(
    "meta-pixel",
    `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`
  );
}

function injectTikTokPixel(id: string) {
  addInlineScript(
    "tiktok-pixel",
    `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${id}');ttq.page();}(window,document,'ttq');`
  );
}

function injectSnapchatPixel(id: string) {
  addInlineScript(
    "snap-pixel",
    `(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');snaptr('init','${id}');snaptr('track','PAGE_VIEW');`
  );
}

// Public helper — call this to fire conversion (WhatsApp click, form submit)
export function trackConversion(
  event: "book_click" | "call_click" | "whatsapp_click" | "contact_submit",
  data: Record<string, unknown> = {}
) {
  const w = window as WinExt;
  const cfg = getConfig();

  w.dataLayer?.push({ event, ...data });
  w.fbq?.("track", "Lead", data);
  w.snaptr?.("track", "SIGN_UP", data);
  if (cfg.tracking.googleAdsId && cfg.tracking.googleAdsConversionLabel && w.gtag) {
    w.gtag("event", "conversion", {
      send_to: `${cfg.tracking.googleAdsId}/${cfg.tracking.googleAdsConversionLabel}`,
      ...data,
    });
  }
}

export { getConfig };
