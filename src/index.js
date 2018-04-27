import '@babel/polyfill';
import 'url-polyfill';

import dva from 'dva';
import createHistory from 'history/createHashHistory';
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import './index.css';

// 1. Initialize
const app = dva({
  history: createHistory(),
});
// 2. Plugins
// app.use({});
app.use(createLoading());
// 3. Model moved to src/router.js
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
