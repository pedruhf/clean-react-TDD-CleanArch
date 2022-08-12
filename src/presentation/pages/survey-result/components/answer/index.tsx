import React from "react";
import styles from "./styles.scss";

type AnswerProps = {
  answer: {
    image?: string;
    answer: string;
    count: number;
    percent: number;
    isCurrentAccountAnswer: boolean;
  }
};

const Answer: React.FC<AnswerProps> = ({ answer }: AnswerProps) => {
  const activeClassName = answer.isCurrentAccountAnswer && styles.active;

  return (
    <li data-testid="answer-wrap" className={[styles.answerWrap, activeClassName].join(" ")}>
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
    </li>
  );
};

export default Answer;
