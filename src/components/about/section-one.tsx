import { AboutWelcomeData, LanguageKey } from "@/lib/types/data.types";
import React from "react";

const SectionOne = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: AboutWelcomeData;
}) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-foreground mb-6 font-title">
        {data.title[lang]}
      </h2>
      <p className="text-xl text-muted-foreground leading-relaxed font-description">
        {data.description[lang]}
      </p>
    </div>
  );
};

export default SectionOne;
