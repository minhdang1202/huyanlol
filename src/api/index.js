import { ApiConstant, AppConstant } from "../const";
import apisauce from "apisauce";
import Cookie from "js-cookie";

export const defaultConfigV2 = {
  baseURL: ApiConstant.BASE_API,
  headers: ApiConstant.HEADER_DEFAULT,
  timeout: ApiConstant.TIMEOUT,
};

export const defaultConfigV1 = {
  baseURL: ApiConstant.BASE_API_V1,
  headers: ApiConstant.HEADER_DEFAULT,
  timeout: ApiConstant.TIMEOUT,
};

export const createApiWithToken = (initConfig = defaultConfigV2, token) => {
  if (!token) token = Cookie.get(AppConstant.KEY_TOKEN);

  if (token) {
    if (ApiConstant.BASE_URL === initConfig.baseURL) {
      initConfig.headers.Authorization = `Bearer ${token}`;
    } else {
      initConfig.headers.Authorization = token;
    }
  }
  return apisauce.create(initConfig);
};

export const createApi = (initConfig = defaultConfigV2, token) => createApiWithToken(initConfig, token);
