import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import styles from "./styles.scss";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<InputProps> = (props: InputProps) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  return (
    <div className={styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <GoPrimitiveDot />
    </div>
  );
};

export default Input;