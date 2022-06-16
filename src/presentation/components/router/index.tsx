import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

type RouterProps = {
  makeLogin: React.FC;
};

const Router: React.FC<RouterProps> = ({ makeLogin }: RouterProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
