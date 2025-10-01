'use server';
import { postRequest } from '../http-client';
import { ContactFormData } from '../types/contact.types';
import { SurverAnswer } from '../types/survey.types';

export const saveMessage = async (data: ContactFormData) => {
  return postRequest('/contact/messages', data);
};

export const submitSurvey = async (data: SurverAnswer) => {
  return postRequest('/survey/submit', data);
};
