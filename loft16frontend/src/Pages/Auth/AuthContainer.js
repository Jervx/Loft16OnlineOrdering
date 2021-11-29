import React from "react";
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

// PAGES
import Signin from "../Auth/Signin";
import Signup from "../Auth/Signup";
import NotFound from "../NotFound";

const AuthContainer = () => {
  return (
    <div>
        <Switch>
          <Route exact path="/auth/signin" component={Signin}/>
          <Route exact path="/auth/signup" component={Signup}/>
          <Route exact path="/auth" component={Signin}/>
          <Route exact path="*" component={NotFound}/>
        </Switch>
    </div>
  );
};

export default withRouter(AuthContainer);
