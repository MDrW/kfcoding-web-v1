import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { fakeRegister } from '../services/api';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      // Register successfully
      if (response.status === 200) {
        yield put(routerRedux.push('/'));
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      // setAuthority('user'); // 暂时没有写
      // reloadAuthorized();
      if (payload.status === 200) {
        notification.success({ message: '注册成功', description: '赶快登录吧！' });
      } else {
        notification.error({ message: '邮箱已被注册' });
      }
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
