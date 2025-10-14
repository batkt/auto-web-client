import { MultiLanguageString } from "./data.types";

export interface Blog {
  _id: string;
  title: string;
  description?: string;
  thumbImage: string;
  categories: Category[];
  blocks: Block[];
  slug: string;
  status: "draft" | "published";
  publishedAt?: string;
  author?: {
    username: string;
    firstname: string;
    lastname: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: MultiLanguageString;
  description?: MultiLanguageString;
  createdAt: string;
  updatedAt: string;
}

export interface UploadedImage {
  id: string;
  url: string;
  alt: string;
}

export type Block =
  | { id: string; type: "text"; content?: string }
  | { id: string; type: "image"; data?: UploadedImage }
  | { id: string; type: "video"; url?: string }
  | { id: string; type: "gallery"; images: string[] };
