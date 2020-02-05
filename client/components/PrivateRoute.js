import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.authToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/register", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps)(PrivateRoute);
