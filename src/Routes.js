import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import {  Minimal as MinimalLayout } from './layouts';
import PrivateRoute from './PrivateRoute';

import {
 
  SignIn as SignInView,
  PatchPage as PatchPageView,
  NotFound as NotFoundView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
       
        from="/"
        component={PatchPageView}
        exact
        to="/home"
      />

      <PrivateRoute 
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/signin"
      />
      <PrivateRoute
        component={PatchPageView}
        exact
        layout={MinimalLayout}
        path="/home"
      />
      <PrivateRoute

        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/NotFound"
      />
      <Redirect to="/NotFound" />
    </Switch>
  );
};

export default Routes;
