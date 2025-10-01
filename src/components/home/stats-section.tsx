'use client';

import React from 'react';
import CountUp from '../ui/count-up';
import { LanguageKey } from '@/lib/types/data.types';
import { HomeHeroData } from '@/lib/types/data.types';

const StatsSection = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: HomeHeroData;
}) => {
  const count = data.stats.servedOver.value || 0;

  return (
    <div className="absolute z-[2] md:bottom-0 w-full md:translate-y-1/2">
      <div className="w-full container max-w-6xl px-6 mx-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-10 max-md:-translate-y-1/2 shadow-md">
          <div className="md:col-span-4 bg-amber-500 p-6">
            <p className="text-xl mb-4 md:mb-2 lg:mb-4">
              {data.stats.servedOver.title?.[lang]}
            </p>
            <CountUp
              from={count * 0.9}
              to={count}
              separator=","
              direction="up"
              duration={0.05}
              className="text-6xl md:text-5xl lg:text-6xl"
            />
            <p className="text-xl mt-4 md:mt-2 lg:mt-4">
              {data.stats.donate.desc?.[lang]}
            </p>
          </div>
          <div className="md:col-span-3 bg-amber-400 p-6">
            <p className="text-xl mb-2 lg:mb-4">
              {data.stats.donate.title?.[lang]}
            </p>
            <p className="text-gray-700">{data.stats.donate.desc?.[lang]}</p>
          </div>
          <div className="md:col-span-3 bg-amber-300 p-6">
            <p className="text-xl mb-2 lg:mb-4">
              {data.stats.volunteer.title?.[lang]}
            </p>
            <p className="text-gray-700">{data.stats.volunteer.desc?.[lang]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
