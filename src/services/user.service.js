import { ApiConstant } from "const";
import { createApi } from "api";

export const getTopWriter = queryParams => createApi().get(ApiConstant.GET_USER_TOP_WRITER, queryParams);

export const getUserProfile = () => createApi().get(ApiConstant.GET_USER_PROFILE);
