import React, { useEffect, useState } from "react";

import { LoadSurveyResult, SaveSurveyResult } from "@/domain/usecases";
import {  Error, Footer, Header, Loading } from "@/presentation/components";
import { useErrorHandler } from "@/presentation/hooks";
import { SurveyResultContext, SurveyResultData } from "@/presentation/pages/survey-result/components";

import styles from "./styles.scss";

type SurveyResultProps = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
};

const SurveyResult: React.FC<SurveyResultProps> = ({ loadSurveyResult, saveSurveyResult }: SurveyResultProps) => {
  const handleError = useErrorHandler((error: Error) => setState(prevState => ({
    ...prevState,
    surveyResult: null,
    isLoading: false,
    error: error.message,
  })));
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

  const onAnswer = (answer: string): void => {
    if (state.isLoading) return;
    setState(prevState => ({ ...prevState, isLoading: true }));
    saveSurveyResult.save({ answer })
      .then(surveyResult => setState(prevState => ({ ...prevState, isLoading: false, surveyResult, })))
      .catch(handleError);
  };
  
  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(prevState => ({ ...prevState, surveyResult })))
      .catch(handleError);
  }, [state.reloadSurvey]);

  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={styles.contentWrap}>
          { state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} /> }
          { state.isLoading && <Loading /> }
          { state.error && <Error error={state.error} reload={reload} /> }
        </div>
      </SurveyResultContext.Provider>
      
      <Footer />
    </div>
  )
};

export default SurveyResult;