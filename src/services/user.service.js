import { ApiConstant } from "const";
import { createApi, defaultConfigV1 } from "api";

export const getTopWriter = queryParams => createApi().get(ApiConstant.GET_USER_TOP_WRITER, queryParams);

export const getUserProfile = () => createApi().get(ApiConstant.GET_USER_PROFILE);

export const postFollowUser = () => createApi(defaultConfigV1).post(ApiConstant.POST_FOLLOW_USER);
