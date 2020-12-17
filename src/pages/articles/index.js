import React, { useState, useRef, useEffect } from "react";
import MainLayout from "layouts/MainLayout";
import { Box, makeStyles, useTheme, useMediaQuery, Typography, Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import { CustomBreadcrumb } from "components";
import { useDispatch, useSelector } from "react-redux";
import ArticleAction from "redux/article.redux";
import { ArticleSummary, CommonPagination } from "components";
import { uuid } from "utils";
import { PopularArticles, MostMentionedBooks } from "components/collection-articles";

const ArticlesCollectionPage = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_COLLECTION_ARTICLES);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const appBarProps = {
    isDetail: true,
    className: classes.appBar,
    appBarTitle: getLabel("TXT_LATEST_ARTICLE"),
  };
  const headRef = useRef();
  const { total, pageData } = useSelector(state => state.articleRedux.articleList);
  const pageSize = AppConstant.DATA_SIZES.collectionArticles;
  const articleList = pageData ? pageData : [];
  const totalPage = Math.floor(total / pageSize) + (total % pageSize === 0 ? 0 : 1);
  const [pageNum, setPageNum] = useState(1);

  const onChangePage = (event, value) => {
    setPageNum(value);
    headRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(ArticleAction.requestArticleList({ pageSize: pageSize, pageNum: pageNum }));
  }, [pageNum]);
  return (
    <MainLayout appBarProps={appBarProps}>
      <Container ref={headRef} className={classes.root}>
        {!isMobile && <CustomBreadcrumb className={classes.customBreadcrumb} />}
        {!isMobile && (
          <Typography variant="h4" component="h1" ref={headRef}>
            {getLabel("TXT_LATEST_ARTICLE")}
          </Typography>
        )}
        <Box className={classes.content}>
          <Box className={classes.leftContent}>
            {articleList.map(article => (
              <ArticleSummary key={uuid()} data={article} />
            ))}
            {!isMobile && <CommonPagination count={totalPage} onChange={onChangePage} />}
          </Box>
          {!isTablet && (
            <Box className={classes.rightContent}>
              <PopularArticles />
              <MostMentionedBooks />
            </Box>
          )}
        </Box>
      </Container>
    </MainLayout>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: 1020,
    padding: 0,
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      width: "100%",
    },
  },
  customBreadcrumb: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  content: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  leftContent: {
    width: 672,
    marginRight: theme.spacing(3),
    "&>*": {
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        margin: 2,
      },
    },
    [theme.breakpoints.down("md")]: {
      width: 696,
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
      margin: 0,
    },
  },
  rightContent: {
    width: 324,
    "&>:first-child": {
      marginBottom: theme.spacing(4),
      paddingBottom: 0,
    },
  },
}));
export default ArticlesCollectionPage;
