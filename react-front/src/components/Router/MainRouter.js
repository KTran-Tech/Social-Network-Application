import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Signup/Signup"
import Signin from "../Pages/Signin/Signin"

const MainRouter = () => (
  <section>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
    </Switch>
  </section>
);

export default MainRouter