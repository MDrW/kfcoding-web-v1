import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { setLocalData, removeLocalData } from '../utils/localData';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 200) {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLogoutStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority); // login成功，暂时没有返回currentAuthority
      if (payload.status === 200) {
        setLocalData('token', payload.data); // 登录成功以后，保存token
      } else {
        notification.error({ message: '邮箱或密码错误' });
      }
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    changeLogoutStatus(state, { payload }) {
      setAuthority('guest'); // logout成功
      removeLocalData('token'); // 登录退出以后，删除token
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
