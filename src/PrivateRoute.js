import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({layout: Layout, component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
      
          <Layout>
            <Component {...props} />
          </Layout>
    
      }
    />
  );
};

export default PrivateRoute;