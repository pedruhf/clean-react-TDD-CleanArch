import React, { useContext } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import Context from "@/presentation/contexts/form/form-context";
import { colors } from "@/presentation/styles/colors";
import styles from "./styles.scss";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { errorState } = useContext(Context);
  const error = errorState[props.name];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  const getStatus = (): string => {
    return colors.error;
  };

  const getTitle = (): string => {
    return error;
  };

  return (
    <div className={styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span data-testid={`${props.name}-status`} title={getTitle()}>
        <GoPrimitiveDot color={getStatus()} />
      </span>
    </div>
  );
};

export default Input;