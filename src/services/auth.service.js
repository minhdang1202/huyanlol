import { ApiConstant } from "../const";
import { createApi } from "../api";

const { POST_LOGIN, POST_LOGIN_BY_SOCIAL, POST_REGISTER } = ApiConstant;

export const login = data => createApi().post(POST_LOGIN, data);

export const loginSocial = data => createApi().post(POST_LOGIN_BY_SOCIAL, data);

export const register = data => createApi().post(POST_REGISTER, data);
