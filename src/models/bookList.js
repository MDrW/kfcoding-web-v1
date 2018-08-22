import { getBookList, getDefultBookList } from '../services/api';

export default {
  namespace: 'bookList',

  state: {
    data: [],
    total: 0,
  },

  effects: {
    *fetchBooklist({ payload }, { call, put }) {
      const response = yield call(getDefultBookList, payload);
      if (response.status === 200) {
        console.log('result Data  successfully');
        console.log(response);
        yield put({
          type: 'saveBookList',
          payload: response,
        });
      } else {
        console.log('connection error');
      }
    },
    *fetchUpdateBooklist({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getBookList, payload);
      if (response.status === 200) {
        console.log('result Data  successfully');
        console.log(response);
        yield put({
          type: 'saveBookList',
          payload: response,
        });
      } else {
        console.log('connection error');
      }
    },
  },
  reducers: {
    saveBookList(state, action) {
      return {
        ...state,
        data: action.payload.data.records,
        total: action.payload.data.total,
      };
    },
  },
};
