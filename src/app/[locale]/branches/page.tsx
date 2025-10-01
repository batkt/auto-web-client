import React from 'react';
import BranchCard from '@/components/branches/branch-card';
import { getRequest } from '@/lib/http-client';
import { Branch } from '@/lib/types/branch.types';
import {
  BranchCampusData,
  BranchHeroData,
  LanguageKey,
  PageDetailData,
  SectionData,
} from '@/lib/types/data.types';
import BranchHeroSection from '@/components/branch/branch-hero-section';
import BranchCampus from '@/components/branch/branch-campus';
import { Metadata, ResolvingMetadata } from 'next';
import { getImageUrl } from '@/lib/utils';

export const revalidate = 60;

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await props.params;
  const lang = locale as LanguageKey;

  const pageResponse = await getRequest<PageDetailData>(
    '/pages/detail/branches'
  );
  const pageData = pageResponse.data;

  const heroResponse = await getRequest<SectionData>('/sections/branch-hero');
  const heroData = heroResponse.data.data as BranchHeroData;
  const parentMetadata = await parent;

  const title = pageData.name?.[lang];
  return {
    title: title,
    description: pageData.description?.[lang],
    keywords: [
      'Монгол Христийн Сүм',
      'хандив',
      'хандив өгөх',
      'банкны шилжүүлэг',
      'QPay',
      'SocialPay',
      'тусламж',
      'итгэл найдвар',
      'сайн үйлс',
      'нийгэмд үйлчлэх',
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

export default async function BranchesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const lang = locale as LanguageKey;

  const branchResponse = await getRequest<Branch[]>('/branches/');
  const branches = branchResponse.data;

  const heroResponse = await getRequest<SectionData>('/sections/branch-hero');
  const heroData = heroResponse.data.data as BranchHeroData;

  const campusResponse = await getRequest<SectionData>(
    '/sections/branch-campus'
  );
  const campusData = campusResponse.data.data as BranchCampusData;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <BranchHeroSection lang={lang} data={heroData} />

      {/* Branches Grid */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BranchCampus lang={lang} data={campusData} />

          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {branches.map((branch) => (
              <BranchCard key={branch._id} lang={lang} branch={branch} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
