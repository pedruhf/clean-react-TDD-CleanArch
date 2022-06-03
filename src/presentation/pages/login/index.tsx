import React, { useState } from "react";
import { LoginHeader, Footer, FormStatus, Input } from "@/presentation/components";
import { Validation } from "@/presentation/protocols/validation";
import FormContext from "@/presentation/contexts/form/form-context";
import styles from "./styles.scss";
import { useEffect } from "react";

type LoginProps = {
  validation: Validation
}

const Login: React.FC<LoginProps> = ({ validation }: LoginProps) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    mainError: "",
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
  });

  useEffect(() => {
    validation.validate({ email: state.email });
  }, [state.email]);

  return (
    <div className={styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite seu senha" />
          <button data-testid="submit-button" disabled type="submit" className={styles.submitButton}>Entrar</button>
          <span className={styles.createAccountLink}>Criar uma conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;