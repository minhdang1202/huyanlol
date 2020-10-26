import { ApiConstant, AppConstant } from "../const";
import apisauce from "apisauce";
import Cookie from "js-cookie";

export const API_CONFIG_REG = {
  baseURL: ApiConstant.BASE_API,
  headers: ApiConstant.HEADER_DEFAULT,
  timeout: ApiConstant.TIMEOUT,
};

export const createApiWithToken = (initConfig = API_CONFIG_REG, token) => {
  if (!token) token = Cookie.get(AppConstant.KEY_TOKEN);

  if (token) {
    initConfig.headers.Authorization = `Bearer ${token}`;
  }
  return apisauce.create(initConfig);
};

export const createApi = () => createApiWithToken(API_CONFIG_REG);
