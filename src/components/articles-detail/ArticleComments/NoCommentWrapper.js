import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";

const NoCommentWrapper = () => {
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  return (
    <Box py={{ xs: 10, sm: 6 }} className="center-root" flexDirection="column">
      <Box className="ic-comment-alt-dots" color="#ebf4f9" fontSize={100} />
      <Typography variant="body2" className="grey-text">
        {getLabel("TXT_ARTICLE_FIRST_COMMENT")}
      </Typography>
    </Box>
  );
};

export default NoCommentWrapper;
