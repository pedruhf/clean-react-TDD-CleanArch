export type SurveyResultModel = {
  question: string;
  date: Date;
  answers: SurveyResulAnswerModel[];
}

export type SurveyResulAnswerModel = {
  image?: string;
  answer: string;
  count: number;
  percent: number;
  isCurrentAccountAnswer: boolean;
};
