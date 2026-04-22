import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

type RouterLike = {
  push: (href: string) => unknown;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (image: string) => {
  if (!image) return "";
  if (image.startsWith("/uploads")) {
    const base = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/+$/, "");
    return base ? `${base}${image}` : image;
  }
  return image;
};

export const getClientImageUrl = (image: string) => {
  if (!image) return "";
  if (image.startsWith("/uploads")) {
    const base = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/\/+$/, "");
    return base ? `${base}${image}` : image;
  }
  return image;
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
