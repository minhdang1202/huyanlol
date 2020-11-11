import React from "react";
import { makeStyles, Container, Hidden, Box, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import MainLayout from "layouts/MainLayout";
import { AppConstant } from "const";
import { CustomBreadcrumb } from "components";
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

const ArticleDetail = () => {
  const classes = useStyles();
  const shareUrl = AppConstant.WEBSITE_URL;
  const appBarProps = { isDetail: true, shareUrl, appBarTitle: DEMO_TITLE, hasBookmark: true };
  //   const headProps = { title: book.title, description: book.description, ogImage: bookCover };

  return (
    <MainLayout className={classes.root} appBarProps={appBarProps}>
      <Container className={classes.container}>
        <Grid container item xs={12} md={8} className={classes.subContainer}>
          <Hidden xsDown>
            <CustomBreadcrumb articleName={DEMO_TITLE} />
          </Hidden>
          <ArticleTitle isReviewType={!DEMO_ARTICLE_TYPE} {...DEMO_AUTHOR} />
        </Grid>
        <Box position="relative" display="flex" maxWidth={{ xs: 624, sm: 1020 }}>
          <ArticleContent />
        </Box>
        <Grid container item xs={12} md={8} className={classes.subContainer}>
          <ArticleBookMentioned
            isReviewType={!DEMO_ARTICLE_TYPE}
            bookList={DEMO_BOOK_SLIDER_LIST}
            bookMentioned={DEMO_BOOK_SLIDER_LIST[0]}
          />
          <ArticleHashtagButtons
            className="mt-16"
            hashtags={DEMO_ARTICLE_RELATED_LIST[0].hashtags}
            category={DEMO_ARTICLE_RELATED_LIST[0].category}
          />
          <ArticleAuthor {...DEMO_AUTHOR} />
          <ArticleReacts reactCount={DEMO_REACT_COUNT} commentCount={DEMO_COMMENT_COUNT} />
        </Grid>
        <ArticleReactButtons shareUrl={shareUrl} />
        <Grid container item xs={12} md={8} className={classes.subContainer}>
          <ArticleComments commentList={DEMO_COMMENT_LIST} />
        </Grid>
        <ArticleRelated isReviewType={!DEMO_ARTICLE_TYPE} isArticleType={Boolean(DEMO_ARTICLE_TYPE)} />
      </Container>
    </MainLayout>
  );
};

export const PADDING_X_CONTAINER_MOBILE = "16px";
export const PADDING_X_CONTAINER_TABLET = "24px";

const DEMO_AUTHOR = {
  name: "Nguyễn Thanh Sơn",
  address: "12 Ngô Tất Tố, Hà Nội",
  date: "12 giờ trước",
  avatar: "/images/img-demo-avatar.jpg",
  category: "Tiêu điểm sách",
};
const DEMO_ARTICLE_TYPE = 1; // 0: categoryId= 0 == reviewType, 1: categoryId= 1 == articleType
const DEMO_TITLE = "Đánh giá cuốn sách Nếu chỉ còn một ngày để sống";
const DEMO_REACT_COUNT = 1234;
const DEMO_COMMENT_COUNT = 134;
const DEMO_BOOK_SLIDER_LIST = Array(4).fill({
  bookCover: "/images/img-demo-avatar.jpg",
  bookName: "Nếu chỉ còn một ngày để sống",
  author: "Hạ Vũ",
  rate: 4,
});

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

const DEMO_ARTICLE_RELATED_LIST = Array(4).fill({
  articleId: 1399,
  title: "Ai cũng cần có trong đời những tháng ngày lặng lẽ.",
  intro:
    "Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo...Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo...",
  name: "Lê Thu Hân",
  lastUpdate: new Date(),
  avatar: "/images/img-demo-avatar.jpg",
  thumbnail: "/images/img-demo-avatar.jpg",
  reactCount: 145,
  commentCount: 160,
  hashtags: ["#tieudiem1", "#tieudiem2", "#tieudiem3"],
  category: "Tiêu điểm sách",
  rate: 4,
  bookName: "Nếu chỉ còn một ngày để sống",
});

ArticleDetail.propTypes = {};

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
