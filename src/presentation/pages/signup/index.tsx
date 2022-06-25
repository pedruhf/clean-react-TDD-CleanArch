import React, { useState } from "react";
import { LoginHeader, Footer, FormStatus, Input } from "@/presentation/components";
import FormContext from "@/presentation/contexts/form/form-context";
import styles from "./styles.scss";

const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: "Campo obrigatório",
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
    passwordConfirmationError: "Campo obrigatório",
    mainError: "",
  });

  return (
    <div className={styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state }}>
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