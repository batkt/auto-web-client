export type LanguageKey = "mn" | "en";

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

export type HomeHeroData = {
  backgroundImage: string;
  productImage: string;
  description: MultiLanguageString;
  mainTitle: MultiLanguageString;
  secondaryTitle: MultiLanguageString;
  ctaText: MultiLanguageString;
  ctaUrl: string;
};

export type HeaderData = {
  logoImage: string;
  menuList: {
    name: MultiLanguageString;
    path: string;
  }[];
};
export type HomeMissionItem = {
  stat1?: string;
  stat2?: string;
  stat3?: string;
  desc: MultiLanguageString;
};

export type HomeMissionData = {
  title: MultiLanguageString;
  stats?: MultiLanguageString;
  backgroundImage: string;
  description: MultiLanguageString;
  items: HomeMissionItem[];
};

export type Quotes = {
  proImage: string;
  proName: string;
  proComment: string;
};

export type HomeGalleryData = {
  backgroundImage: string;
  title: MultiLanguageString;
  secondaryTitle: MultiLanguageString;
  item: Quotes[];
};

export type HomeHelpData = {
  title: MultiLanguageString;
  secondaryTitle: MultiLanguageString;
  location: MultiLanguageString;
  description: MultiLanguageString;
  backgroundImage: string;

  address: MultiLanguageString;
  phone: string;
  email: string;
};

export type Products = {
  productImage: string;
  name: MultiLanguageString;
  model: string;
  description: MultiLanguageString;
  price: string;
};

export type HomeQuoteData = BaseSectionDetailData & {
  backgroundImage: string;
  title: MultiLanguageString;
  secondaryTitle: MultiLanguageString;
  items: Products[];
};

export type HomeBlogData = {
  title: MultiLanguageString;
  secondaryTitle: MultiLanguageString;
  description: MultiLanguageString;
  backgroundImage: string;
};

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
  backgroundImage: string;

  address: MultiLanguageString;
  phone: string;
  email: string;
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
