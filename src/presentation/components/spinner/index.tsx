import React from "react";
import styles from "./styles.scss";

type SpinnerProps = React.HTMLAttributes<HTMLElement>;

const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
  return (
    <div data-testid="spinner" {...props} className={[styles.spinner, props.className].join(" ")}>
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