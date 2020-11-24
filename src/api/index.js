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
  // if (!token) token = Cookie.get(AppConstant.KEY_TOKEN);
  token =
    "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoyOTk0NiwidXNlcklkIjo5NjUxMTMsInV1aWQiOiI5NjI3NjhiOC0wZDE1LTQxYTYtYWU2MS0xYmYyNjZhZmQ3YjgifQ.b4-bXoAK0vsKqNG7XbeGoa8-91R2FIamiK725YV4Fqo";

  if (token) {
    if (ApiConstant.BASE_API === initConfig.baseURL) {
      initConfig.headers.Authorization = `Bearer ${token}`;
    } else {
      initConfig.headers.Authorization = token;
    }
  }
  return apisauce.create(initConfig);
};

export const createApi = (initConfig = defaultConfigV2, token) => createApiWithToken(initConfig, token);
