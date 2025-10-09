"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/navigation";

const LanguageSelector = ({ lang, dark }: { lang: string; dark: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select
      onValueChange={(value) => {
        router.push(pathname, {
          locale: value,
          scroll: false,
        });
      }}
      value={lang}
    >
      <SelectTrigger
        size="sm"
        className={cn(
          "border bg-transparent text-white focus-visible:ring-0 shadow-none",
          dark ? "text-white" : "text-white"
        )}
        chevronClassName={cn("opacity-100", dark ? "text-white" : "text-white")}
      >
        <SelectValue placeholder={"Хэл"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="mn">Монгол</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
