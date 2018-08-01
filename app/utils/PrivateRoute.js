import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectIsAuthenticated } from "../containers/Auth/selectors";

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state)
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);