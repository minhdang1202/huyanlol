import Cookie from "js-cookie";
import { AppConstant } from "../const";

export const getCookieData = () => {
  let appData = Cookie.get(AppConstant.KEY_STORED_APP);
  return appData && appData.length > 0 ? JSON.parse(appData) : {};
};

export const setCookieData = data => {
  let appData = getCookieData();
  let jsonData = { ...appData, ...data };
  Cookie.set(AppConstant.KEY_STORED_APP, JSON.stringify(jsonData), {
    expires: AppConstant.EXPIRES_TOKEN,
  });
};

const set = (key, value) => {
  let appData = getCookieData();
  appData[key] = value;
  Cookie.set(AppConstant.KEY_STORED_APP, appData);
};

const get = key => {
  let appData = getCookieData();
  return appData[key];
};

const remove = key => {
  let appData = getCookieData();
  delete appData[key];
};

const removeAllCookie = Cookies => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
};

const CookieUtil = { getCookieData, setCookieData, set, get, remove, removeAllCookie };

export default CookieUtil;
