"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

import { getImageUrl } from "@/lib/utils";
import type { HomeGalleryData, LanguageKey } from "@/lib/types/data.types";

export default function Ticker({
  lang,
  data,
}: {
  lang: LanguageKey | string;
  data: HomeGalleryData;
}) {
  const bg = data?.backgroundImage ? getImageUrl(data.backgroundImage) : "";
  const quotes: HomeGalleryData["item"] = Array.isArray(data?.item)
    ? data.item
    : [];

  return (
    <section
      id="reviews"
      className="relative w-screen -ml-[50vw] -mr-[50vw] left-1/2 right-1/2 overflow-hidden"
    >
      {/* BG image (full-bleed) */}
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

      <div className="relative w-full pt-4 mx-auto px-4 sm:px-6 lg:px-10 max-w-7xl h-auto md:max-h-[800px] md:h-[calc(100vh-120px)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 pt-12 sm:pt-14 md:pt-16 text-center">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold">
            {data.title?.[lang as keyof typeof data.title]}
          </h2>
          <h3 className="text-[#0888A3] text-4xl sm:text-5xl md:text-6xl font-extrabold mt-2">
            {data.secondaryTitle?.[lang as keyof typeof data.secondaryTitle]}
          </h3>
        </div>

        <div className="pt-14">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            slidesPerGroup={1}
            breakpoints={{
              0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 16 },
              640: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 24 },
              1024: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 24 },
            }}
            className="!pb-12"
          >
            {quotes.map((q, idx) => (
              <SwiperSlide key={`${q.proName}-${idx}`}>
                <figure className="group h-full flex flex-col items-center text-center">
                  <div className="text-4xl sm:text-5xl text-white/40 mb-4">
                    ”
                  </div>

                  <blockquote className="text-white text-base sm:text-lg leading-relaxed max-w-[36ch] sm:max-w-[40ch] mx-auto">
                    {q.proComment}
                  </blockquote>

                  <div className="mt-6">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-2 ring-white/40 overflow-hidden">
                      {q.proImage ? (
                        <Image
                          src={getImageUrl(q.proImage)}
                          alt={q.proName || "avatar"}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  </div>

                  <figcaption
                    className={`mt-3 font-semibold ${
                      idx % 2 === 1 ? "text-red-500" : "text-[#0aa3b8]"
                    }`}
                  >
                    {q.proName}
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #0aa3b8;
        }
      `}</style>
    </section>
  );
}
