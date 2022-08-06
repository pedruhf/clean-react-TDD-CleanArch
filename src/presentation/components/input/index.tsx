import React, { useContext, useRef } from "react";
import Context from "@/presentation/contexts/form/form-context";
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
    setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  };

  return (
    <div
      className={styles.inputWrap}
      data-status={error ? "invalid" : "valid"}
      data-testid={`${props.name}-wrap`}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
        data-testid={props.name}
      />
      <label
        onClick={() => { inputRef.current.focus() }}
        title={error}
        data-testid={`${props.name}-label`}
      >
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;