import React from 'react';
import ContactHeroSection from '@/components/contact/contact-hero-section';
import ContactInfoSection from '@/components/contact/contact-info-section';
import ContactFormSection from '@/components/contact/contact-form-section';
import { getRequest } from '@/lib/http-client';
import {
  ContactHeroData,
  ContactInfoData,
  LanguageKey,
  PageDetailData,
  SectionData,
} from '@/lib/types/data.types';
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
    '/pages/detail/contact'
  );
  const pageData = pageResponse.data;

  const heroResponse = await getRequest<SectionData>('/sections/contact-hero');
  const heroData = heroResponse.data.data as ContactHeroData;
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

const Contact = async (props: { params: Promise<{ locale: string }> }) => {
  const { locale } = await props.params;
  const lang = locale as LanguageKey;
  const contactHeroResponse = await getRequest<SectionData>(
    '/sections/contact-hero'
  );
  const contactHeroData = contactHeroResponse.data.data as ContactHeroData;

  const contactInfoResponse = await getRequest<SectionData>(
    '/sections/contact-info'
  );
  const contactInfoData = contactInfoResponse.data.data as ContactInfoData;

  return (
    <div>
      {/* Hero Section */}
      <ContactHeroSection lang={lang} data={contactHeroData} />

      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <ContactInfoSection data={contactInfoData} lang={lang} />

            {/* Contact Form */}
            <ContactFormSection />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
