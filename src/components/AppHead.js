import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";
import { AppConstant } from "../const";
import { getAbsolutePath } from "utils";

const getTitle = title => {
  if (title) return `${AppConstant.APP_NAME} - ${title}`;
  else return AppConstant.APP_NAME;
};

const AppHead = props => {
  let primaryUrl = getAbsolutePath(props.url);
  let primaryImageUrl = props.ogImage;
  let primaryTitle = getTitle(props.title);

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{primaryTitle}</title>
      <meta name="description" content={props.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" sizes="192x192" href={ICON_PATH} />
      <link rel="apple-touch-icon" href={ICON_PATH} />
      <link rel="icon" href={ICON_PATH} />

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
  description: "A powerful, high-end and up-to-date Augmented Reality template for product visualization",
  url: "",
  ogImage: "/images/logo.png",
};

export default AppHead;

const ICON_PATH = "/images/favicon.ico";
