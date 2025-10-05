"use client";

import { cn, getImageUrl } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaXmark } from "react-icons/fa6";
import HeaderItems from "./header-item";
import { HeaderData, LanguageKey } from "@/lib/types/data.types";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Header = ({
  data,
  lang,
  className,
}: {
  data: HeaderData;
  lang: LanguageKey;
  className?: string;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const nowDate = new Date();
  const t = useTranslations("footerTranslation");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 340) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Close mobile menu when scrolling
    const handleScrollCloseMenu = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScrollCloseMenu);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollCloseMenu);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header>
      <div
        className={cn(
          "absolute top-0 inset-x-0 h-16 md:h-20 z-10 transition-all duration-200",
          className
        )}
      >
        <HeaderItems
          className="text-white"
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          data={data}
          lang={lang}
        />
      </div>
      <div
        className={cn(
          "fixed top-0 z-10 w-full h-16 md:h-20 transition-all duration-200 bg-black text-white shadow-sm",
          isScrolled ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <HeaderItems
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          data={data}
          lang={lang}
          dark={false}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out md:hidden mobile-menu-container",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="uppercase font-black text-xl">
              <Image
                src={getImageUrl(data.logoImage)}
                alt="logo"
                width={100}
                height={100}
                className="h-10 w-auto object-contain"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground"
            >
              <FaXmark className="size-5" />
            </Button>
          </div>

          {/* Mobile Menu Items */}
          <nav className="flex-1 p-6">
            <ul className="space-y-4">
              {data.menuList?.map((menu, index) => (
                <li key={`mobile-menu-item-${index}`}>
                  <Link
                    href={menu.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-lg font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                  >
                    {menu.name?.[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {t("copyright", { year: nowDate.getFullYear() })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
