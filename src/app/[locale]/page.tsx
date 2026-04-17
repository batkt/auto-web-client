import type { Metadata } from "next";
import AboutSection from "@/components/home/about-section";
import BlogSection from "@/components/home/blog-section";
import FeaturesSection from "@/components/home/features-section";
import HeroSection from "@/components/home/hero-section";
import QuoteSwiper from "@/components/home/quote-swiper";
import Ticker from "@/components/home/ticker";
import { getRequest } from "@/lib/http-client";
import {
  HomeBlogData,
  HomeGalleryData,
  HomeHelpData,
  HomeHeroData,
  HomeMissionData,
  HomeQuoteData,
  LanguageKey,
  PageDetailData,
  SectionData,
} from "@/lib/types/data.types";
import { Blog } from "@/lib/types/blog.types";

type Props = {
  params: Promise<{ locale: string }>;
};
export const revalidate = 60;
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as LanguageKey;
  let pageData: PageDetailData | null = null;
  try {
    const pageResponse = await getRequest<PageDetailData>("/pages/detail/home");
    pageData = pageResponse?.data ?? null;
  } catch {
    pageData = null;
  }

  const name = pageData?.name?.[lang] || "FixFab";
  const description = pageData?.description?.[lang] || "";
  return {
    title: name,
    description: description,
    keywords: pageData?.keywords || [],
    openGraph: {
      title: name,
      description: description,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const lang = locale as LanguageKey;
  const sectionPayload = <T,>(response: unknown) =>
    ((response as { data?: { data?: unknown } } | null | undefined)?.data?.data ??
      {}) as T;

  const heroData = sectionPayload<HomeHeroData>(
    await getRequest<SectionData>("/sections/home-hero").catch(() => null)
  );
  const missionData = sectionPayload<HomeMissionData>(
    await getRequest<SectionData>("/sections/home-stats").catch(() => null)
  );
  const galleryData = sectionPayload<HomeGalleryData>(
    await getRequest<SectionData>("/sections/home-quotes").catch(() => null)
  );
  const helpData = sectionPayload<HomeHelpData>(
    await getRequest<SectionData>("/sections/home-contact").catch(() => null)
  );
  const quoteData = sectionPayload<HomeQuoteData>(
    await getRequest<SectionData>("/sections/home-products").catch(() => null)
  );
  const blogData = sectionPayload<HomeBlogData>(
    await getRequest<SectionData>("/sections/home-blog").catch(() => null)
  );

  const blogListResponse = await getRequest<{ data: Blog[] }>(
    "/blogs?status=published&limit=3"
  ).catch(() => null);
  const blogList = blogListResponse?.data?.data ?? [];

  return (
    <div>
      <main className="flex flex-col items-center sm:items-start">
        <div className="w-full relative">
          <HeroSection lang={lang} data={heroData} />
        </div>
        <div className="w-full relative">
          <BlogSection lang={lang} data={blogData} blogs={blogList} />
        </div>
        <QuoteSwiper lang={lang} data={quoteData} />

        <AboutSection lang={lang} data={missionData} />

        <Ticker lang={lang} data={galleryData} />
        <FeaturesSection lang={lang} data={helpData} />
      </main>
    </div>
  );
}
