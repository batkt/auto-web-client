'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { FaCalendar, FaUser, FaTag, FaArrowRight } from 'react-icons/fa6';
import { Card, CardContent } from '@/components/ui/card';
import { Blog } from '@/lib/types/blog.types';
import { formatDate, getImageUrl } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { LanguageKey } from '@/lib/types/data.types';

interface BlogCardProps {
  blog: Blog;
  lang: LanguageKey;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, lang }) => {
  const blogTranslation = useTranslations('blogTranslation');

  const firstTextBlock = blog?.blocks?.find((block) => block.type === 'text');
  return (
    <Card className="relative group overflow-hidden hover:shadow-xl transition-shadow duration-300 pt-0">
      <div className="aspect-[16/9] overflow-hidden">
        <Image
          src={getImageUrl(blog.thumbImage)}
          alt={blog.title}
          width={400}
          height={225}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <FaCalendar className="size-3" />
            {formatDate(blog.createdAt)}
          </div>
          <div className="flex items-center gap-1">
            <FaUser className="size-3" />
            {blog.author?.username}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-3 mb-3">
          {blog.categories.map((category) => (
            <div key={category._id} className="flex items-center gap-1">
              <FaTag className="size-3 text-primary" />
              <span className="text-sm font-medium text-primary">
                {category.name?.[lang]}
              </span>
            </div>
          ))}
        </div>

        <Link href={`/blog/${blog._id}`}>
          <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors text-card-foreground cursor-pointer">
            {blog.title}
          </h3>
        </Link>

        <div
          className="mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: firstTextBlock?.content || '',
          }}
        ></div>

        <Link
          href={`/blog/${blog._id}`}
          className="text-primary font-semibold hover:text-primary/80 transition-colors flex items-center gap-2 cursor-pointer"
        >
          {blogTranslation('readMore')}
          <FaArrowRight className="size-3" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
