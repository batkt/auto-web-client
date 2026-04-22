import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

type RouterLike = {
  push: (href: string) => unknown;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * In production, CMS may still store full URLs to an old backend IP for /uploads.
 * Next.js image optimizer then fetches that host and gets 404. Rewrite to same-origin path.
 */
function rewriteLegacyUploadUrlForProduction(src: string): string {
  if (process.env.NODE_ENV !== "production") return src;
  if (!/^https?:\/\//i.test(src)) return src;
  try {
    const u = new URL(src);
    if (!u.pathname.startsWith("/uploads")) return src;
    if (u.hostname === "103.143.40.184") {
      return `${u.pathname}${u.search}`;
    }
  } catch {
    /* ignore */
  }
  return src;
}

/** Bases that must not be used for next/image in production (optimizer 404 / unreachable). */
function isInternalUploadBase(base: string): boolean {
  const t = base.trim().toLowerCase();
  if (!t) return true;
  try {
    const u = new URL(t);
    const h = u.hostname;
    return (
      h === "127.0.0.1" ||
      h === "localhost" ||
      h === "backend" ||
      h === "103.143.40.184"
    );
  } catch {
    return true;
  }
}

function resolveUploadsPath(path: string, base: string): string {
  const b = base.replace(/\/+$/, "");
  if (process.env.NODE_ENV !== "production") {
    return b ? `${b}${path}` : path;
  }
  if (b && !isInternalUploadBase(b)) {
    return `${b}${path}`;
  }
  return path;
}

export const getImageUrl = (image: string) => {
  if (!image) return "";
  const trimmed = image.trim();
  const resolved = rewriteLegacyUploadUrlForProduction(trimmed);

  if (resolved.startsWith("/uploads")) {
    const base = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/+$/, "");
    return resolveUploadsPath(resolved, base);
  }
  return resolved;
};

export const getClientImageUrl = (image: string) => {
  if (!image) return "";
  const trimmed = image.trim();
  const resolved = rewriteLegacyUploadUrlForProduction(trimmed);

  if (resolved.startsWith("/uploads")) {
    const base = (
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      ""
    ).replace(/\/+$/, "");
    return resolveUploadsPath(resolved, base);
  }
  return resolved;
};

export const queryStringBuilder = (params: Record<string, string>) => {
  const queryString = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryString.append(key, value);
    }
  });
  return queryString.toString();
};

export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);
  return format(date, "yyyy-MM-dd HH:mm:ss");
}

export const getEmbedUrl = (raw: string): string | null => {
  const url = raw?.trim();
  if (!url) return null;

  const withProtocol = /^https?:\/\//i.test(url) ? url : `https://${url}`;

  try {
    const u = new URL(withProtocol);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0]?.split("?")[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com"
    ) {
      const v = u.searchParams.get("v");
      if (v) {
        const id = v.split("/")[0];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      const parts = u.pathname.split("/").filter(Boolean);
      const special = parts.findIndex((p) =>
        ["embed", "shorts", "live"].includes(p)
      );
      if (special !== -1 && parts[special + 1]) {
        const id = parts[special + 1].split("?")[0];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
    }
  } catch {
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return `https://www.youtube.com/embed/${url}`;
    }
  }

  return null;
};

export const smoothScrollToElement = (
  elementId: string,
  offset: number = 0,
) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export const handleSmoothScroll = (
  href: string,
  router?: RouterLike,
  setIsMobileMenuOpen?: (open: boolean) => void,
) => {
  // Support both "#section" and "/#section" formats
  const isHashLink = href.startsWith("#") || href.startsWith("/#");
  if (!isHashLink) return false;

  const elementId = href.replace(/^\/?#/, "");
  const element = document.getElementById(elementId);

  if (element) {
    smoothScrollToElement(elementId, 80); // 80px offset for header height
    setIsMobileMenuOpen?.(false);
    return true;
  }

  // Navigate client-side to the hash without forcing a reload
  if (router) {
    router.push(`/#${elementId}`);

    // After navigation, try scrolling again with offset
    setTimeout(() => smoothScrollToElement(elementId, 80), 50);

    setIsMobileMenuOpen?.(false);
    return true;
  }

  return false;
};
