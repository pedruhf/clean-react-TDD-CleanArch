import React, { useEffect, useState } from "react";

import { Footer, Header } from "@/presentation/components";
import { SurveyListItem } from "@/presentation/pages/survey-list/components";
import { Error } from "@/presentation/components";
import { LoadSurveyList } from "@/domain/usecases";
import { useErrorHandler } from "@/presentation/hooks";

import styles from "./styles.scss";

type SurveyListProps = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<SurveyListProps> = ({ loadSurveyList }: SurveyListProps) => {
  const handleError = useErrorHandler((error: Error) => setState(prevState => ({ ...prevState, error: error.message })));
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: "",
    reloadSurveys: false,
  });

  const reload = (): void => {
    setState(prevState => ({
      surveys: [],
      error: "",
      reloadSurveys: !prevState.reloadSurveys,
    }));
  }

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(prevState => ({ ...prevState, surveys })))
      .catch(handleError);
  }, [state.reloadSurveys]);

  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        { state.error
          ? <Error error={state.error} reload={reload} />
          : <SurveyListItem surveys={state.surveys} />
        }
      </div>

      <Footer />
    </div>
  );
};

export default SurveyList;