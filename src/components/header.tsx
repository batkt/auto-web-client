// app/components/Header.tsx
"use client";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaXmark } from "react-icons/fa6";
import HeaderItems from "./header-item";
import { HeaderData, LanguageKey } from "@/lib/types/data.types";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const nowDate = new Date();
  const t = useTranslations("footerTranslation");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 340);
    window.addEventListener("scroll", handleScroll);

    // close on scroll
    const handleScrollCloseMenu = () => {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScrollCloseMenu);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollCloseMenu);
    };
  }, [isMobileMenuOpen]);

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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // underline only under the text; centered
  const underlineSpan =
    "relative inline-block w-fit after:block after:h-[2px] after:bg-white after:mt-1 after:origin-left after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100";

  return (
    <header>
      {/* Top bar: mobile black, desktop transparent */}
      <div
        className={cn(
          "absolute top-0 inset-x-0 h-16 md:h-20 z-10 transition-all duration-200 bg-black md:bg-transparent",
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

      {/* Sticky bar after scroll */}
      <div
        className={cn(
          "fixed top-0 z-20 w-full h-16 md:h-20 transition-all duration-200 bg-black text-white shadow-sm",
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

      {/* Overlay */}
      {isMobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu overlay"
        />
      )}

      {/* Drawer: right, w-80 */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-primary text-white z-30 transform transition-transform duration-500 ease-in-out md:hidden mobile-menu-container",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full">
          {/* Drawer header */}
          <div className="flex items-center justify-end p-5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white"
              aria-label="Close menu"
            >
              <FaXmark className="size-7" />
            </Button>
          </div>

          <nav className="flex-1 px-6 flex items-center justify-center">
            <ul className="w-full text-start space-y-2 pl-12">
              {data.menuList?.map((menu, index) => {
                const href = menu.path;
                const isActive =
                  href === "/" ? pathname === "/" : pathname?.startsWith(href);
                return (
                  <li
                    key={`mobile-menu-item-${index}`}
                    className="tracking-wide"
                  >
                    <Link
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span
                        className={cn(
                          "text-xl mx-auto", // center text/underline
                          underlineSpan,
                          isActive && "font-semibold after:scale-x-100"
                        )}
                      >
                        {menu.name?.[lang]}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer — bigger + slightly higher */}
          <div className="px-6 pb-12 pt-4">
            <div className="text-base leading-6 opacity-95">
              {t("copyright", { year: nowDate.getFullYear() })}
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Header;
