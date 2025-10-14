"use client";

import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnswerType, Group, Question, Survey } from "@/lib/types/survey.types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { submitSurvey } from "@/lib/action";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

interface SurveyFormProps {
  surveyData: Survey;
}

const SurveyForm = ({ surveyData }: SurveyFormProps) => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm();

  const getAllItems = () => {
    const items: Array<{
      type: "question" | "group";
      data: Question | Group;
      index: number;
    }> = [];

    // Add questions
    surveyData.questions.forEach((question, index) => {
      items.push({ type: "question", data: question, index });
    });

    // Add groups
    surveyData.groups.forEach((group, index) => {
      items.push({
        type: "group",
        data: group,
        index: surveyData.questions.length + index,
      });
    });

    // Sort by order
    return items.sort((a, b) => a.data.order - b.data.order);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await submitSurvey({
        surveyId: surveyData._id,
        version: surveyData.version,
        answers: Object.entries(data).map(([key, value]) => ({
          questionId: key,
          value,
        })),
      });

      console.log(response);
      toast.success("Судалгаа амжилттай илгээгдлээ", {
        description: "Бидний судалгааг бөглөсөн танд баярлалаа",
      });
      router.push("/");
    } catch (error) {
      let message = "Алдаа гарлаа";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  const renderQuestion = (
    question: Question,
    questionIndex: number,
    groupNumber?: number
  ) => {
    const questionKey = question._id;

    return (
      <div key={questionKey} className="space-y-2">
        <div className="space-y-2">
          <Label className="text-base font-medium">
            {groupNumber ? `${groupNumber}.` : ""}
            {questionIndex + 1}. {question.questionText}
            {question.isRequired && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </Label>
          {question.description && (
            <p className="text-sm text-muted-foreground">
              {question.description}
            </p>
          )}
        </div>

        <div className="space-y-2 ml-8">
          {question.answerType === AnswerType.SHORT_TEXT && (
            <Controller
              control={control}
              name={questionKey}
              rules={{
                required: question.isRequired ? "Хариулт оруулна уу" : false,
              }}
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    placeholder="Хариулт оруулна уу"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={cn(fieldState.error && "border-red-500")}
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          )}

          {question.answerType === AnswerType.LONG_TEXT && (
            <Controller
              control={control}
              name={questionKey}
              rules={{
                required: question.isRequired ? "Хариулт оруулна уу" : false,
              }}
              render={({ field, fieldState }) => (
                <div>
                  <Textarea
                    placeholder="Хариулт оруулна уу"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    rows={4}
                    className={cn(fieldState.error && "border-red-500")}
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          )}

          {question.answerType === AnswerType.NUMBER && (
            <Controller
              control={control}
              name={questionKey}
              rules={{
                required: question.isRequired ? "Хариулт оруулна уу" : false,
              }}
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    type="number"
                    placeholder="Хариулт оруулна уу"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={cn(fieldState.error && "border-red-500")}
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          )}

          {question.answerType === AnswerType.DATE && (
            <Controller
              control={control}
              name={questionKey}
              rules={{
                required: question.isRequired ? "Хариулт оруулна уу" : false,
              }}
              render={({ field, fieldState }) => (
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                          fieldState.error && "border-red-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(new Date(field.value), "PPP")
                          : "Огноо сонгоно уу"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          )}

          {question.answerType === AnswerType.SINGLE_CHOICE &&
            question.options && (
              <Controller
                control={control}
                name={questionKey}
                rules={{
                  required: question.isRequired ? "Хариулт оруулна уу" : false,
                }}
                render={({ field, fieldState }) => (
                  <div>
                    <RadioGroup
                      value={field.value || ""}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      {question.options?.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${questionKey}-${optionIndex}`}
                          />
                          <Label htmlFor={`${questionKey}-${optionIndex}`}>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {fieldState.error && (
                      <p className="text-sm text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}

          {question.answerType === AnswerType.MULTIPLE_CHOICE &&
            question.options && (
              <Controller
                control={control}
                name={questionKey}
                rules={{
                  required: question.isRequired ? "Хариулт оруулна уу" : false,
                }}
                render={({ field, fieldState }) => (
                  <div>
                    <div className="space-y-2">
                      {question.options?.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`${questionKey}-${optionIndex}`}
                            checked={
                              Array.isArray(field.value) &&
                              field.value.includes(option)
                            }
                            onCheckedChange={(checked) => {
                              const currentArray = Array.isArray(field.value)
                                ? field.value
                                : [];
                              const newArray = checked
                                ? [...currentArray, option]
                                : currentArray.filter(
                                    (item) => item !== option
                                  );
                              field.onChange(newArray);
                            }}
                          />
                          <Label htmlFor={`${questionKey}-${optionIndex}`}>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {fieldState.error && (
                      <p className="text-sm text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}
        </div>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-md max-w-5xl mx-auto"
    >
      {/* Survey Header */}
      <div>
        <h1 className="text-2xl font-bold font-title">
          {surveyData.title || "Гарчиггүй судалгаа"}
        </h1>
        {surveyData.description && (
          <p className="text-muted-foreground font-description">
            {surveyData.description}
          </p>
        )}
      </div>

      {/* Unified Questions and Groups List */}
      {getAllItems().length > 0 ? (
        <div className="space-y-4">
          {getAllItems().map((item, index) => (
            <div key={`${item.type}-${item.index}`} className="relative">
              {item.type === "question" ? (
                <div>{renderQuestion(item.data as Question, index)}</div>
              ) : (
                <div className="mt-6">
                  <div className="mb-4">
                    <h4 className="font-medium">
                      {index + 1}.{" "}
                      {(item.data as Group).title || `Бүлэг ${index + 1}`}
                    </h4>
                    {(item.data as Group).description && (
                      <p className="text-muted-foreground text-xs">
                        {(item.data as Group).description}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    {(item.data as Group).questions
                      .sort((a, b) => a.order - b.order)
                      .map((question, questionIndex) => (
                        <div
                          key={`group-${index}-question-${questionIndex}`}
                          className="ml-4"
                        >
                          {renderQuestion(question, questionIndex, index + 1)}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground text-sm">
          <p>Судалгаанд асуулт эсвэл бүлэг нэмээгүй байна.</p>
          <p>
            Асуулт болон бүлгүүдийг нэмэхийн тулд Үүсгэх таб руу шилжинэ үү.
          </p>
        </div>
      )}

      {/* Submit Button */}
      {getAllItems().length > 0 && (
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            size="lg"
            className="px-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Илгээж байна..." : "Судалгаа илгээх"}
          </Button>
        </div>
      )}
    </form>
  );
};

export default SurveyForm;
