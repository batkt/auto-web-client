export type LanguageKey = 'mn' | 'en';

export type MultiLanguageString = {
  [key in LanguageKey]?: string;
};

export type PageDetailData = {
  _id: string;
  slug: string;
  name: MultiLanguageString;
  description: MultiLanguageString;
  keywords?: string[];
};

export type BaseSectionDetailData = {
  title: MultiLanguageString;
  description: MultiLanguageString;
};

export interface SectionData {
  _id?: string;
  pageId: string;
  sortOrder?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  key: string;
}

export type Stat = {
  servedOver: {
    value?: number;
    title: MultiLanguageString;
  };
  donate: {
    title: MultiLanguageString;
    desc: MultiLanguageString;
  };
  volunteer: {
    title: MultiLanguageString;
    desc: MultiLanguageString;
  };
};

export type HomeHeroData = {
  backgroundImages: string[];
  mainTitle: MultiLanguageString;
  ctaText: MultiLanguageString;
  ctaUrl: string;
  stats: Stat;
};

export type HeaderData = {
  logoImage: string;
  menuList: {
    name: MultiLanguageString;
    path: string;
  }[];
};

export type HomeMissionData = BaseSectionDetailData;

export type HomeGalleryData = BaseSectionDetailData & {
  images: string[];
};

export type HomeHelpData = {
  title: MultiLanguageString;
  subTitle?: MultiLanguageString;
  backgroundImage: string;
  items: BaseSectionDetailData[];
};

export type HomeQuoteData = BaseSectionDetailData & {
  backgroundImage: string;
  items: {
    quote: MultiLanguageString;
    author: MultiLanguageString;
    role?: MultiLanguageString;
  }[];
};

export type HomeBlogData = BaseSectionDetailData;

export type AboutHeroData = BaseSectionDetailData & {
  image: string;
};

export type AboutMissionData = BaseSectionDetailData;

export type AboutWelcomeData = BaseSectionDetailData;

export type AboutHistoryData = BaseSectionDetailData;

export type AboutStructureData = BaseSectionDetailData & {
  image: string;
};

export type AboutHistoryItem = {
  year: number;
  title: MultiLanguageString;
  description: MultiLanguageString;
};

export type AboutStoryData = BaseSectionDetailData & {
  items: AboutHistoryItem[];
};

export type WeBeliveItem = {
  title: MultiLanguageString;
  description: MultiLanguageString;
};

export type AboutWeBelieveData = BaseSectionDetailData & {
  items: WeBeliveItem[];
};

export type AboutOurCommunityData = BaseSectionDetailData;

export type AboutLocationData = BaseSectionDetailData & {
  longitude: number;
  latitude: number;
};

export type BranchHeroData = BaseSectionDetailData & {
  image: string;
  items: {
    name: MultiLanguageString;
    stats: string;
  }[];
};

export type BranchCampusData = BaseSectionDetailData;

export type BlogHeroData = BaseSectionDetailData & {
  image: string;
};

export type ContactHeroData = BaseSectionDetailData & {
  image: string;
};

export type ContactInfoData = BaseSectionDetailData & {
  address: MultiLanguageString;
  phone: string;
  email: string;
  services: {
    name: MultiLanguageString;
    data: {
      name: MultiLanguageString;
      description: MultiLanguageString;
    }[];
  };
};

export type FooterData = {
  description: MultiLanguageString;
  socialMedia: {
    name: string;
    url: string;
  }[];
};

export type DonateHeroData = BaseSectionDetailData & {
  image: string;
};

export type DonateImpactData = BaseSectionDetailData & {
  items: {
    title: MultiLanguageString;
    description: MultiLanguageString;
  }[];
};

export type DonatePaymentData = BaseSectionDetailData & {
  bankAccount: {
    title: MultiLanguageString;
    accounts: {
      bankName: string;
      accountNumber: string;
      iban: string;
      accountName: string;
      transferDescription: MultiLanguageString;
    }[];
  };
  qpay: {
    title: MultiLanguageString;
    description: MultiLanguageString;
    qrCode: string;
  };
  giveInPerson: {
    title: MultiLanguageString;
    description: MultiLanguageString;
  };
};

export type DonateTransparencyData = BaseSectionDetailData;
export type DonateThankYouData = BaseSectionDetailData;
