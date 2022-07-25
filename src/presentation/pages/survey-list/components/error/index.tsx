import React, { useContext } from "react";
import styles from "./styles.scss";

import { SurveyContext } from "@/presentation/pages/survey-list/components";

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext);

  const reloadSurveys = () => {
    setState({ surveys: [], error: "", reloadSurveys: !state.reloadSurveys });
  };

  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button data-testid="reload-button" onClick={reloadSurveys}>Tentar novamente</button>
    </div>
  );
};

export default Error;
