import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import styles from "./styles.scss";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div className={styles.inputWrap}>
      <input {...props} />
      <GoPrimitiveDot />
    </div>
  );
};

export default Input;