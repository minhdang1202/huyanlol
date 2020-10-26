import { ApiConstant } from "../const";
import { createApi } from "../api";

export const login = data => {
  return createApi().post(ApiConstant.POST_LOGIN, data);
};
