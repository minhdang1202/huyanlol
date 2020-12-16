import React, { useState, useRef, useEffect } from "react";
import MainLayout from "layouts/MainLayout";
import { Box, Grid, makeStyles, useTheme, useMediaQuery, Typography, Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import { ListCategory, CustomBreadcrumb } from "components";
import { useDispatch, useSelector } from "react-redux";
import ArticleAction from "redux/article.redux";
import { ArticleSummary } from "components";
import { uuid } from "utils";

const ArticlesCollectionPage = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_COLLECTION_ARTICLES);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const appBarProps = {
    isDetail: true,
    className: classes.appBar,
    appBarTitle: getLabel("TXT_MOST_BORROWING_BOOK"),
  };
  const headRef = useRef();
  const { pageNo, total, pageData } = useSelector(state => state.articleRedux.articleList);
  const articleList = pageData ? pageData : [];
  useEffect(() => {
    dispatch(ArticleAction.requestArticleList());
  }, []);
  return (
    <MainLayout appBarProps={appBarProps}>
      <Container ref={headRef} className={classes.root}>
        <CustomBreadcrumb className={classes.customBreadcrumb} />
        <Typography variant="h4" component="h1" ref={headRef}>
          {getLabel("TXT_LATEST_ARTICLE")}
        </Typography>
        <Box className={classes.content}>
          <Box className={classes.leftContent}>
            {articleList.map(article => (
              <ArticleSummary key={uuid()} data={article} />
            ))}
          </Box>
          <Box className={classes.rightContent}>right</Box>
        </Box>
      </Container>
    </MainLayout>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: 1020,
    padding: 0,
  },
  customBreadcrumb: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
  },
  leftContent: {
    width: 672,
    "&>*": {
      marginBottom: theme.spacing(3),
    },
  },
  rightContent: {
    width: 324,
  },
}));
export default ArticlesCollectionPage;
