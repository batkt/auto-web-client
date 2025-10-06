import BlogHeroSection from "@/components/blog/blog-hero-section";
import BlogPageContent from "@/components/blog/blog-page-content";
import { getRequest } from "@/lib/http-client";
import { Blog, Category } from "@/lib/types/blog.types";
import {
  BlogHeroData,
  LanguageKey,
  PageDetailData,
  SectionData,
} from "@/lib/types/data.types";
import { getImageUrl } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

export const revalidate = 60;

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await props.params;
  const lang = locale as LanguageKey;

  const pageResponse = await getRequest<PageDetailData>("/pages/detail/home");
  const pageData = pageResponse.data;

  const heroResponse = await getRequest<SectionData>("/sections/blog-hero");
  const heroData = heroResponse.data.data as BlogHeroData;
  const parentMetadata = await parent;

  const title = pageData.name?.[lang];
  return {
    title: title,
    description: pageData.description?.[lang],
    keywords: [
      "Монгол Христийн Сүм",
      "хандив",
      "хандив өгөх",
      "банкны шилжүүлэг",
      "QPay",
      "SocialPay",
      "тусламж",
      "итгэл найдвар",
      "сайн үйлс",
      "нийгэмд үйлчлэх",
      ...(pageData?.keywords || []),
    ],
    openGraph: {
      images: [
        {
          url: getImageUrl(heroData.image),
          width: 1200,
          height: 630,
          alt: title,
        },
        ...(parentMetadata.openGraph?.images || []),
      ],
    },
  };
}

const BlogPage = async (props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    search: string;
    category: string;
    page: number;
  }>;
}) => {
  const { locale } = await props.params;
  const lang = locale as LanguageKey;
  const filters = await props.searchParams;

  const params = new URLSearchParams();
  if (filters?.category) params.append("category", filters.category);
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.search) params.append("search", filters.search);

  const searchParamsUrl = params.toString();
  const blogResponse = await getRequest<{
    data: Blog[];
    total: number;
    totalPages: number;
    currentPage: number;
  }>(
    `/blogs/?status=published&language=${lang}&limit=12${
      searchParamsUrl ? `&${searchParamsUrl}` : ""
    }`
  );
  const blogList = blogResponse.data;

  const categoryResponse = await getRequest<Category[]>(`/categories/`);
  const categories = categoryResponse.data;

  const heroResponse = await getRequest<SectionData>(`/sections/blog-hero`);
  const heroData = heroResponse.data.data as BlogHeroData;

  return (
    <>
      <BlogHeroSection data={heroData} lang={lang} />
      <BlogPageContent
        blogList={blogList}
        lang={lang}
        categories={categories}
        filters={filters}
      />
    </>
  );
};

export default BlogPage;
