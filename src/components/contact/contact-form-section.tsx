"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { saveMessage } from "@/lib/action";
import { toast } from "sonner";
import { ContactFormData } from "@/lib/types/contact.types";

const ContactFormSection = () => {
  const t = useTranslations("contactTranslation");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await saveMessage(data);

      if (res.code === 201) {
        toast.success(t("messageSentSuccessfully"));
      } else {
        toast.error(t("messageSentFailed"));
      }
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("messageSentFailed"));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("sendUsMessage")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("firstName")}</Label>
              <Input
                id="firstName"
                {...register("firstName", {
                  required: t("firstNameRequired"),
                })}
                placeholder={t("enterFirstName")}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t("lastName")}</Label>
              <Input
                id="lastName"
                {...register("lastName", {
                  required: t("lastNameRequired"),
                })}
                placeholder={t("enterLastName")}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("emailAddress")}</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: t("emailAddressRequired"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("invalidEmail"),
                },
              })}
              placeholder={t("enterEmailAddress")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("phoneNumber")}</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone", {
                required: t("phoneNumberRequired"),
              })}
              placeholder={t("enterPhoneNumber")}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">{t("subject")}</Label>
            <Input
              id="subject"
              {...register("subject", {
                required: t("subjectRequired"),
              })}
              placeholder={t("enterSubject")}
            />
            {errors.subject && (
              <p className="text-sm text-destructive">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("message")}</Label>
            <Textarea
              id="message"
              {...register("message", {
                required: t("messageRequired"),
                minLength: {
                  value: 10,
                  message: t("messageLength"),
                },
              })}
              placeholder={t("enterMessage")}
              rows={5}
            />
            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t("sending") : t("sendMessage")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactFormSection;
