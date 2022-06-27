import React, { useEffect, useState } from "react";
import { LoginHeader, Footer, FormStatus, Input } from "@/presentation/components";
import { Validation } from "@/presentation/protocols/validation";
import FormContext from "@/presentation/contexts/form/form-context";
import styles from "./styles.scss";

type SignUpProps = {
  validation: Validation
};

const SignUp: React.FC<SignUpProps> = ({ validation }: SignUpProps) => {
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
        <form className={styles.form}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Digite sua senha" />
          <button data-testid="submit-button" disabled type="submit" className={styles.submitButton}>Criar</button>
          <span className={styles.loginLink}>Voltar para login</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;