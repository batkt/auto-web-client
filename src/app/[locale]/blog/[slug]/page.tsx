import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BlogCard from '@/components/blog/blog-card';
// import SocialShare from '@/components/ui/social-share';
import { FaCalendar } from 'react-icons/fa6';
import { Blog } from '@/lib/types/blog.types';
import { getRequest } from '@/lib/http-client';
import { formatDate, getEmbedUrl, getImageUrl } from '@/lib/utils';
import { LanguageKey } from '@/lib/types/data.types';
import { getTranslations } from 'next-intl/server';

// force dynamic
export const dynamic = 'force-dynamic';

// Generate metadata for SEO
export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const lang = locale as LanguageKey;
  const blogResponse = await getRequest<Blog>(`/blogs/${slug}`);
  const blog = blogResponse.data;

  if (!blog) {
    return {
      title: 'Нийтлэл олдсонгүй',
      description: 'Хайж байгаа нийтлэл олдсонгүй.',
    };
  }

  return {
    title: blog.title,
    description: blog?.description || blog.title,
    keywords: blog.categories.map((category) => category.name?.[lang] || ''),
    openGraph: {
      title: `${blog.title} | Монгол Христийн Сүм`,
      description: blog?.description || blog.title,
      images: [
        {
          url: getImageUrl(blog.thumbImage),
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: 'article',
      publishedTime: blog.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog?.description || blog.title,
      images: [getImageUrl(blog.thumbImage)],
    },
  };
}

export async function generateStaticParams() {
  try {
    const blogListResponse = await getRequest<{ blogs: Blog[] }>(
      '/blogs?status=published&limit=50'
    );
    const blogs = blogListResponse.data.blogs;

    return blogs.map((blog) => ({
      slug: blog._id,
    }));
  } catch (error) {
    // If the API is not available during build time, return empty array
    // This allows the page to be generated dynamically at runtime
    console.warn('Could not fetch blogs for static generation:', error);
    return [];
  }
}

export default async function BlogDetailPage(props: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await props.params;
  const lang = locale as LanguageKey;
  const blogTranslation = await getTranslations({
    locale: lang,
    namespace: 'blogTranslation',
  });

  const blogResponse = await getRequest<Blog>(`/blogs/${slug}`);
  const blog = blogResponse.data;

  if (!blog) {
    notFound();
  }

  // related posts
  const relatedPosts = await getRequest<{ blogs: Blog[] }>(
    `/blogs/?status=published&language=${lang}&limit=3`
  );

  //   const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/blog/${blog._id}`;
  return (
    <>
      {/* Hero Image & Title */}
      <section className="relative">
        <div className="h-[50vh] md:h-[70vh] relative overflow-hidden">
          <Image
            src={getImageUrl(blog.thumbImage)}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 via-60% to-black/90 to-100%">
            <div className="flex flex-col justify-end gap-8 h-full mx-auto max-w-4xl container px-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {blog.title}
              </h1>
              <div className="py-6">
                <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <FaCalendar className="size-3" />
                    {formatDate(blog.publishedAt || blog.createdAt)}
                  </div>
                  {/* <div className="flex items-center gap-1">
                                            <FaUser className="size-3" />
                                            {blog.author}
                                        </div> */}
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {category.name?.[lang]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 pt-6">
        <div className="container max-w-4xl mx-auto px-6">
          <div>
            <div>
              <article className="flex flex-col gap-4 tiptap text-lg">
                {blog.blocks?.map((block) => {
                  if (block.type === 'text') {
                    return (
                      <div
                        key={block.id}
                        className="block"
                        dangerouslySetInnerHTML={{
                          __html: block?.content || '',
                        }}
                      ></div>
                    );
                  }

                  if (block.type === 'image') {
                    return (
                      <Image
                        key={block.id}
                        src={getImageUrl(block.data?.url || '')}
                        alt={block.data?.alt || blog.title}
                        width={800}
                        height={800}
                        className="block w-full object-contain"
                      />
                    );
                  }

                  if (block.type === 'video') {
                    return (
                      <div key={block.id}>
                        <iframe
                          src={getEmbedUrl(block?.url || '') || ''}
                          width="100%"
                          className="rounded aspect-video"
                          allowFullScreen
                        />
                      </div>
                    );
                  }

                  return null;
                })}
              </article>

              {/* Social Share Section */}
              <div className="mt-8">
                {/* <SocialShare
                    url={shareUrl}
                    title={blog.title}
                    description="Энэ сонирхолтой нийтлэлийг уншиж үзээрэй: "
                    variant="minimal"
                  /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts?.data?.blogs?.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {blogTranslation('relatedPosts')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {blogTranslation('relatedPostsDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.data.blogs?.map((post) => (
                <BlogCard key={post._id} blog={post} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
