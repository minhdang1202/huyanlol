import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";
import { AppConstant } from "const";
import { getAbsolutePath } from "utils";

const getTitle = title => {
  return title || AppConstant.APP_NAME;
};

const AppHead = props => {
  let primaryUrl = getAbsolutePath(props.url);
  let primaryImageUrl = props.ogImage;
  let primaryTitle = getTitle(props.title);

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{primaryTitle}</title>
      <link rel="icon" sizes="192x192" href={ICON_PATH} />
      <link rel="apple-touch-icon" href={ICON_PATH} />
      <link rel="icon" href={ICON_PATH} />

      <meta name="description" content={props.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="fb:app_id" content={AppConstant.APP_FACEBOOK} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={primaryUrl} />
      <meta property="og:title" content={primaryTitle} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={primaryImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </NextHead>
  );
};

AppHead.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

AppHead.defaultProps = {
  title: "GAT - Mạng xã hội về sách",
  description:
    "GAT, từ Ứng dụng cho mượn sách giấy miễn phí, nay đã trở thành Mạng xã hội cho người mê sách. Chúng tôi là nơi sách dừng chân, là ngôi nhà cho những câu chuyện của bạn, và là nơi “mọt” sách gặp nhau. Nếu bạn là một người thích đọc, thích viết, thích sách, hãy đến với GAT. GAT, tại sao không?",
  url: "",
  ogImage: getAbsolutePath("/images/img-gat-cover.jpg"),
};

export default AppHead;

const ICON_PATH = getAbsolutePath("/images/favicon.ico");
