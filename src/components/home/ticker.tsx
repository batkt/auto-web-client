'use client';

import { HomeGalleryData, LanguageKey } from '@/lib/types/data.types';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const rowsDefaultData = [
  {
    images: [],
    direction: 1,
    speed: 40,
  },
  {
    images: [],
    direction: -1,
    speed: 40,
  },
  {
    images: [],
    direction: 1,
    speed: 40,
  },
];

export default function Ticker({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: HomeGalleryData;
}) {
  const perRowImagesCount = Math.ceil(data.images.length / 3);
  const rows = rowsDefaultData.map((row, index) => {
    return {
      ...row,
      images: data.images.slice(
        index * perRowImagesCount,
        (index + 1) * perRowImagesCount
      ),
    };
  });

  return (
    <div className="py-20">
      <div className="mb-16 text-center px-6">
        <h2 className="text-3xl sm:text-4xl text-center font-medium mb-6">
          {data.title?.[lang]}
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {data.description?.[lang]}
        </p>
      </div>
      {rows.map((row, rowIndex) => (
        <Marquee
          key={rowIndex}
          className="py-4"
          direction={rowIndex % 2 === 0 ? 'left' : 'right'}
        >
          {row.images.map((src, i) => (
            // <motion.div
            //   key={`${rowIndex}-${i}`}
            //   layoutId={`row-${rowIndex}-${src}`}
            // >
            <Image
              key={`${rowIndex}-${i}`}
              src={getImageUrl(src)}
              alt=""
              width={500}
              height={250}
              className="h-[250px] w-auto object-cover rounded-lg mx-4"
            />
            // </motion.div>
          ))}
        </Marquee>
      ))}

      {/* <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            layoutId={`fullscreen-${fullscreenImage}`}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center cursor-pointer"
            onClick={() => setFullscreenImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              src={fullscreenImage}
              alt=""
              width={1600}
              height={1200}
              className="object-contain max-h-screen max-w-screen"
            />
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}
