'use client';

import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaArrowLeft, FaHouse } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';

export default function BlogNotFound() {
  const blogTranslation = useTranslations('blogTranslation');

  return (
    <div>
      <div className="h-16 md:h-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="py-20 container max-w-4xl mx-auto px-6">
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12">
              <div className="text-6xl mb-6">📝</div>

              <h1 className="text-3xl font-bold mb-4">
                {blogTranslation('notFoundBlog')}
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                {blogTranslation('notFoundBlogDescription')}
              </p>

              <div className="flex flex-row gap-4 justify-center">
                <Link href="/blog">
                  <Button size="lg" className="flex items-center gap-2">
                    <FaArrowLeft className="size-4" />
                    {blogTranslation('backToBlog')}
                  </Button>
                </Link>

                <Link href="/">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <FaHouse className="size-4" />
                    {blogTranslation('home')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
