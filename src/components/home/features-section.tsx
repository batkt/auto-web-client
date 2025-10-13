"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
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
      className="relative min-h-screen w-full bg-[#111]"
      style={{
        backgroundImage: `url(${getImageUrl(data.backgroundImage)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div id="contacts" className="mx-auto max-w-7xl px-6 pt-16 md:px-10">
        <div className="mb-10">
          <p className="text-white text-4xl md:text-5xl font-semibold">
            {data.title?.[lang]}
          </p>
          <p className="text-[#0888A3] text-5xl md:text-6xl font-extrabold mt-2">
            {data.secondaryTitle?.[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* First / Last name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="sr-only">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    className="bg-transparent border-b border-white/30 rounded-none px-0 text-white placeholder:text-gray-400 focus:ring-0 focus:border-cyan-400"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="sr-only">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    className="bg-transparent border-b border-white/30 rounded-none px-0 text-white placeholder:text-gray-400 focus:ring-0 focus:border-cyan-400"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-transparent border-b border-white/30 rounded-none px-0 text-white placeholder:text-gray-400 focus:ring-0 focus:border-cyan-400"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="sr-only">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  className="bg-transparent border-b border-white/30 rounded-none px-0 text-white placeholder:text-gray-400 focus:ring-0 focus:border-cyan-400"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  placeholder="Contact No"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="sr-only">
                  Subject
                </Label>
                <Input
                  id="subject"
                  className="bg-transparent border-b border-white/30 rounded-none px-0 text-white placeholder:text-gray-400 focus:ring-0 focus:border-cyan-400"
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="Subject"
                />
                {errors.subject && (
                  <p className="text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  className="bg-transparent border-b border-white/30 rounded-none px-0 text-white placeholder:text-gray-400 focus:ring-0 focus:border-cyan-400 resize-none"
                  {...register("message", {
                    required: "Message is required",
                    minLength: { value: 10, message: "Min 10 characters" },
                  })}
                  placeholder="Type Your Message Here"
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
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#e63946] text-white font-semibold shadow-lg transition-colors duration-500 ease-in-out hover:bg-[#0888A3] transform hover:scale-105 px-6 py-3 text-sm sm:text-base md:px-8 md:py-3 md:sm:px-10 md:sm:py-4 md:text-lg"
              >
                {isSubmitting ? "Sending..." : "SUBMIT INFORMATION"}
              </button>
            </form>
          </div>

          {/* RIGHT INFO */}
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-4">{data.location?.[lang]}</h3>
            <p className="text-white/80 mb-8 max-w-md">
              {data.description?.[lang]}
            </p>

            <ul className="space-y-5 mb-10">
              <li className="flex items-start gap-4">
                <FaLocationDot className="mt-1 text-white text-3xl" />
                <div>
                  <p>{data.address?.[lang]}</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <BiSolidPhoneCall className="text-white text-3xl" />
                <div className="flex gap-8">{data.phone}</div>
              </li>
              <li className="flex items-center gap-4">
                <FaTelegramPlane className="text-white text-3xl" />
                <span>{data.email}</span>
              </li>
            </ul>
            <div className="flex items-center gap-5 text-white/80 text-lg">
              <a href="#" className="hover:text-[#0888A3]">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-[#0888A3]">
                <FaXTwitter />
              </a>
              <a href="#" className="hover:text-[#0888A3]">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-[#0888A3]">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-[#0888A3]">
                <FaPinterestP />
              </a>
              <a href="#" className="hover:text-[#0888A3]">
                <FaGooglePlusG />
              </a>
            </div>

            {/* <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-cyan-400 shrink-0" />
                <p></p>
              </div>
              <div className="flex items-start gap-3">
                <FaPhone className="mt-1 text-cyan-400 shrink-0" />
                <p>{data.phone}</p>
              </div>
              <div className="flex items-start gap-3">
                <FaPaperPlane className="mt-1 text-cyan-400 shrink-0" />
                <p>{data.email}</p>
              </div>
            </div>

            <div className="flex gap-4 text-xl">
              <FaFacebook className="hover:text-cyan-400 cursor-pointer" />
              <FaLinkedin className="hover:text-cyan-400 cursor-pointer" />
              <FaInstagram className="hover:text-cyan-400 cursor-pointer" />
              <FaPinterest className="hover:text-cyan-400 cursor-pointer" />
              <FaGooglePlusG className="hover:text-cyan-400 cursor-pointer" />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
