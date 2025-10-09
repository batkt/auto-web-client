import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

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
