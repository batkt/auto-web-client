'use client';

import { AboutLocationData, LanguageKey } from '@/lib/types/data.types';
import dynamic from 'next/dynamic';
import React from 'react';
const MapComponent = dynamic(() => import('../map'), {
  ssr: false,
});

const LocationSection = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: AboutLocationData;
}) => {
  const position: [number, number] = [data.latitude, data.longitude];

  return (
    <section className="pt-20 bg-background">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          {data.title?.[lang]}
        </h2>
        <p className="text-xl text-muted-foreground">
          {data.description?.[lang]}
        </p>
      </div>

      <div className="bg-muted rounded-2xl h-96 flex items-center justify-center border border-border relative z-[0]">
        <MapComponent position={position} />
      </div>
    </section>
  );
};

export default LocationSection;
