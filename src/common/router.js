import dynamic from 'dva/dynamic';
// 动态包装器 copy by antd-pro
const dynamicWrapper = (app, models, component) => {
  models.forEach((model) => {
    if (modelNotExisted(app, model)) {
      // eslint-disable-next-line
      app.model(require(`../models/${model}`).default);
    }
  });
  return dynamic({
    app,
    component: () => component,
  });
};
// 判断model是否已经注册
const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);
export const getRoute = (app) => {
  const routeConfig = {
    '/': {
      component: dynamicWrapper(app, ['user'], import('../routes/IndexPage')),
    },
    '/user': {
      component: dynamicWrapper(app, ['user'], import('../routes/User/Show')),
    },
    '/list/:id': {
      component: dynamicWrapper(app, ['user'], import('../components/list/List')),
    },
    '/:id': {
      component: dynamicWrapper(app, ['user'], import('../components/list/BannerList')),
    },
    '/show/:id': {
      component: dynamicWrapper(app, ['user'], import('../components/details/Details')),
    },
    '/banner': {
      component: dynamicWrapper(app, ['user'], import('../common/banner/banner')),
    },
  };
  const routeData = [];
  Object.keys(routeConfig).forEach((routePath) => {
    routeData.push({
      component: routeConfig[routePath].component,
      path: routePath,
      key: routePath,
      exact: true,
    });
  });
  return routeData;
};
export default getRoute;
