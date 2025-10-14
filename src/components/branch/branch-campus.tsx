"use client";
import { BranchCampusData, LanguageKey } from "@/lib/types/data.types";
import React from "react";

const BranchCampus = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: BranchCampusData;
}) => {
  return (
    <div className="text-center mb-12 lg:mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-title">
        {data.title[lang]}
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-description">
        {data.description[lang]}
      </p>
    </div>
  );
};

export default BranchCampus;
