import mockjs from 'mockjs';
import Mall from "./mock/Mall";
import { delay } from 'roadhog-api-doc';
const noProxy = process.env.NO_PROXY === 'true';

// 本地开发api代理
const proxy = {
  'GET /api/user/show': {
    nickname: '嗷嗷豆豆',
    user_id: '123456',
    email: '380067721@qq.com',
  },
  'GET /api/mall/banner': Mall.BannerList,
  'GET /api/mall/category': Mall.CategoryList,
  'GET /api/mall/snapup': Mall.SnapupList,
  'GET /api/mall/hot': Mall.HotList,
  'GET /api/mall/itemlist': Mall.ItemList,
  'GET /api/mall/activity': Mall.ActivityList,
  'GET /api/mall/itemrecommendlist': Mall.ItemRecommendList,
};

// 测试环境api代理
const devProxy = {
  '/api/(.*)': "http://api.smteat.com/m/"
}

export default noProxy ? devProxy : delay(proxy, 500);
