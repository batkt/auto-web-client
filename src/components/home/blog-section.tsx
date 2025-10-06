"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";
import BlogCard from "../blog/blog-card";
import { Blog } from "@/lib/types/blog.types";
import { LanguageKey, HomeBlogData } from "@/lib/types/data.types";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

const BlogSection = ({
  lang,
  data,
  blogs,
}: {
  lang: LanguageKey;
  data: HomeBlogData;
  blogs: Blog[];
}) => {
  const card = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  const bgUrl = data?.backgroundImage ? getImageUrl(data.backgroundImage) : "";

  return (
    <section id="about" className="relative w-full overflow-hidden bg-[#111]">
      {bgUrl && (
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
      )}

      <div className="w-full relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-auto pt-12 sm:pt-12 pb-12 sm:pb-12 md:pb-12 lg:pb-12">
        <h2 className="text-center font-extrabold text-white text-3xl sm:text-4xl md:mt-10 md:text-5xl lg:text-6xl">
          {data.title?.[lang]}
        </h2>
        <h3 className="mt-2 text-center font-extrabold text-[#0888A3] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          {data.secondaryTitle?.[lang]}
        </h3>

        <p className="mx-auto text-center text-white/90 leading-relaxed mt-4 text-base sm:text-lg max-w-2xl md:mt-6 md:text-lg md:max-w-3xl lg:text-xl">
          {data?.description?.[lang]}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              variants={card}
              whileHover={{
                y: -8,
                transition: { duration: 0.28, ease: "easeOut" },
              }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
