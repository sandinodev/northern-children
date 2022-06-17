export const isClient = typeof window !== "undefined";
export const isServer = typeof window === "undefined";

export const isAnalyzing = process.env.ANALYZE === "true";
export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";

export const isLinkExternal = (url?: string) => {
  if (url?.includes(process.env.NEXT_PUBLIC_CMS_URL!)) return false;

  return ["http://", "https://", "www.", "mailto:", "tel:"].some((v) => url?.includes(v));
};

export const parsePublicToLocalHref = (href?: string) => {
  let url = href;

  // So we can use client side routes on localhost
  if (url && process.env.NEXT_PUBLIC_CMS_URL && url.includes(process.env.NEXT_PUBLIC_CMS_URL)) {
    url = url.replace(process.env.NEXT_PUBLIC_CMS_URL, "/");
  }

  // For client side routes pointing to the homepage
  if (url && url.includes("home")) url = "/";

  return url;
};

export const rewriteImageSrc = (src?: string) =>
  src?.replace("northern-children-dev.fforward", "c0083.paas1.tff").replace("http://", "https://");
