import React, { useState, useRef, useEffect } from "react";
import MainLayout from "layouts/MainLayout";
import { Box, makeStyles, useTheme, useMediaQuery, Typography, Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import { CustomBreadcrumb, Processing } from "components";
import { useDispatch, useSelector } from "react-redux";
import ArticleAction from "redux/article.redux";
import { ArticleSummary, CommonPagination, ReviewSummary } from "components";
import { PopularArticles, MostMentionedBooks } from "components/collection-articles";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const ArticlesCollectionPage = ({ categoryId }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_COLLECTION_ARTICLES);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const appBarProps = {
    isDetail: true,
    className: classes.appBar,
    appBarTitle: getLabel("TXT_LATEST_ARTICLE"),
  };
  const isReview = Boolean(categoryId === "0");
  const headRef = useRef();
  const { total, pageData } = useSelector(state => state.articleRedux.articleList);
  const isFetching = useSelector(state => state.articleRedux.isFetching);
  const pageSize = AppConstant.DATA_SIZES.collectionArticles;
  const [articleList, setArticleList] = useState();
  const totalPage = Math.ceil(total / pageSize);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    dispatch(
      ArticleAction.requestArticleList({
        pageSize: isTablet ? 20 : pageSize,
        pageNum: pageNum,
        categoryIds: categoryId ? [categoryId] : null,
      }),
    );
  }, [pageNum]);
  useEffect(() => {
    if (isTablet && articleList) {
      setArticleList([...articleList, ...pageData]);
    } else {
      setArticleList(pageData);
    }
  }, [pageData]);

  const onChangePage = (event, value) => {
    setPageNum(value);
    headRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const onLoadMore = () => {
    setPageNum(pageNum => pageNum + 1);
  };

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
          {articleList && articleList.length > 0 && (
            <Box className={classes.leftContent}>
              {isTablet ? (
                <InfiniteScroll
                  dataLength={articleList.length}
                  next={onLoadMore}
                  hasMore={Boolean(pageNum < totalPage)}
                  height={1000}
                >
                  {!isReview
                    ? articleList.map(article => <ArticleSummary key={article.articleId} data={article} />)
                    : articleList.map(article => <ReviewSummary key={article.articleId} data={article} />)}
                </InfiniteScroll>
              ) : (
                <Box>
                  {!isReview
                    ? articleList.map(article => <ArticleSummary key={article.articleId} data={article} />)
                    : articleList.map(article => <ReviewSummary key={article.articleId} data={article} />)}
                  <CommonPagination count={totalPage} onChange={onChangePage} />
                </Box>
              )}
            </Box>
          )}

          {!isTablet && (
            <Box className={classes.rightContent}>
              <PopularArticles categoryId={categoryId} />
              <MostMentionedBooks />
            </Box>
          )}
        </Box>
      </Container>
      <Processing isShow={isFetching} />
    </MainLayout>
  );
};

ArticlesCollectionPage.propTypes = {
  categoryId: PropTypes.string,
};

export async function getServerSideProps({ query }) {
  const tempId = query.category ? query.category.charAt(query.category.indexOf("-") + 1) : null;
  return { props: { categoryId: tempId } };
}

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
    height: "100%",
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
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
      margin: 0,
    },
    [theme.breakpoints.down("md")]: {
      "&>*": {
        marginBottom: 0,
      },
    },
  },
  rightContent: {
    width: 324,
    [theme.breakpoints.down("md")]: {
      maxWidth: 280,
    },
    "&>:first-child": {
      marginBottom: theme.spacing(4),
      paddingBottom: 0,
    },
  },
  scroll: {
    width: 696,
    height: 1284,
  },
}));
export default ArticlesCollectionPage;
