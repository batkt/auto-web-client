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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { params }: Props
): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as LanguageKey;
  const pageResponse = await getRequest<PageDetailData>("/pages/detail/home");
  const pageData = pageResponse.data;

  const name = pageData.name?.[lang];
  const description = pageData.description?.[lang];
  return {
    title: name,
    description: description,
    keywords: pageData.keywords || [],
    openGraph: {
      title: name,
      description: description,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const lang = locale as LanguageKey;

  const heroResponse = await getRequest<SectionData>("/sections/home-hero");
  const heroData = heroResponse.data.data as HomeHeroData;
  const missionResponse = await getRequest<SectionData>("/sections/home-stats");
  const missionData = missionResponse.data.data as HomeMissionData;
  const galleryResponse = await getRequest<SectionData>(
    "/sections/home-quotes"
  );
  const galleryData = galleryResponse.data.data as HomeGalleryData;
  const helpResponse = await getRequest<SectionData>("/sections/home-contact");
  const helpData = helpResponse.data.data as HomeHelpData;

  const quoteResponse = await getRequest<SectionData>(
    "/sections/home-products"
  );
  const quoteData = quoteResponse.data.data as HomeQuoteData;

  const blogResponse = await getRequest<SectionData>("/sections/home-blog");
  const blogData = blogResponse.data.data as HomeBlogData;

  const blogListResponse = await getRequest<{ data: Blog[] }>(
    "/blogs?status=published&limit=3"
  );
  const blogList = blogListResponse.data.data;

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
