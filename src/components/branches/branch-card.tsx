'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Branch } from '@/lib/types/branch.types';
import { getImageUrl } from '@/lib/utils';
import { LanguageKey } from '@/lib/types/data.types';
import { useTranslations } from 'next-intl';
const MapComponent = dynamic(() => import('../map'), {
  ssr: false,
});

interface BranchCardProps {
  branch: Branch;
  lang: LanguageKey;
}

const BranchCard: React.FC<BranchCardProps> = ({ branch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const t = useTranslations('branchesTranslation');

  const handleGetDirections = () => {
    const lat = branch.coordinates[0];
    const lng = branch.coordinates[1];
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const handleOpenMapPoint = () => {
    const lat = branch.coordinates[0];
    const lng = branch.coordinates[1];

    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 bg-card border-border/50 pt-0">
        <div className="relative overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden">
            {!imageError ? (
              <Image
                src={getImageUrl(branch.image)}
                alt={branch.name}
                fill
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <svg
                    className="w-12 h-12 mx-auto mb-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">{t('imageNotFound')}</p>
                </div>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <CardTitle className="text-white text-xl font-bold drop-shadow-sm">
              📍 {branch.name}
            </CardTitle>
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  🏠 {branch.fullAddress}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 text-secondary-foreground"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">☎️ {branch.phone}</p>
            </div>
          </div>

          {/* <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                            {branch.services.slice(0, 2).map((service, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {service}
                                </Badge>
                            ))}
                            {branch.services.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                    +{branch.services.length - 2} more
                                </Badge>
                            )}
                        </div>
                    </div> */}

          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {t('moreDetails')}
            </Button>
            <Button
              onClick={handleOpenMapPoint}
              variant="outline"
              className="flex-1"
            >
              🗺️ {t('viewOnMap')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 max-h-[70vh] flex flex-col gap-0">
          <DialogHeader className="p-6 border-b border-gray-200">
            <DialogTitle className="text-2xl font-bold">
              {branch.name}
            </DialogTitle>
            <DialogDescription>{branch.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 flex-1 overflow-y-auto p-6">
            {/* Branch Image */}
            <div className="aspect-video rounded-lg overflow-hidden">
              {!imageError ? (
                <Image
                  src={getImageUrl(branch.image)}
                  alt={branch.name}
                  width={500}
                  height={500}
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>{t('imageNotFound')}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-card-foreground">
                  {t('contactInfo')}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">☎️</span>
                    <span className="text-sm">{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">✉️</span>
                    <span className="text-sm">{branch.email}</span>
                  </div>
                  {branch.pastor && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">🎓</span>
                      <span className="text-sm">Pastor: {branch.pastor}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-card-foreground">
                  {t('services')}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {branch.services.map((service, index) => (
                    <Badge key={index} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-2">
              <h4 className="font-semibold text-card-foreground">
                {t('location')}
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">📍</span>
                <span className="text-sm">{branch.fullAddress}</span>
              </div>

              <div className="h-64 rounded-lg overflow-hidden border">
                <MapComponent position={branch.coordinates} />
              </div>
            </div>

            {/* Action Buttons */}
          </div>
          <DialogFooter className="p-6 flex flex-col sm:flex-row gap-2 pt-4">
            <Button
              onClick={handleGetDirections}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {t('getDirection')}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(`tel:${branch.phone}`, '_self')}
            >
              {t('callNow')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BranchCard;
