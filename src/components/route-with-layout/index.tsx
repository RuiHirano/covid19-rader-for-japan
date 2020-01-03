import React from 'react';
import { Route } from 'react-router-dom';

interface Props{
  path: string,
  exact?: boolean,
  component: any,
  layout: any,
}

const RouteWithLayout: React.FC<Props> = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
