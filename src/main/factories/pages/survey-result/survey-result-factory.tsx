import React from "react";

import { SurveyResult } from "@/presentation/pages";
import { makeRemoteLoadSurveyResult, makeRemoteSaveSurveyResult } from "@/main/factories/usecases";
import { useParams } from "react-router-dom";

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<any>();
  return (
    <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} saveSurveyResult={makeRemoteSaveSurveyResult(id)} />
  );
};
