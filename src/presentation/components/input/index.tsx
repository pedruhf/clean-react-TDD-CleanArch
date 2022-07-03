import React, { useContext, useRef } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import Context from "@/presentation/contexts/form/form-context";
import { colors } from "@/presentation/styles/colors";
import styles from "./styles.scss";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<InputProps> = (props: InputProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  };

  const getStatus = (): string => {
    return error ? colors.error : colors.success;
  };

  const getTitle = (): string => {
    return error || "Tudo certo!";
  };

  return (
    <div className={styles.inputWrap}>
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <label onClick={() => { inputRef.current.focus() }}>{props.placeholder}</label>
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
      >
        <GoPrimitiveDot color={getStatus()} />
      </span>
    </div>
  );
};

export default Input;