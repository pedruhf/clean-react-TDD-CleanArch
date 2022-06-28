import React, { useContext } from "react";
import Context from "@/presentation/contexts/form/form-context";

type SubmitButtonProps = {
  text: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }: SubmitButtonProps) => {
  const { state } = useContext(Context);

  return (
    <button data-testid="submit-button" disabled={state.isFormInvalid} type="submit">{text}</button>
  );
};

export default SubmitButton;