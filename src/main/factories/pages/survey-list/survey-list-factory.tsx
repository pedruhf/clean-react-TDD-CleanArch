import React from "react";

import { SurveyList } from "@/presentation/pages";
import { makeRemoteLoadSurveyList } from "@/main/factories/usecases";

export const makeSurveyList = () => {
  return (
    <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />
  )
};
