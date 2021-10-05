import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const withLayout = WrappedComponent => {
  return ({ component: Component, isPrivate, ...rest }) => {
    const curentUser = useSelector(state => state.authReducer.curentUser);

    const content = (
      <Route
        {...rest}
        render={routeProps => (
          <WrappedComponent>
            <Component {...routeProps} />
          </WrappedComponent>
        )}
      />
    );

    // Protect private routes
    if (isPrivate) {
      if (curentUser) {
        return content; 
      }
      return <Redirect to="/" />;
    }
    return content;
  };
};

export default withLayout;
