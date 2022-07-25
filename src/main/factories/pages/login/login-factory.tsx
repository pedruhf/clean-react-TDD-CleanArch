import React from "react";
import { Login } from "@/presentation/pages";
import { makeRemotheAuthentication } from "@/main/factories/usecases";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemotheAuthentication()}
      validation={makeLoginValidation()}
    />
  );
};
