"use client";

import { cn, getImageUrl } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Button } from "./ui/button";
import { FaBars } from "react-icons/fa6";
import { HeaderData, LanguageKey } from "@/lib/types/data.types";
import Image from "next/image";
import LanguageSelector from "./language-selector";

interface HeaderItemsProps {
  className?: string;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
  data: HeaderData;
  lang: LanguageKey;
  dark?: boolean;
}

const HeaderItems = ({
  className,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  data,
  lang,
  dark = true,
}: HeaderItemsProps) => {
  return (
    <div className={cn("h-full container max-w-6xl px-6 mx-auto", className)}>
      <div className="flex justify-between items-center size-full">
        <div className="uppercase font-black text-2xl">
          <Link href="/">
            <Image
              src={getImageUrl(data?.logoImage)}
              alt="logo"
              width={100}
              height={100}
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {data.menuList?.map((menu, index) => {
            return (
              <li key={`header-menu-item-${index}`}>
                <Link
                  href={menu.path}
                  className="py-4 hover:underline font-semibold text-lg transition-colors"
                >
                  {menu.name?.[lang]}
                </Link>
              </li>
            );
          })}

          <li>
            <LanguageSelector lang={lang} dark={dark} />
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSelector lang={lang} dark={dark} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen?.(!isMobileMenuOpen)}
            className="md:hidden text-inherit hover:bg-white/10"
          >
            <FaBars className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderItems;
