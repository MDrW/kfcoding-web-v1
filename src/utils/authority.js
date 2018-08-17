// use localStorage to store the authority info, which might be sent from server in actual project.
// export function getAuthority() {
//   return localStorage.getItem('antd-pro-authority') || 'admin';
// }

// export function setAuthority(authority) {
//   return localStorage.setItem('antd-pro-authority', authority);
// }
import { getLocalData, setLocalData } from './localData';

export function getAuthority() {
  return getLocalData('antd-pro-authority') || 'guest';
}

export function setAuthority(authority) {
  return setLocalData('antd-pro-authority', authority);
}
