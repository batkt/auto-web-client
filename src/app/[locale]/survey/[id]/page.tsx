import SurveyForm from '@/components/survey/survey-form';
import { getRequest } from '@/lib/http-client';
import { Survey } from '@/lib/types/survey.types';
import React from 'react';

const SurveyListPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const surveyResponse = await getRequest<Survey>(`/surveys/${id}/active`);

  console.log(surveyResponse);
  const surveyData = surveyResponse.data;

  return (
    <div>
      <div className="h-16 md:h-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <section className="py-20 pt-6">
        <div className="container max-w-4xl mx-auto px-6">
          <SurveyForm surveyData={surveyData} />
        </div>
      </section>
    </div>
  );
};

export default SurveyListPage;
