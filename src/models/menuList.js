import { getTags } from '../services/api';

export default {
  namespace: 'menuList',

  state: {
    data: [],
  },

  effects: {
    *fetchMenuList({ payload }, { call, put }) {
      const response = yield call(getTags, payload);
      console.log('result Data  successfully');
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload.result,
      };
    },
  },
};
