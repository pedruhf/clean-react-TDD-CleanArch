import React from "react";
import styles from "./styles.scss";

type SpinnerProps = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean;
};

const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
  const negativeClass = props.isNegative && styles.negative;
  return (
    <div data-testid="spinner" {...props} className={[styles.spinner, negativeClass, props.className].join(" ")}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;