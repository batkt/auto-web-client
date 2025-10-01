'use client';

import {
  ContactInfoData,
  FooterData,
  HeaderData,
  LanguageKey,
} from '@/lib/types/data.types';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import React from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaArrowRight,
  FaHeart,
  FaYoutube,
} from 'react-icons/fa6';
import { useTranslations } from 'next-intl';

const Footer = ({
  data,
  headerData,
  lang,
  contactInfoData,
}: {
  data: FooterData;
  headerData: HeaderData;
  lang: LanguageKey;
  contactInfoData: ContactInfoData;
}) => {
  const nowDate = new Date();
  const t = useTranslations('footerTranslation');

  return (
    <footer className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container px-6 max-w-7xl mx-auto pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Church Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="text-3xl font-bold mb-2">
                <Image
                  src={getImageUrl(headerData.logoImage)}
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-auto h-10 object-contain"
                />
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              {data.description[lang]}
            </p>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">
                {t('followUs')}
              </h4>
              <div className="flex items-center gap-4">
                {data?.socialMedia.map((item, index) => (
                  <a
                    key={`socialMedia-Index-${index}`}
                    target="_blank"
                    href={item.url}
                    className="p-3 rounded-full bg-primary/20 hover:bg-primary/30 text-primary transition-all duration-300 transform hover:scale-110 border border-primary/30"
                  >
                    {item.name === 'Facebook' && (
                      <FaFacebookF className="size-5" />
                    )}
                    {item.name === 'Instagram' && (
                      <FaInstagram className="size-5" />
                    )}
                    {item.name === 'Youtube' && (
                      <FaYoutube className="size-5" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-2">{t('quickLinks')}</h4>
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </div>
            <ul className="space-y-3">
              {headerData?.menuList?.map((menu, index) => (
                <li key={`menuIndex-${index}`}>
                  <Link
                    href={menu.path}
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-300 group"
                  >
                    <FaArrowRight className="size-3 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {menu.name?.[lang]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-2">{t('contactInfo')}</h4>
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="p-2 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-all duration-300">
                  <FaLocationDot className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {contactInfoData.address[lang]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-all duration-300">
                  <FaPhone className="size-4 text-primary" />
                </div>
                <a
                  href={`tel:${contactInfoData.phone}`}
                  className="text-slate-300 hover:text-white transition-colors duration-300"
                >
                  {contactInfoData.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-all duration-300">
                  <FaEnvelope className="size-4 text-primary" />
                </div>
                <a
                  href={`mailto:${contactInfoData.email}`}
                  className="text-slate-300 hover:text-white transition-colors duration-300"
                >
                  {contactInfoData.email}
                </a>
              </div>
            </div>
          </div>

          {/* Service Hours */}
          <div>
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-2">
                {contactInfoData.services.name[lang]}
              </h4>
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </div>
            <div className="space-y-3">
              {contactInfoData.services.data.map((item, index) => (
                <div
                  key={`serviceIndex-${index}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="p-2 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-all duration-300">
                    <FaClock className="size-4 text-primary" />
                  </div>
                  <div className="text-slate-300 text-sm">
                    <p className="font-medium text-white">{item.name[lang]}</p>
                    <p>{item.description[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-700/50">
        <div className="container px-6 max-w-7xl mx-auto py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              {t('copyright', { year: nowDate.getFullYear() })}
            </p>
            {lang === 'en' ? (
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>Made with</span>
                <FaHeart className="size-4 text-red-500 animate-pulse" />
                <span>for our community</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>Бидэнтэй хамт</span>
                <FaHeart className="size-4 text-red-500 animate-pulse" />
                <span>бүтээгээрэй</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
