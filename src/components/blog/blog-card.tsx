// components/BlogCard.tsx
import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { Blog } from "@/lib/types/blog.types";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const firstTextBlock = blog?.blocks?.find((block) => block.type === "text");

  return (
    <Card className="relative group overflow-hidden transition-shadow duration-300 bg-transparent shadow-none border-0 focus-visible:ring-0">
      {/* Image */}
      <div className="w-full overflow-hidden">
        <Image
          src={getImageUrl(blog.thumbImage)}
          alt={blog.title}
          width={400}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="px-0 pt-4">
        <Link href={`/blog/${blog._id}`}>
          <h3 className="text-xl font-bold mb-3 text-white transition-colors group-hover:text-primary cursor-pointer">
            {blog.title}
          </h3>
        </Link>

        {/* WHY: HTML-тэй текстийг эвдэлгүйгээр 3 мөрөөр л харуулах */}
        <div
          className="mb-4 text-white overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]"
          dangerouslySetInnerHTML={{ __html: firstTextBlock?.content || "" }}
        />
        <Link href={`/blog/${blog._id}`}>
          <div className="text-white font-semibold transition-colors flex items-center gap-2 cursor-pointer group-hover:text-red-600">
            Learn More
            <FaArrowRight className="size-3" />
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
