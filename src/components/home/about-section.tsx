"use client";

import React from "react";
import {
  HomeMissionItem,
  LanguageKey,
  HomeMissionData,
} from "@/lib/types/data.types";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

const AboutSection = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: HomeMissionData;
}) => {
  const bg = data?.backgroundImage ? getImageUrl(data.backgroundImage) : "";

  return (
    <section id="stats" className="relative w-full overflow-hidden">
      {/* BG image */}
      {bg && (
        <>
          <Image
            src={bg}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-center pointer-events-none select-none"
          />
        </>
      )}

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14 md:py-20">
        <div className="grid items-center gap-10 md:gap-16 lg:gap-20 grid-cols-1 text-center md:grid-cols-2">
          {/* Text section */}
          <div className="flex flex-col items-center md:items-start md:text-left">
            {data.stats?.[lang] && (
              <p className="mb-3 text-base sm:text-lg text-gray-200/80">
                {data.stats[lang]}
              </p>
            )}

            <p className="font-bold text-3xl sm:text-4xl text-white mb-4">
              {data.title?.[lang]}
            </p>

            <p className="text-sm sm:text-base text-gray-200/80 max-w-lg mx-auto md:mx-0">
              {data.description?.[lang]}
            </p>
          </div>

          {/* Stats section */}
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 md:mt-0">
            {data.items?.map((item: HomeMissionItem, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center text-center md:items-start md:text-left"
              >
                <p
                  className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${
                    index === 1 ? "text-red-600" : "text-[#0888A3]"
                  }`}
                >
                  {item.stat1 || item.stat2 || item.stat3}
                </p>
                <p className="text-white text-sm sm:text-base">
                  {item.desc?.[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
