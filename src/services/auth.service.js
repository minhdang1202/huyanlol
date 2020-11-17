import { ApiConstant } from "../const";
import { createApi } from "../api";

export const login = data => createApi().post(ApiConstant.POST_LOGIN, data);

export const loginSocial = data => createApi().post(ApiConstant.POST_LOGIN_BY_SOCIAL, data);

export const register = data => createApi().post(ApiConstant.POST_REGISTER, data);
