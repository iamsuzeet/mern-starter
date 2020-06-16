import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  currentUser,
  redirectLocation = '/',
  mainComponent: MainComponent = null,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser) {
          if (MainComponent) {
            return currentUser && <MainComponent {...props} />;
          }
          return (
            <Redirect
              to={{
                pathname: redirectLocation,
                state: { from: props.location },
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(ProtectedRoute);
