"use client";

import React from "react";
import { LanguageKey, HomeVideoData } from "@/lib/types/data.types";
import { getEmbedUrl } from "@/lib/utils";

function pickVideoUrl(raw: HomeVideoData & { youtubeUrl?: string }): string {
  const v =
    (raw as { videoUrl?: string }).videoUrl ??
    (raw as { youtubeUrl?: string }).youtubeUrl ??
    "";
  return typeof v === "string" ? v : "";
}

const HomeVideoSection = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: HomeVideoData;
}) => {
  const videoUrl = pickVideoUrl(data);
  const embed = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <section
      id="video"
      className="relative w-full min-w-0 self-stretch overflow-hidden bg-[#111] py-16 md:py-24"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-10">
        {data?.title?.[lang] ? (
          <h2 className="text-3xl font-extrabold text-white font-title md:text-5xl">
            {data.title[lang]}
          </h2>
        ) : null}

        {data?.description?.[lang] ? (
          <p className="mt-4 max-w-3xl text-base text-white/85 font-description md:text-lg">
            {data.description[lang]}
          </p>
        ) : null}

        {embed ? (
          <div className="mt-10 w-full max-w-4xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/40 ring-1 ring-white/10">
              <iframe
                src={embed}
                title="Video"
                width={1280}
                height={720}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        ) : videoUrl ? (
          <p className="mt-6 max-w-xl text-sm text-amber-200/90">
            Видео холбоосыг олж чадсангүй. YouTube watch, youtu.be эсвэл shorts
            холбоосыг ашиглана уу.
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default HomeVideoSection;
