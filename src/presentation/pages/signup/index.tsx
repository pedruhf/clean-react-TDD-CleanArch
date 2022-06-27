import React, { useEffect, useState } from "react";
import { LoginHeader, Footer, FormStatus, Input } from "@/presentation/components";
import { Validation } from "@/presentation/protocols/validation";
import FormContext from "@/presentation/contexts/form/form-context";
import styles from "./styles.scss";
import { AddAccount } from "@/domain/usecases";

type SignUpProps = {
  validation: Validation;
  addAccount: AddAccount;
};

const SignUp: React.FC<SignUpProps> = ({ validation, addAccount }: SignUpProps) => {
  const [state, setState] = useState({
    isLoading: false,
    name: "",
    nameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    passwordConfirmation: "",
    passwordConfirmationError: "",
    mainError: "",
  });

  const formIsValid = (): boolean => {
    return !state.nameError
      && !state.emailError
      && !state.passwordError
      && !state.passwordConfirmationError;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (state.isLoading) {
      return;
    }
    setState({
      ...state,
      isLoading: true,
    });
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation,
    });
  };

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate("name", state.name),
      emailError: validation.validate("name", state.email),
      passwordError: validation.validate("name", state.password),
      passwordConfirmationError: validation.validate("name", state.passwordConfirmation),
    });
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  return (
    <div className={styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="signup-form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Digite sua senha" />
          <button data-testid="submit-button" disabled={!formIsValid()} type="submit" className={styles.submitButton}>Criar</button>
          <span className={styles.loginLink}>Voltar para login</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;