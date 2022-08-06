import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { Authentication } from "@/domain/usecases";
import { LoginHeader, Footer, FormStatus, Input, SubmitButton } from "@/presentation/components";
import { Validation } from "@/presentation/protocols/validation";
import { FormContext, ApiContext} from "@/presentation/contexts";

import styles from "./styles.scss";

type LoginProps = {
  validation: Validation,
  authentication: Authentication,
};

const Login: React.FC<LoginProps> = ({ validation, authentication }: LoginProps) => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    mainError: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
  
      setState(prevState => ({ ...prevState, isLoading: true }));
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });

      setCurrentAccount(account)
      history.replace("/");
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        mainError: error.message
      }));
    }
  };

  useEffect(() => {
    const { email, password } = state;
    const formData = { email, password };
    const emailError = validation.validate("email", formData);
    const passwordError = validation.validate("password", formData);
    setState(prevState => ({
      ...prevState,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError,
    }));
  }, [state.email, state.password]);

  return (
    <div className={styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="login-form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton text="Entrar" />
          <Link
            to="/signup"
            data-testid="create-account-link"
            className={styles.createAccountLink}
          >
            Criar uma conta
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;