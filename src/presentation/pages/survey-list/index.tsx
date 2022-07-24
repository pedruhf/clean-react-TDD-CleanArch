import React, { useEffect } from "react";

import { Footer, Header } from "@/presentation/components";
import { SurveyItemEmpty } from "@/presentation/pages/survey-list/components";
import { LoadSurveyList } from "@/domain/usecases";
import styles from "./styles.scss";

type SurveyListProps = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<SurveyListProps> = ({ loadSurveyList }: SurveyListProps) => {
  useEffect(() => {
    (async function () {
      loadSurveyList.loadAll();
    })();
  }, []);

  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default SurveyList;