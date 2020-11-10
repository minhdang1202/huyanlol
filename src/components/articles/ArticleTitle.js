import React from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";
import { CustomRating } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import PropTypes from "prop-types";

const ArticleTitle = () => {
  const classes = useStyles({ hasRating: !DEMO_ARTICLE_TYPE });
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  return (
    <>
      <Typography variant="h4" component="h1" className={classes.title}>
        {DEMO_TITLE}
      </Typography>
      {!DEMO_ARTICLE_TYPE ? (
        <Box display="flex" alignItems="center" mt={3} mb={3}>
          <Typography className="mr-16">{getLabel("TXT_ARTICLE_REVIEW_TITLE")}</Typography>
          <CustomRating readOnly={true} />
        </Box>
      ) : null}
    </>
  );
};

const DEMO_TITLE = "Đánh giá cuốn sách Nếu chỉ còn một ngày để sống";
const DEMO_ARTICLE_TYPE = 0; // 0: categoryId= 0, 1: categoryId= 1

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: props => (props.hasRating ? 0 : theme.spacing(4)),
  },
}));

export default ArticleTitle;
