// components/QuoteSwiper.tsx
"use client";

import { LanguageKey, HomeQuoteData } from "@/lib/types/data.types";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

const CTA_LABELS: Partial<Record<LanguageKey, string>> = {
  en: "View Detail",
  mn: "Дэлгэрэнгүй",
};

export default function QuoteSwiper({
  data,
  lang,
}: {
  data: HomeQuoteData;
  lang: LanguageKey;
}) {
  const bgUrl = data?.backgroundImage ? getImageUrl(data.backgroundImage) : "";

  const canLoop = data.items.length > 1;
  const swiperKey = `${canLoop}-${data.items.length}`;

  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const mobileSlides = data.items.length > 1 ? 1.4 : 1;
  const desktopSlides = Math.min(3, Math.max(1, data.items.length));
  const ctaLabel = CTA_LABELS[lang] || CTA_LABELS.en || "View Detail";

  const Arrow = ({
    dir,
    onClick,
  }: {
    dir: "left" | "right";
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 -translate-y-1/2 z-20 text-7xl text-gray-400 hover:text-white transition-colors duration-300 ${
        dir === "left" ? "left-3 md:left-6" : "right-3 md:right-6"
      }`}
    >
      {dir === "left" ? "‹" : "›"}
    </button>
  );

  return (
    <section
      id="products"
      className="relative w-full overflow-hidden bg-[#111]"
    >
      {bgUrl ? (
        <>
          <Image
            src={bgUrl}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-center pointer-events-none select-none opacity-90"
          />
        </>
      ) : null}

      <div className="w-full relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-auto pt-12 sm:pt-12 pb-12 md:max-h-[800px] md:h-[calc(100vh-120px)]">
        <h2 className="text-center font-extrabold text-white text-2xl sm:text-3xl md:mt-10 md:text-4xl lg:text-5xl">
          {data.title?.[lang]}
        </h2>

        <h3 className="mt-2 text-center font-extrabold text-[#0888A3] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          {data.secondaryTitle?.[lang]}
        </h3>

        {/* Slider */}
        {data.items.length > 0 && (
          <div className="relative mt-8 w-full quote-swiper">
            {canLoop && mounted && (
              <>
                <Arrow
                  dir="left"
                  onClick={() => swiperRef.current?.slidePrev()}
                />
                <Arrow
                  dir="right"
                  onClick={() => swiperRef.current?.slideNext()}
                />
              </>
            )}

            {mounted && (
              <Swiper
                key={swiperKey} // re-init when loop capability changes
                loop={canLoop}
                loopAdditionalSlides={data.items.length} // avoid blank edges with few slides
                centeredSlides
                slidesPerView={mobileSlides}
                spaceBetween={16}
                breakpoints={{
                  1024: { slidesPerView: desktopSlides, spaceBetween: 40 },
                }}
                speed={500}
                onSwiper={(sw) => {
                  // why: direct API usage avoids nav timing issues in Next strict mode
                  swiperRef.current = sw;
                }}
                onRealIndexChange={(sw) => setActiveIndex(sw.realIndex)}
                className="!overflow-visible"
              >
                {data.items.map((item, idx) => {
                  const img = getImageUrl(item.productImage);
                  return (
                    <SwiperSlide key={`${idx}-${img}`}>
                      <div className="mx-auto flex items-center justify-center h-[240px] w-[240px] md:h-[220px] md:w-[420px] max-w-full">
                        <div className="relative h-full w-full pl-20">
                          <Image
                            width={250}
                            height={250}
                            src={img}
                            sizes="10vw"
                            alt={item.name?.[lang] || ""}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}

            {/* Active item caption + CTA */}
            {data.items.length > 0 && (
              <div className="mt-6 flex flex-col items-center">
                <p className="text-white font-semibold text-center text-xl md:text-3xl">
                  {data.items[activeIndex % data.items.length]?.name?.[lang]}
                </p>
                <button
                  type="button"
                  className="mt-4 rounded-full bg-[#E84747] px-6 py-3 text-white font-semibold hover:brightness-110 active:brightness-95 focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  {ctaLabel}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Active slide emphasis */}
      <style jsx global>{`
        .quote-swiper .swiper-slide {
          transition: transform 300ms ease, opacity 300ms ease;
          transform: scale(0.78);
          opacity: 0.6;
        }
        .quote-swiper .swiper-slide-active {
          transform: scale(1);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
