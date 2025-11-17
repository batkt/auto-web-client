// app/components/FeaturesSection.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import {
  FaTelegramPlane,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
  FaGooglePlusG,
} from "react-icons/fa";
import { LanguageKey, HomeHelpData } from "@/lib/types/data.types";
import { getImageUrl } from "@/lib/utils";
import { saveMessage } from "@/lib/action";
import { ContactFormData } from "@/lib/types/contact.types";

const underlineBase =
  // Яагаад: нэг хэв маягийг бүх талбарт тогтвортой хэрэглэхийн тулд.
  "w-full bg-transparent border-0 border-b border-white/25 rounded-none px-0 text-white placeholder:text-gray-400 focus:ring-0 focus:border-white/60 focus:border-b-2";

const FeaturesSection = ({
  lang,
  data,
}: {
  lang: LanguageKey;
  data: HomeHelpData;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();
  const t = useTranslations("contactTranslation");

  const onSubmit = async (form: ContactFormData) => {
    try {
      const res = await saveMessage(form);
      if (res?.code === 201) {
        toast.success(t("messageSentSuccessfully"));
        reset();
      } else {
        toast.error(t("messageSentFailed"));
      }
    } catch {
      toast.error(t("messageSentFailed"));
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#111]"
      style={{
        backgroundImage: `url(${getImageUrl(data.backgroundImage)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="mb-4">
          <p className="text-white text-center md:text-left text-3xl md:text-5xl font-extrabold font-title">
            {data.title?.[lang]}
          </p>
          <p className="text-[#F7B514] mb-20 text-center md:text-left text-3xl md:text-5xl font-extrabold mt-2 font-title">
            {data.secondaryTitle?.[lang]}
          </p>
        </div>

        {/* layout */}
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          {/* LEFT FORM */}
          <div className="max-w-[460px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Name */}
              <div className="space-y-3">
                <Input
                  id="firstName"
                  placeholder={t("name")}
                  className={underlineBase}
                  {...register("firstName", { required: t("nameRequired") })}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Contact No */}
              <div className="space-y-3">
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t("contactNo")}
                  className={underlineBase}
                  {...register("phone", {
                    required: t("phoneNumberRequired"),
                  })}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-3">
                <Input
                  id="email"
                  type="email"
                  placeholder={t("emailAddress")}
                  className={underlineBase}
                  {...register("email", {
                    required: t("emailAddressRequired"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("invalidEmail"),
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-3">
                <Textarea
                  id="message"
                  rows={3}
                  placeholder={t("typeYourMessageHere")}
                  className={`${underlineBase} resize-none`}
                  {...register("message", {
                    required: t("messageRequired"),
                    minLength: { value: 10, message: t("messageLength") },
                  })}
                />
                {errors.message && (
                  <p className="text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 w-full inline-flex items-center justify-center rounded-full bg-red-700 text-white font-semibold shadow-lg transition-colors duration-300 ease-in-out hover:bg-primary px-8 py-4 text-base"
              >
                {isSubmitting ? t("sending") : t("submitInformation")}
              </button>
            </form>
          </div>

          {/* RIGHT INFO */}
          <div className="text-white max-w-[560px]">
            <h3 className="text-3xl text-center md:text-left mb-12 font-title">
              {data.location?.[lang]}
            </h3>
            <p className="text-white/50 text-center md:text-left mb-12 font-description">
              {data.description?.[lang]}
            </p>

            <ul className="space-y-8 mb-12">
              <li className="flex flex-col items-center md:items-start md:flex-row gap-4">
                <FaLocationDot className="text-white text-4xl md:text-3xl" />
                <div className="text-center md:text-left">
                  <p>{data.address?.[lang]}</p>
                </div>
              </li>
              <li className="flex flex-col items-center md:items-center md:flex-row gap-4">
                <BiSolidPhoneCall className="text-white text-4xl md:text-3xl" />
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
                  {data.phone}
                </div>
              </li>
              <li className="flex flex-col items-center md:items-center md:flex-row gap-4">
                <FaTelegramPlane className="text-white text-4xl md:text-3xl" />
                <span className="text-center md:text-left">{data.email}</span>
              </li>
            </ul>

            <div className="flex items-center justify-center md:justify-start gap-5 text-white/80 text-lg">
              <a
                href="#"
                className="hover:text-[#F7B514]"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-[#F7B514]" aria-label="X">
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="hover:text-[#F7B514]"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="hover:text-[#F7B514]"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="hover:text-[#F7B514]"
                aria-label="Pinterest"
              >
                <FaPinterestP />
              </a>
              <a
                href="#"
                className="hover:text-[#F7B514]"
                aria-label="Google Plus"
              >
                <FaGooglePlusG />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
