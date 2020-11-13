import { ApiConstant } from "const";
import { createApi } from "api";

export const getTopWriter = queryParams => {
  return createApi().get(ApiConstant.GET_USER_TOP_WRITER, queryParams);
};
