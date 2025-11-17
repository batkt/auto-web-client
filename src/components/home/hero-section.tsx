"use client";

import React from "react";
import { HomeHeroData, LanguageKey } from "@/lib/types/data.types";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const HeroSection = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: HomeHeroData;
}) => {
  const t = useTranslations("carPartsTranslation");
  const bgUrl = data?.backgroundImage ? getImageUrl(data.backgroundImage) : "";
  const productUrl = data?.productImage
    ? getImageUrl(data.productImage)
    : undefined;

  return (
    <section id="home" className="relative w-full overflow-hidden">
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

      <div className="absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-10 grid-cols-1 text-center py-16 md:min-h-[calc(100vh-5rem)] md:grid-cols-2 md:gap-16 lg:gap-24 md:py-12">
          <div className=" text-center mt-10 md:mt-10 order-1 md:text-left relative z-10">
            <h1 className="text-white font-extrabold leading-tight font-title">
              <span className="block text-4xl sm:text-5xl lg:text-6xl whitespace-normal">
                {data?.mainTitle?.[lang]}
              </span>
              <span className="mt-1 block text-3xl sm:text-4xl lg:text-6xl text-[#F7B514] whitespace-normal">
                {data?.secondaryTitle?.[lang]}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg  text-white/90 whitespace-normal font-description">
              {data?.description?.[lang]}
            </p>

            {data?.ctaText?.[lang] && (
              <Link href={data?.ctaUrl}>
                <button className="mt-8 inline-flex items-center justify-center rounded-full bg-[#e63946] px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg transition-colors duration-500 ease-in-out hover:bg-[#F7B514] whitespace-normal font-sans">
                  {data.ctaText[lang]}
                </button>
              </Link>
            )}
          </div>

          <div className="flex items-center justify-center order-2 relative z-10">
            {productUrl && (
              <div className="relative">
                <Image
                  src={productUrl}
                  alt="Featured product"
                  width={680}
                  height={600}
                  priority
                  sizes="(max-width: 768px) 85vw, (max-width: 1280px) 50vw, 680px"
                  className="h-auto object-contain drop-shadow-2xl w-[min(85vw,420px)] mt-6 md:mt-0 md:w-[min(90vw,680px)]"
                />

                <div className="absolute inset-0">
                  <div className="absolute top-[-2%] left-[55%] group">
                    <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform duration-300 hover:bg-red-600"></div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                      {t("glassRoof")}
                    </div>
                  </div>

                  <div className="absolute top-[85%] left-[15%] group">
                    <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform duration-300 hover:bg-red-600"></div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                      {t("frontBumper")}
                    </div>
                  </div>

                  <div className="absolute top-[20%] left-[20%] group">
                    <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform duration-300 hover:bg-red-600"></div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                      {t("sideMirror")}
                    </div>
                  </div>

                  <div className="absolute top-[67%] left-[71%] group">
                    <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform duration-300 hover:bg-red-600"></div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                      {t("sideSkirts")}
                    </div>
                  </div>

                  <div className="absolute top-[20%] right-[0%] group">
                    <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform duration-300 hover:bg-red-600"></div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                      {t("backLight")}
                    </div>
                  </div>

                  {/* Dot 6 - Rear Bumper */}
                  <div className="absolute top-[40%] right-[0%] group">
                    <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform duration-300 hover:bg-red-600"></div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                      {t("rearBumper")}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
