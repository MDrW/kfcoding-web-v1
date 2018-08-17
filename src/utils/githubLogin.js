import { openWindow } from './openWindow';
// import { setLocalData } from './localData';
import Settings from '../common/settings';

export function thirdPartyLogin() {
  openWindow(Settings.GITHUB, '登录', 600, 600);

  // TO DO

  // window.addEventListener('message', m => {
  //   setLocalData('token', m.data.token);
  //   currentUser().then(res => {
  //     console.log(res);
  //     setLocalData('uid', res.data.result.user.id);
  //     setLocalData('user', JSON.stringify(res.data.result.user));
  //     window.location.replace('/');
  //   });
  // });
}
