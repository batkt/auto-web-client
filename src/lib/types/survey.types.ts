export enum AnswerType {
  SHORT_TEXT = 'short_text',
  LONG_TEXT = 'long_text',
  SINGLE_CHOICE = 'single_choice',
  MULTIPLE_CHOICE = 'multiple_choice',
  NUMBER = 'number',
  DATE = 'date',
}

export enum SurveyStatus {
  SAVED = 'saved',
  STARTED = 'started',
  FINISHED = 'finished',
  STOPPED = 'stopped',
  ARCHIVED = 'archived',
}

export interface Question {
  _id: string;
  questionText: string;
  description?: string;
  answerType: AnswerType;
  options?: string[];
  order: number; // Add order field for questions
  isRequired: boolean; // Add isRequired field for questions
}

export interface Group {
  _id: string;
  title: string;
  description?: string;
  questions: Question[];
  order: number; // Add order field for groups
}

export interface Survey {
  _id: string;
  title: string;
  description?: string;
  questions: Question[];
  groups: Group[];
  version: number;
  status: SurveyStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SurverAnswer {
  surveyId: string;
  version: number;
  answers: {
    questionId: string;
    value: string;
  }[];
}
