import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, Box, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { PathConstant } from "const";
import { useSelector } from "react-redux";
import StringFormat from "string-format";

const EditArticleButton = ({ className }) => {
  const { t: getLabel } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const articleId = useSelector(state => state.articleRedux.article.articleId);

  const router = useRouter();
  const onClickEdit = () => {
    router.push(StringFormat(PathConstant.ARTICLE_EDIT, articleId));
  };
  return (
    <Button
      size={isMobile ? "small" : "medium"}
      variant="contained"
      className={clsx(classes.root, "dark-blue-button", className)}
      startIcon={<Box className={clsx("ic-pen", "mb-8")} />}
      onClick={onClickEdit}
    >
      {getLabel("TXT_EDIT_ARTICLE")}
    </Button>
  );
};

EditArticleButton.propTypes = {
  className: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    height: 43,
    padding: theme.spacing(1.5, 2),
    minWidth: 132,
  },
}));

export default EditArticleButton;
