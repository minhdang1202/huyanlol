import { ApiConstant } from "const";
import { createGetImgApi } from "api";

export const getImageById = imageId => {
  const image = createGetImgApi()
    .get(ApiConstant.GET_IMAGE_BY_ID(imageId))
    .then(res => `data:image/png;base64,${Buffer.from(res.data, "binary").toString("base64")}`);
  return image;
};
