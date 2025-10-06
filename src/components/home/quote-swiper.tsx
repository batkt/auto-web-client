// components/QuoteSwiper.tsx
"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
  useCallback,
} from "react";
import { createPortal } from "react-dom"; // portal
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import type { SwiperRef } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import "swiper/css";

import { LanguageKey, HomeQuoteData, Products } from "@/lib/types/data.types";
import { getImageUrl } from "@/lib/utils";

function useIsDesktop(query = "(min-width: 1024px)") {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setIsDesktop(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return isDesktop;
}

// --- Portal: modal-г document.body руу гаргана (яагаад: overflow/stacking clip-ээс зайлсхийх) ---
function ModalPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

export default function QuoteSwiper({
  data,
  lang,
}: {
  data: HomeQuoteData;
  lang: LanguageKey;
}) {
  const bgUrl = data?.backgroundImage ? getImageUrl(data.backgroundImage) : "";

  const items: Products[] = useMemo(() => {
    return Array.isArray(data?.items) ? data.items : [];
  }, [data?.items]);
  const total = items.length;

  const isDesktop = useIsDesktop();
  const slidesPerView = isDesktop
    ? Math.min(3, Math.max(1, total))
    : total > 1
    ? 1.4
    : 1;
  const spaceBetween = isDesktop ? 40 : 16;
  const enableLoop = (!isDesktop && total >= 2) || (isDesktop && total >= 4);
  const canShowArrows = total > 1;

  const swiperRef = useRef<SwiperRef | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem: Products | undefined = total
    ? items[activeIndex % total]
    : undefined;

  const inst = (): SwiperInstance | undefined => swiperRef.current?.swiper;
  const slidePrev = () => inst()?.slidePrev();
  const slideNext = () => inst()?.slideNext();

  const carouselId = useId();

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
      aria-controls={carouselId}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 -translate-y-1/2 text-7xl text-gray-400 hover:text-white transition-colors duration-300 pointer-events-auto z-[60] ${
        dir === "left" ? "left-3 md:left-6" : "right-3 md:right-6"
      }`}
    >
      {dir === "left" ? "‹" : "›"}
    </button>
  );

  // ----- Modal state -----
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const selected: Products | undefined =
    isModalOpen && modalIndex !== null ? items[modalIndex] : undefined;

  const openModal = useCallback(
    (index: number) => {
      if (!total) return;
      setModalIndex(index % total);
      setIsModalOpen(true);
    },
    [total]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalIndex(null);
  }, []);

  const modalPrev = useCallback(() => {
    if (total === 0 || modalIndex === null) return;
    setModalIndex((modalIndex - 1 + total) % total);
  }, [modalIndex, total]);

  const modalNext = useCallback(() => {
    if (total === 0 || modalIndex === null) return;
    setModalIndex((modalIndex + 1) % total);
  }, [modalIndex, total]);

  // lock scroll while modal open
  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isModalOpen]);

  // ESC + Arrow keys inside modal
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") modalPrev();
      if (e.key === "ArrowRight") modalNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen, closeModal, modalPrev, modalNext]);

  return (
    <section id="products" className="relative w-full overflow-hidden isolate">
      {bgUrl ? (
        <Image
          src={bgUrl}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center -z-10 pointer-events-none"
        />
      ) : null}

      <div className="relative mx-auto max-w-7xl py-16 z-0 flex flex-col items-center">
        {/* Томруулсан гарчигууд */}
        <h2 className="text-center font-extrabold text-white text-3xl sm:text-4xl md:mt-10 md:text-5xl lg:text-6xl">
          {data.title?.[lang]}
        </h2>
        <h3 className="mt-2 text-center font-extrabold text-[#0888A3] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          {data.secondaryTitle?.[lang]}
        </h3>

        {total > 0 && (
          <div
            className="relative mt-8 w-full quote-swiper pointer-events-none z-0"
            role="region"
            aria-roledescription="carousel"
            aria-label="Products carousel"
          >
            {canShowArrows && (
              <>
                <Arrow dir="left" onClick={slidePrev} />
                <Arrow dir="right" onClick={slideNext} />
              </>
            )}

            <Swiper
              id={carouselId}
              ref={swiperRef}
              key={`${enableLoop}-${total}-${isDesktop ? "d" : "m"}`}
              modules={[A11y, Keyboard]}
              loop={enableLoop}
              rewind={!enableLoop}
              loopAdditionalSlides={Math.max(2, total)}
              observer
              observeParents
              watchOverflow
              centeredSlides
              slidesPerView={slidesPerView}
              spaceBetween={spaceBetween}
              speed={500}
              keyboard={{ enabled: true }}
              a11y={{
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
              }}
              className="!overflow-visible relative z-10 pointer-events-auto"
              onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
            >
              {items.map((item, idx) => {
                const img = item.productImage
                  ? getImageUrl(item.productImage)
                  : "";
                return (
                  <SwiperSlide key={`${item.model}-${idx}`}>
                    <div
                      className={`mx-auto flex items-center justify-center ${
                        isDesktop
                          ? "h-[220px] w-[520px] max-w-full"
                          : "h-[260px] w-[260px]"
                      }`}
                    >
                      <div className="relative h-full w-full">
                        {img ? (
                          <Image
                            src={img}
                            alt={item.name?.[lang] || "product image"}
                            fill
                            sizes="(max-width:768px) 60vw, 520px"
                            className="object-contain select-none pointer-events-none"
                            priority={idx < 3}
                          />
                        ) : (
                          <figure className="h-full w-full flex flex-col items-center justify-center text-center px-6">
                            <figcaption className="mt-4 text-white/70 text-lg md:text-xl font-medium">
                              {item.name?.[lang]}
                            </figcaption>
                          </figure>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {activeItem && (
              <div
                className="mt-8 flex flex-col items-center pointer-events-auto"
                aria-live="polite"
              >
                {/* Томруулсан caption */}
                <p className="text-white font-semibold text-center text-2xl md:text-3xl">
                  {activeItem.name?.[lang]}
                </p>

                {/* View Detail → Modal */}
                <button
                  type="button"
                  aria-label="View Detail"
                  onClick={() => openModal(activeIndex)}
                  className="mt-5 rounded-full bg-[#E84747] px-8 py-4 text-white font-semibold duration-500 ease-in-out hover:bg-[#0888A3] active:brightness-95 focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  View Detail
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ----- Modal (PORTAL) ----- */}
      {isModalOpen && selected && (
        <ModalPortal>
          <div className="fixed inset-0 z-[1000] flex items-center justify-center">
            {/* backdrop */}
            <button
              aria-label="Close dialog"
              onClick={closeModal}
              className="absolute inset-0 bg-black/70"
            />
            {/* panel */}
            <div
              role="dialog"
              aria-modal="true"
              className="relative z-[1001] w-[min(1080px,calc(100vw-2rem))] max-h-[calc(100vh-2rem)] overflow-auto rounded-2xl bg-[#141414] text-white shadow-2xl"
            >
              {/* Close (X) */}
              <button
                onClick={closeModal}
                aria-label="Close dialog"
                className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-white/20"
              >
                ×
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8 md:p-10">
                {/* Left: image */}
                <div className="flex items-start md:items-center justify-center">
                  <div className="relative w-full max-w-[520px] h-[260px] sm:h-[320px] md:h-[380px]">
                    <Image
                      src={getImageUrl(selected.productImage)}
                      alt={selected.name?.[lang] || "product"}
                      fill
                      sizes="(max-width: 1024px) 90vw, 520px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Right: details */}
                <div className="flex flex-col">
                  {/* Model */}
                  {selected.model ? (
                    <p className="text-sm sm:text-base text-white/70 tracking-wide">
                      {selected.model}
                    </p>
                  ) : null}
                  {/* Name */}
                  <h3 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold">
                    {selected.name?.[lang]}
                  </h3>

                  {/* Description */}
                  {selected.description?.[lang] ? (
                    <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
                      {selected.description?.[lang]}
                    </p>
                  ) : null}

                  {/* Price + CTA */}
                  <div className="mt-8 flex items-center justify-between gap-6">
                    <p className="text-3xl sm:text-4xl font-extrabold">
                      {selected.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal nav arrows (bottom-right) */}
              {total > 1 && (
                <div className="absolute bottom-4 right-4 flex items-center gap-3">
                  <button
                    aria-label="Previous product"
                    onClick={modalPrev}
                    className="h-10 w-10 rounded-full border border-white/40 text-white/90 hover:bg-white/10"
                  >
                    ‹
                  </button>
                  <button
                    aria-label="Next product"
                    onClick={modalNext}
                    className="h-10 w-10 rounded-full border border-white/40 text-white/90 hover:bg-white/10"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>
        </ModalPortal>
      )}

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
