import { AboutOurCommunityData, LanguageKey } from '@/lib/types/data.types';
import React from 'react';

const Community = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: AboutOurCommunityData;
}) => {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-foreground mb-6">
        {data.title?.[lang]}
      </h3>
      <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
        <p>{data.description?.[lang]}</p>
      </div>
    </div>
  );
};

export default Community;
