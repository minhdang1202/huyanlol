import { ApiConstant, AppConstant } from "const";
import { createApi } from "api";

export const getListArticles = data => {
  let params = getQueryPrams(data);
  return createApi().get(ApiConstant.GET_ARTICLES, params);
};

const getQueryPrams = data => {
  let defaultData = data || {};
  const { categoryIds, sorts, ...otherParams } = defaultData;
  let queryParams = {
    pageNum: 1,
    pageSize: AppConstant.DATA_SIZES.articles,
    ...otherParams,
  };
  if (sorts) queryParams.sorts = sorts.join(",");
  if (categoryIds) queryParams.categoryIds = categoryIds.join(",");

  return queryParams;
};
