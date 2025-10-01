import type { Metadata, ResolvingMetadata } from 'next';
import AboutSection from '@/components/home/about-section';
import BlogSection from '@/components/home/blog-section';
import FeaturesSection from '@/components/home/features-section';
import HeroSection from '@/components/home/hero-section';
import MultiImagesBackroundSection from '@/components/home/multi-images-backround-section';
import ParallaxSection from '@/components/home/parallax-section';
import QuoteSwiper from '@/components/home/quote-swiper';
import StatsSection from '@/components/home/stats-section';
import Ticker from '@/components/home/ticker';
import { getRequest } from '@/lib/http-client';
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
} from '@/lib/types/data.types';
import { getImageUrl } from '@/lib/utils';
import { Blog } from '@/lib/types/blog.types';

type Props = {
  params: Promise<{ locale: string }>;
};
export const revalidate = 60;
export async function generateMetadata(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as LanguageKey;
  const pageResponse = await getRequest<PageDetailData>('/pages/detail/home');
  const pageData = pageResponse.data;
  const heroResponse = await getRequest<SectionData>('/sections/home-hero');
  const heroData = heroResponse.data.data as HomeHeroData;

  const parentMetadata = await parent;

  const name = pageData.name?.[lang];
  const description = pageData.description?.[lang];
  const previousImages = parentMetadata.openGraph?.images || [];
  return {
    title: name,
    description: description,
    keywords: pageData.keywords || [],
    openGraph: {
      title: name,
      description: description,
      images: [
        ...heroData.backgroundImages.map((image) => ({
          url: getImageUrl(image),
          width: 1200,
          height: 630,
          alt: name,
        })),
        ...previousImages,
      ],
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const lang = locale as LanguageKey;

  const heroResponse = await getRequest<SectionData>('/sections/home-hero');
  const heroData = heroResponse.data.data as HomeHeroData;
  const missionResponse = await getRequest<SectionData>(
    '/sections/home-mission'
  );
  const missionData = missionResponse.data.data as HomeMissionData;
  const galleryResponse = await getRequest<SectionData>(
    '/sections/home-gallery'
  );
  const galleryData = galleryResponse.data.data as HomeGalleryData;
  const helpResponse = await getRequest<SectionData>('/sections/home-help');
  const helpData = helpResponse.data.data as HomeHelpData;

  const quoteResponse = await getRequest<SectionData>('/sections/home-quote');
  const quoteData = quoteResponse.data.data as HomeQuoteData;

  const blogResponse = await getRequest<SectionData>('/sections/home-blog');
  const blogData = blogResponse.data.data as HomeBlogData;

  const blogListResponse = await getRequest<{ data: Blog[] }>(
    '/blogs?status=published&limit=3'
  );
  const blogList = blogListResponse.data.data;

  return (
    <div>
      <main className="flex flex-col items-center sm:items-start">
        <div className="w-full relative">
          <MultiImagesBackroundSection
            images={heroData.backgroundImages as string[]}
          >
            <HeroSection lang={lang} data={heroData} />
          </MultiImagesBackroundSection>
          <StatsSection lang={lang} data={heroData} />
        </div>
        <AboutSection lang={lang} data={missionData} />

        <ParallaxSection imageUrl={helpData.backgroundImage}>
          <FeaturesSection lang={lang} data={helpData} />
        </ParallaxSection>
        <Ticker lang={lang} data={galleryData} />
        <ParallaxSection imageUrl={quoteData.backgroundImage}>
          <QuoteSwiper lang={lang} data={quoteData} />
        </ParallaxSection>
        <BlogSection lang={lang} data={blogData} blogs={blogList} />
      </main>
    </div>
  );
}
