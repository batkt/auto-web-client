"use client";

import React from "react";
import { LanguageKey, HomeVideoData } from "@/lib/types/data.types";
import { getEmbedUrl } from "@/lib/utils";

const HomeVideoSection = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: HomeVideoData;
}) => {
  const embed = data?.videoUrl ? getEmbedUrl(data.videoUrl) : null;

  return (
    <section
      id="video"
      className="relative w-full overflow-hidden bg-[#111] py-16 md:py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {data?.title?.[lang] ? (
          <h2 className="text-center md:text-left text-3xl md:text-5xl font-extrabold text-white font-title">
            {data.title[lang]}
          </h2>
        ) : null}

        {data?.description?.[lang] ? (
          <p className="mt-4 text-center md:text-left text-base md:text-lg text-white/85 max-w-3xl mx-auto md:mx-0 font-description">
            {data.description[lang]}
          </p>
        ) : null}

        {embed ? (
          <div className="mt-10 w-full max-w-4xl mx-auto md:mx-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/40 ring-1 ring-white/10">
              <iframe
                src={embed}
                title="Video"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default HomeVideoSection;
