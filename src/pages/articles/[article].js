import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, Container, Hidden, Box, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import MainLayout from "layouts/MainLayout";
import { AppConstant, PathConstant } from "const";
import { CustomBreadcrumb } from "components";
import { useTranslation } from "react-i18next";
import {
  ArticleContent,
  ArticleTitle,
  ArticleRelated,
  ArticleHashtagButtons,
  ArticleAuthor,
  ArticleReacts,
  ArticleReactButtons,
  ArticleBookMentioned,
  ArticleComments,
} from "components/articles-detail";
import { getRedirectPath, getNumberIdFromQuery, getImageById } from "utils";
import { convertDistanceDate } from "utils/date";
import ArticleActions from "redux/article.redux";
import { ArticleService } from "services";

const ArticleDetail = ({ article }) => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const {
    articleId,
    intro,
    creator,
    editions,
    title,
    categories,
    lastUpdate,
    publishedDate,
    coverId,
    reactCount,
    commentCount,
    body,
    hashtags,
  } = article;
  const isReviewType = categories[0].categoryId === AppConstant.CATEGORY_REVIEW;
  const rate = isReviewType && editions[0].userRelation ? editions[0].userRelation.evaluation.rate : null;
  const bookMentioned = isReviewType ? editions[0] : null;
  const displayDate = convertDistanceDate(new Date(lastUpdate ? lastUpdate : publishedDate), new Date(), i18n.language);
  const shareUrl = AppConstant.WEBSITE_URL + getRedirectPath(PathConstant.FM_ARTICLE_DETAIL, articleId, title);
  const appBarProps = { isDetail: true, shareUrl, appBarTitle: title, hasBookmark: true };
  const headProps = { title: title, description: intro, ogImage: getImageById(coverId) };

  useEffect(() => {
    dispatch(ArticleActions.getArticle(article));
  }, []);

  return (
    <MainLayout className={classes.root} appBarProps={appBarProps} headProps={headProps}>
      <Container className={classes.container}>
        <Grid container item xs={12} md={8} className={classes.subContainer}>
          <Hidden xsDown>
            <CustomBreadcrumb articleName={title} />
          </Hidden>
          <ArticleTitle
            isReviewType={isReviewType}
            name={creator.name}
            avatar={creator.avatar}
            date={displayDate}
            address={creator.address}
            title={title}
            category={categories[0].title}
            rate={rate}
          />
        </Grid>
        <Box position="relative" display="flex" maxWidth={{ xs: 624, sm: 1020 }}>
          <ArticleContent name={creator.name} body={body} avatar={creator.avatar} date={displayDate} />
        </Box>
        <Grid container item xs={12} md={8} className={classes.subContainer}>
          {editions.length > 0 && (
            <ArticleBookMentioned isReviewType={isReviewType} bookList={editions} bookMentioned={bookMentioned} />
          )}
          <ArticleHashtagButtons className="mt-16" hashtags={hashtags} category={categories[0].title} />
          <ArticleAuthor name={creator.name} avatar={creator.avatar} date={displayDate} address={creator.address} />
          <ArticleReacts reactCount={reactCount} commentCount={commentCount} articleId={articleId} />
        </Grid>
        <ArticleReactButtons shareUrl={shareUrl} />
        <Grid container item xs={12} md={8} className={classes.subContainer}>
          <ArticleComments commentCount={commentCount} articleId={articleId} />
        </Grid>
        {(editions.length > 0 || !isReviewType) && (
          <ArticleRelated
            isReviewType={isReviewType}
            isArticleType={!isReviewType}
            categoryId={categories[0].categoryId}
            editionId={editions.length ? editions[0].editionId : null}
            articleId={articleId}
          />
        )}
      </Container>
    </MainLayout>
  );
};

ArticleDetail.propTypes = {
  article: PropTypes.object,
};

export const getServerSideProps = async ({ res, query, req }) => {
  let articleId = query && query.article ? query.article : null;
  const isOnlyNumber = /^\d+$/.test(articleId);
  articleId = isOnlyNumber ? articleId : getNumberIdFromQuery(articleId);
  const token = req.cookies[AppConstant.KEY_TOKEN];
  const articleDetailResponse = await ArticleService.getArticleDetail(articleId, token);
  let article = articleDetailResponse.data;

  if (article.data) {
    const articleData = article.data;
    let { title } = article;
    if (isOnlyNumber) {
      return {
        redirect: {
          permanent: true,
          destination: getRedirectPath(PathConstant.FM_ARTICLE_DETAIL, articleId, title),
        },
      };
    }

    return {
      props: {
        article: articleData,
      },
    };
  }
  res.status(404).end();
};

export const PADDING_X_CONTAINER_MOBILE = "16px";
export const PADDING_X_CONTAINER_TABLET = "24px";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.white,
  },
  container: {
    position: "relative",
    maxWidth: 1020,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 624,
    },
    marginTop: theme.spacing(3),
  },
  subContainer: {
    margin: "0 auto",
  },
}));

export default ArticleDetail;
