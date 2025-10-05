import type { Metadata, ResolvingMetadata } from "next";
import Community from "@/components/about/community-section";
import HeroSection from "@/components/about/cover-section";
import LocationSection from "@/components/about/location-section";
import SectionSix from "@/components/about/section-six";
import Timeline from "@/components/about/timeline";
import SectionOne from "@/components/about/section-one";
import SectionTwo from "@/components/about/section-two";
import SectionThree from "@/components/about/section-three";
import SectionFour from "@/components/about/section-four";
import { getRequest } from "@/lib/http-client";
import {
  AboutHeroData,
  AboutLocationData,
  AboutMissionData,
  AboutOurCommunityData,
  AboutStoryData,
  AboutStructureData,
  AboutWeBelieveData,
  AboutWelcomeData,
  LanguageKey,
  PageDetailData,
  SectionData,
} from "@/lib/types/data.types";
import { getImageUrl } from "@/lib/utils";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await props.params;
  const lang = locale as LanguageKey;

  const pageResponse = await getRequest<PageDetailData>("/pages/detail/about");
  const pageData = pageResponse.data;

  const heroResponse = await getRequest<SectionData>("/sections/about-hero");
  const heroData = heroResponse.data.data as AboutHeroData;
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

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const lang = locale as LanguageKey;

  const heroResponse = await getRequest<SectionData>("/sections/about-hero");
  const heroData = heroResponse.data.data as AboutHeroData;

  const missionResponse = await getRequest<SectionData>(
    "/sections/about-mission"
  );
  const missionData = missionResponse.data.data as AboutMissionData;
  const welcomeResponse = await getRequest<SectionData>(
    "/sections/about-welcome"
  );
  const welcomeData = welcomeResponse.data.data as AboutWelcomeData;
  const structureResponse = await getRequest<SectionData>(
    "/sections/about-church-structure"
  );
  const structureData = structureResponse.data.data as AboutStructureData;

  const storyResponse = await getRequest<SectionData>(
    "/sections/about-our-story"
  );
  const storyData = storyResponse.data.data as AboutStoryData;

  const weBelieveResponse = await getRequest<SectionData>(
    "/sections/about-what-we-believe"
  );
  const weBelieveData = weBelieveResponse.data.data as AboutWeBelieveData;

  const ourCommunityResponse = await getRequest<SectionData>(
    "/sections/about-our-community"
  );
  const ourCommunityData = ourCommunityResponse.data
    .data as AboutOurCommunityData;

  const locationResponse = await getRequest<SectionData>("/sections/about-map");
  const locationData = locationResponse.data.data as AboutLocationData;

  return (
    <>
      {/* Hero Section */}
      <HeroSection lang={lang} data={heroData} />

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl mx-auto px-6">
          {/* Intro */}
          <SectionOne lang={lang} data={welcomeData} />

          {/* Mission */}
          <SectionTwo lang={lang} data={missionData} />

          {/* Church Structure */}
          <SectionThree lang={lang} data={structureData} />

          {/* Our Story */}
          <SectionFour lang={lang} data={storyData} />

          {/* Timeline */}
          <Timeline lang={lang} data={storyData} />

          {/* What We Believe */}
          <SectionSix lang={lang} data={weBelieveData} />

          {/* Our Community */}
          <Community lang={lang} data={ourCommunityData} />

          <LocationSection lang={lang} data={locationData} />
        </div>
      </section>
    </>
  );
}
