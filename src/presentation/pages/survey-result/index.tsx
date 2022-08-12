import React, { useEffect, useState } from "react";

import { LoadSurveyResult } from "@/domain/usecases";
import {  Error, Footer, Header, Loading } from "@/presentation/components";
import { useErrorHandler } from "@/presentation/hooks";
import { SurveyResultData } from "@/presentation/pages/survey-result/components";

import styles from "./styles.scss";

type SurveyResultProps = {
  loadSurveyResult: LoadSurveyResult;
};

const SurveyResult: React.FC<SurveyResultProps> = ({ loadSurveyResult }: SurveyResultProps) => {
  const handleError = useErrorHandler((error: Error) => setState(prevState => ({ ...prevState, surveyResult: null, error: error.message })));
  const [state, setState] = useState({
    isLoading: false,
    error: "",
    surveyResult: null as LoadSurveyResult.Model,
    reloadSurvey: false,
  });

  const reload = (): void => {
    setState(prevState => ({
      isLoading: false,
      surveyResult: null,
      error: "",
      reloadSurvey: !prevState.reloadSurvey,
    }));
  };

  
  
  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(prevState => ({ ...prevState, surveyResult })))
      .catch(handleError);
  }, [state.reloadSurvey]);

  return (
    <div className={styles.surveyResultWrap}>
      <Header />

      <div data-testid="survey-result" className={styles.contentWrap}>
        { state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} /> }
        { state.isLoading && <Loading /> }
        { state.error && <Error error={state.error} reload={reload} /> }
      </div>
      
      <Footer />
    </div>
  )
};

export default SurveyResult;