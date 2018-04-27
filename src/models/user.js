import * as userService from '../services/user';

export default {
  namespace: 'user',
  state: {
    item: {},
    list: [],
  },
  effects: {
    *fetchUser(_, { call, put }) {
      const response = yield call(userService.fetchUser);
      yield put({
        type: 'setUser',
        payload: response,
      });
    },
  },
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        item: action.payload,
      };
    },
    setList() {

    },
  },
  subscriptions: {},
};
