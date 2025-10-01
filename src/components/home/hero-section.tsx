'use client';

import React from 'react';
import BlurText from '../ui/blur-text';
import { HomeHeroData, LanguageKey } from '@/lib/types/data.types';

const HeroSection = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: HomeHeroData;
}) => {
  return (
    <div className="w-full relative max-h-[800px] h-[calc(100vh-120px)]">
      {/* Parallax overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/60"></div>

      {/* Main content with parallax */}
      <div className="absolute z-[1] inset-0 flex flex-col items-center pt-40 sm:pt-56 justify-start gap-y-8 sm:gap-y-14">
        <BlurText
          text={data.mainTitle?.[lang]}
          delay={150}
          animateBy="words"
          direction="top"
          className="max-w-md font-extrabold text-white text-5xl sm:text-6xl sm:max-w-4xl px-6 text-center leading-14 sm:leading-16 flex justify-center drop-shadow-2xl"
        />

        <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
          {data.ctaText?.[lang]}
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
