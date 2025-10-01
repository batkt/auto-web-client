import DonateHeroSection from '@/components/donate/donate-hero-section';
import DonateImpactSection from '@/components/donate/donate-impact-section';
import DonatePaymentSection from '@/components/donate/donate-payment-section';
import DonateThankYouSection from '@/components/donate/donate-thank-you-section';
import DonateTransparency from '@/components/donate/donate-transparency';
import { getRequest } from '@/lib/http-client';
import {
  DonateHeroData,
  DonateImpactData,
  DonatePaymentData,
  DonateThankYouData,
  DonateTransparencyData,
  LanguageKey,
  PageDetailData,
  SectionData,
} from '@/lib/types/data.types';
import { getImageUrl } from '@/lib/utils';
import type { Metadata, ResolvingMetadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = await props.params;
  const lang = locale as LanguageKey;

  const pageResponse = await getRequest<PageDetailData>('/pages/detail/donate');
  const pageData = pageResponse.data;

  const heroResponse = await getRequest<SectionData>('/sections/donate-hero');
  const heroData = heroResponse.data.data as DonateHeroData;
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

const Donate = async (props: { params: Promise<{ locale: string }> }) => {
  const { locale } = await props.params;
  const lang = locale as LanguageKey;
  const heroResponse = await getRequest<SectionData>('/sections/donate-hero');
  const heroData = heroResponse.data.data as DonateHeroData;

  const impactResponse = await getRequest<SectionData>(
    '/sections/donate-impact'
  );
  const impactData = impactResponse.data.data as DonateImpactData;

  const paymentResponse = await getRequest<SectionData>(
    '/sections/donate-payment'
  );
  const paymentData = paymentResponse.data.data as DonatePaymentData;

  const transparencyResponse = await getRequest<SectionData>(
    '/sections/donate-transparency'
  );
  const transparencyData = transparencyResponse.data
    .data as DonateTransparencyData;

  const thanksResponse = await getRequest<SectionData>(
    '/sections/donate-thank-you'
  );
  const thanksData = thanksResponse.data.data as DonateThankYouData;

  return (
    <>
      <DonateHeroSection data={heroData} lang={lang} />
      <DonateImpactSection data={impactData} lang={lang} />
      <DonatePaymentSection data={paymentData} lang={lang} />
      <DonateTransparency data={transparencyData} lang={lang} />
      <DonateThankYouSection lang={lang} data={thanksData} />
    </>
  );
};

export default Donate;
