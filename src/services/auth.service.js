import { ApiConstant } from "const";
import { createApi } from "api";
import { uuid } from "utils";
const DEFAULT_UID = uuid();

export const login = data => createApi().post(ApiConstant.POST_LOGIN, { ...data, uuid: DEFAULT_UID });

export const loginSocial = data => createApi().post(ApiConstant.POST_LOGIN_BY_SOCIAL, { ...data, uuid: DEFAULT_UID });

export const register = data => createApi().post(ApiConstant.POST_REGISTER, data);
