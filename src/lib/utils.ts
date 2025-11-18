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
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${image}`;
  }
  return image;
};

export const getClientImageUrl = (image: string) => {
  if (!image) return "";
  if (image.startsWith("/uploads")) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}${image}`;
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

export const getEmbedUrl = (url: string): string | null => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.includes("v=")
      ? new URL(url).searchParams.get("v")
      : url.split("/").pop();
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }
  return null;
};

export const smoothScrollToElement = (
  elementId: string,
  offset: number = 0
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
  setIsMobileMenuOpen?: (open: boolean) => void
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
