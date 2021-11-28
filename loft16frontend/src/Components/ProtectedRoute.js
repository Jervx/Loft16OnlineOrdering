import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const _cur_user = useSelector((state) => state.user);

  //   if ( !_cur_user.hasUser ) {
  //     return <Redirect to="/auth/signin"></Redirect>;
  //   }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (_cur_user.hasUser) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/auth/signin" />;
        }
      }}
    />
  );
};

export default ProtectedRoute