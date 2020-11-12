import React from "react";
import StringFormat from "string-format";
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
} from "components/articles";
import { getTitleNoMark, getNumberIdFromQuery, getImageById } from "utils";
import { convertDistanceDate } from "utils/date";
import { ArticleService } from "services";

const ArticleDetail = ({ article, author, editions }) => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const {
    articleId,
    title,
    intro,
    cover,
    categories,
    hashtags,
    body,
    lastUpdate,
    publishedDate,
    reactCount,
    commentCount,
  } = article;
  const isReviewType = categories[0].categoryId === 0;
  const rate = isReviewType && editions[0].userRelation ? editions[0].userRelation.evaluation.rate : null;
  const bookMentioned = isReviewType ? editions[0] : null;
  const displayDate = convertDistanceDate(new Date(lastUpdate ? lastUpdate : publishedDate), new Date(), i18n.language);
  const shareUrl = AppConstant.WEBSITE_URL + StringFormat(PathConstant.FM_ARTICLE_DETAIL_ID, articleId);
  const appBarProps = { isDetail: true, shareUrl, appBarTitle: title, hasBookmark: true };
  const headProps = { title: title, description: intro, ogImage: cover };

  return (
    <MainLayout className={classes.root} appBarProps={appBarProps} headProps={headProps}>
      <Container className={classes.container}>
        <Grid container item xs={12} md={8} className={classes.subContainer}>
          <Hidden xsDown>
            <CustomBreadcrumb articleName={title} />
          </Hidden>
          <ArticleTitle
            isReviewType={isReviewType}
            name={author.name}
            avatar={author.avatar}
            date={displayDate}
            address={author.address}
            title={title}
            category={categories[0].title}
            rate={rate}
          />
        </Grid>
        <Box position="relative" display="flex" maxWidth={{ xs: 624, sm: 1020 }}>
          <ArticleContent name={author.name} body={body} avatar={author.avatar} date={displayDate} />
        </Box>
        <Grid container item xs={12} md={8} className={classes.subContainer}>
          <ArticleBookMentioned isReviewType={isReviewType} bookList={editions} bookMentioned={bookMentioned} />
          <ArticleHashtagButtons className="mt-16" hashtags={hashtags} category={categories[0].title} />
          <ArticleAuthor name={author.name} avatar={author.avatar} date={displayDate} address={author.address} />
          <ArticleReacts reactCount={reactCount} commentCount={commentCount} articleId={articleId} />
        </Grid>
        <ArticleReactButtons shareUrl={shareUrl} />
        <Grid container item xs={12} md={8} className={classes.subContainer}>
          <ArticleComments commentList={DEMO_COMMENT_LIST} commentCount={commentCount} articleId={articleId} />
        </Grid>
        <ArticleRelated
          isReviewType={isReviewType}
          isArticleType={!isReviewType}
          categoryId={categories[0].categoryId}
          editionId={editions[0].editionId}
        />
      </Container>
    </MainLayout>
  );
};

ArticleDetail.propTypes = {
  article: PropTypes.object,
  author: PropTypes.object,
  editions: PropTypes.array,
};

export const getServerSideProps = async ({ res, query }) => {
  let articleId = query && query.article ? query.article : null;
  const isOnlyNumber = /^\d+$/.test(articleId);
  articleId = isOnlyNumber ? articleId : getNumberIdFromQuery(articleId);
  const articleDetailResponse = await ArticleService.getArticleDetail(articleId);
  let article = articleDetailResponse.data;

  if (article.data) {
    article = article.data;
    let { title, editions, creator, coverId } = article;
    const creatorImgId = creator.imageId;
    if (isOnlyNumber) {
      const articleTitleNoMark = getTitleNoMark(title);
      res.writeHead(301, {
        Location: StringFormat(PathConstant.FM_ARTICLE_DETAIL, articleTitleNoMark, articleId),
      });
      res.end();
    }
    const creatorAvatar = creatorImgId ? getImageById(creatorImgId) : null;
    creator.avatar = creatorAvatar;
    const articleCover = coverId ? getImageById(coverId) : null;
    article.cover = articleCover;
    editions = editions.map(edition => {
      const bookCoverId = edition.imageId;
      return {
        ...edition,
        bookCover: bookCoverId ? getImageById(bookCoverId) : null,
      };
    });

    return {
      props: {
        article: article,
        author: creator,
        editions: editions,
      },
    };
  }
  res.status(404).end();
};

export const PADDING_X_CONTAINER_MOBILE = "16px";
export const PADDING_X_CONTAINER_TABLET = "24px";

const DEMO_COMMENT_LIST = Array(4).fill({
  content:
    "Khi Người Ta Tư Duy consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit...",
  name: "Lê Thu Hân",
  avatar: "/images/img-demo-avatar.jpg",
  date: "12 giờ trước",
  reactCount: 40,
  commentCount: 20,
  hasMentioned: true,
  bookMentioned: {
    bookCover: "/images/img-demo-avatar.jpg",
    bookName: "Nếu chỉ còn một ngày để sống",
    author: "Hạ Vũ",
    rate: 4,
  },
  replyList: Array(3).fill({
    content:
      "Khi Người Ta Tư Duy consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit...",
    name: "Lê Thu Hân",
    avatar: "/images/img-demo-avatar.jpg",
    date: "12 giờ trước",
    reactCount: 40,
  }),
});

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
