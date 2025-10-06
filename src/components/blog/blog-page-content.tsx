"use client";

import React, { useState, useRef, useEffect } from "react";
import BlogCard from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaMagnifyingGlass, FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { Category, type Blog } from "@/lib/types/blog.types";
import { LanguageKey } from "@/lib/types/data.types";
import { useRouter } from "next/navigation";
import { queryStringBuilder } from "@/lib/utils";
import { useTranslations } from "next-intl";

const BlogPageContent = ({
  blogList,
  categories,
  filters,
  lang,
}: {
  blogList: {
    data: Blog[];
    total: number;
    totalPages: number;
    currentPage: number;
  };
  lang: LanguageKey;
  categories: Category[];
  filters: {
    search: string;
    category: string;
    page: number;
  };
}) => {
  const currentPage = filters?.page || 1;
  const [searchTerm, setSearchTerm] = useState(filters?.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    filters?.category || "all"
  );
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations("blogTranslation");

  const categoriesData = [
    { id: "all", name: t("allBlogs") },
    ...categories.map((category) => ({
      id: category._id,
      name: category.name?.[lang],
    })),
  ];

  const totalPages = blogList.totalPages;

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      return () =>
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  const debouncedSearch = (value: string) => {
    setSearchTerm(value);
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      const queryString = queryStringBuilder({
        search: value,
        category: selectedCategory !== "all" ? selectedCategory : "",
        page: "1",
      });
      router.push(`/blog${queryString ? `?${queryString}` : ""}`);
    }, 500);
  };

  const handlePageChange = (page: number) => {
    const queryString = queryStringBuilder({
      page: page.toString(),
      search: searchTerm,
      category: selectedCategory !== "all" ? selectedCategory : "",
    });
    router.push(`/blog${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div>
      {/* Search and Categories Section */}
      <section className="py-12 bg-muted">
        <div className="container max-w-6xl mx-auto px-6">
          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-[4]" />
              <Input
                type="text"
                placeholder={t("search")}
                value={searchTerm}
                onChange={(e) => debouncedSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Scrollable Categories */}
          <div className="relative">
            {/* Left Scroll Button */}
            <Button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              variant="outline"
              size="icon"
              className={`absolute inset-y-0 left-0 top-1/2 -translate-y-1/2 z-[4] w-10 h-10 rounded-full shadow-lg ${
                canScrollLeft
                  ? "hover:bg-accent hover:text-accent-foreground opacity-100"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <FaArrowLeft className="size-4" />
            </Button>

            {/* Right Scroll Button */}
            <Button
              onClick={scrollRight}
              disabled={!canScrollRight}
              variant="outline"
              size="icon"
              className={`absolute inset-y-0 right-0 top-1/2 -translate-y-1/2 z-[4] w-10 h-10 rounded-full shadow-lg ${
                canScrollRight
                  ? "hover:bg-accent hover:text-accent-foreground opacity-100"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <FaArrowRight className="size-4" />
            </Button>

            {/* Scrollable Categories Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide px-12 py-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categoriesData.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    const queryString = queryStringBuilder({
                      category: category.id,
                      page: "1",
                      search: searchTerm,
                    });
                    router.push(`/blog${queryString ? `?${queryString}` : ""}`);
                  }}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  className="flex-shrink-0"
                >
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-6">
          {blogList.data.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold mb-2">{t("noBlogs")}</h3>
              <p className="text-muted-foreground">{t("noResults")}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogList.data.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 0 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button
                    onClick={() => {
                      handlePageChange(currentPage - 1);
                    }}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="icon"
                  >
                    <FaArrowLeft className="size-4" />
                  </Button>
                  {Array.from(
                    { length: totalPages > 5 ? 5 : totalPages },
                    (_, i) => {
                      if (totalPages < 5 || currentPage < 3) {
                        return i + 1;
                      }
                      if (currentPage > 3) {
                        return currentPage - 2 + i;
                      } else {
                        return i + 1;
                      }
                    }
                  ).map((page) => (
                    <Button
                      key={page}
                      onClick={() => {
                        handlePageChange(page);
                      }}
                      variant={currentPage == page ? "default" : "outline"}
                      size="sm"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    onClick={() => {
                      handlePageChange(currentPage + 1);
                    }}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="icon"
                  >
                    <FaArrowRight className="size-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPageContent;
