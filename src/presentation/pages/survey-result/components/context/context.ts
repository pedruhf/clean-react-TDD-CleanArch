import { createContext } from "react";

type SurveyResultProps = {
  onAnswer: (answer: string) => void;
};

export default createContext<SurveyResultProps>(null);
