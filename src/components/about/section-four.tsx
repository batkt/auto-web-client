"use client";
import { AboutStoryData, LanguageKey } from "@/lib/types/data.types";
import React from "react";

const SectionFour = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: AboutStoryData;
}) => {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-foreground mb-6 font-title">
        {data.title[lang]}
      </h3>
      <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-description">
        <p>{data.description[lang]}</p>
      </div>
    </div>
  );
};

export default SectionFour;
