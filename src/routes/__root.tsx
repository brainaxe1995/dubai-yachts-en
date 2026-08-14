import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { TrackingScripts } from "@/components/TrackingScripts";
import { DEFAULT_CONFIG } from "@/data/config";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "توت فن لليخوت | تأجير وحجز اليخوت الفاخرة في دبي" },
      {
        name: "description",
        content:
          "استمتع بخدمة تأجير يخوت في دبي مع يخوت فاخرة، أسعار تنافسية، رحلات خاصة، وطاقم محترف لجميع المناسبات.",
      },
      { name: "author", content: "توت فن لليخوت" },
      { property: "og:title", content: "توت فن لليخوت | تأجير وحجز اليخوت الفاخرة في دبي" },
      {
        property: "og:description",
        content: "يخوت فاخرة، حفلات ورحلات صيد في دبي بأسعار تبدأ من 450 درهم للساعة.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "توت فن لليخوت" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(DEFAULT_CONFIG.tracking.googleSiteVerification
        ? [{ name: "google-site-verification", content: DEFAULT_CONFIG.tracking.googleSiteVerification }]
        : []),
      ...(DEFAULT_CONFIG.tracking.bingSiteVerification
        ? [{ name: "msvalidate.01", content: DEFAULT_CONFIG.tracking.bingSiteVerification }]
        : []),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://dubai-yacht.ae/#website",
              name: "توت فن لليخوت",
              alternateName: "Toot Fun Yacht Rental",
              url: "https://dubai-yacht.ae/",
              inLanguage: "ar",
              publisher: { "@id": "https://dubai-yacht.ae/#organization" },
            },
            {
              "@type": "Organization",
              "@id": "https://dubai-yacht.ae/#organization",
              name: "توت فن لليخوت",
              url: "https://dubai-yacht.ae/",
              logo: "https://dubai-yacht.ae/favicon.png",
              areaServed: "Dubai, United Arab Emirates",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai Marina",
                addressRegion: "Dubai",
                addressCountry: "AE",
              },
            },
          ],
        }),
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@500;700;800;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFab />
        <TrackingScripts />
      </div>
    </QueryClientProvider>
  );
}
