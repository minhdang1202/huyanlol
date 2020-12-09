import { ApiConstant } from "const";
import { createApi } from "api";

export const getTopWriter = queryParams => createApi().get(ApiConstant.GET_USER_TOP_WRITER, queryParams);

export const getUserProfile = () => createApi().get(ApiConstant.GET_USER_PROFILE);

export const postImage = imageBase64 => createApi().post(ApiConstant.POST_USER_IMAGES, { imageBase64: imageBase64 });

export const getUserSuggestion = params => {
  return createApi().get(ApiConstant.GET_USER_SUGGESTION, params);
};
