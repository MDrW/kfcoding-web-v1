import Cookies from 'universal-cookie';

const options = {path: '/', domain: '*kfcoding.com'};

export function setLocalData(name, value){
  const cookie = new Cookies();
  cookie.set(name, value, options);
}

export function getLocalData(name){
  const cookie = new Cookies();
  return cookie.get(name, options);
}

export function removeLocalData(name){
  const cookie = new Cookies();
  cookie.remove(name, options);
}
