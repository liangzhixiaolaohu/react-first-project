import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { getRoute } from './common/router';

function RouterConfig({ history, app }) {
  const routes = getRoute(app);
  return (
    <Router history={history}>
      <Switch>
        {routes.map((item) => {
          return (<Route {...item} />);
        })}
      </Switch>
    </Router>
  );
}
export default RouterConfig;
