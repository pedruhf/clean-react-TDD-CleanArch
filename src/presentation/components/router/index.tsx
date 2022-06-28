import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SignUp } from "@/presentation/pages";

type Factories = {
  makeLogin: React.FC;
  makeSignUp: React.FC;
};

const Router: React.FC<Factories> = (factories: Factories) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={factories.makeLogin} />
        <Route path="/signup" exact component={factories.makeSignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
