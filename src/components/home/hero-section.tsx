"use client";

import React from "react";
import { HomeHeroData, LanguageKey } from "@/lib/types/data.types";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

const HeroSection = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: HomeHeroData;
}) => {
  const bgUrl = data?.backgroundImage ? getImageUrl(data.backgroundImage) : "";
  const productUrl = data?.productImage
    ? getImageUrl(data.productImage)
    : undefined;

  return (
    <section id="#" className="relative w-full overflow-hidden">
      {/* Background image (текстийн доор) */}
      {bgUrl && (
        <Image
          src={bgUrl}
          alt=""
          fill
          sizes="100vw"
          priority
          aria-hidden
          className="pointer-events-none select-none object-cover object-center -z-10"
        />
      )}

      {/* Контрастын overlay */}
      <div className="absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-10 grid-cols-1 text-center py-16 md:min-h-[calc(100vh-5rem)] md:grid-cols-2 md:gap-16 lg:gap-24 md:py-12">
          {/* Text content */}
          <div className="order-2 md:order-1 text-left relative z-10">
            <h1 className="text-white font-extrabold leading-tight">
              <span className="block text-4xl sm:text-5xl lg:text-7xl whitespace-normal">
                {data?.mainTitle?.[lang]}
              </span>
              <span className="mt-1 block text-4xl sm:text-5xl lg:text-7xl text-[#0888A3] whitespace-normal">
                {data?.secondaryTitle?.[lang]}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg font-semibold text-white/90 whitespace-normal">
              {data?.description?.[lang]}
            </p>

            {data?.ctaText?.[lang] && (
              <button className="mt-8 inline-flex items-center justify-center rounded-full bg-[#e63946] px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg transition-colors duration-500 ease-in-out hover:bg-[#0888A3] whitespace-normal">
                {data.ctaText[lang]}
              </button>
            )}
          </div>

          {/* Image content */}
          <div className="flex items-center justify-center order-1 md:order-2 relative z-10">
            {productUrl && (
              <Image
                src={productUrl}
                alt="Featured product"
                width={680}
                height={600}
                priority
                sizes="(max-width: 768px) 85vw, (max-width: 1280px) 50vw, 680px"
                className="h-auto object-contain drop-shadow-2xl w-[min(85vw,420px)] mt-6 md:mt-0 md:w-[min(90vw,680px)]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
