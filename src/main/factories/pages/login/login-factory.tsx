import React from "react";
import { Login } from "@/presentation/pages";
import { makeRemotheAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemotheAuthentication()}
      validation={makeLoginValidation()}
    />
  );
};
