import React, { useEffect, useState } from "react";

import { Footer, Header } from "@/presentation/components";
import { Error, SurveyContext, SurveyListItem } from "@/presentation/pages/survey-list/components";
import { LoadSurveyList } from "@/domain/usecases";

import styles from "./styles.scss";

type SurveyListProps = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<SurveyListProps> = ({ loadSurveyList }: SurveyListProps) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: "",
    reloadSurveys: false,
  });

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(error => setState({ ...state, error: error.message }));
  }, [state.reloadSurveys]);

  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          { state.error ? <Error /> : <SurveyListItem /> }
        </SurveyContext.Provider>
      </div>

      <Footer />
    </div>
  );
};

export default SurveyList;