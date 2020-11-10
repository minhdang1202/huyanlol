import React from "react";
import StringFormat from "string-format";
import { makeStyles, Container, Hidden, Typography, Box, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import MainLayout from "layouts/MainLayout";
import { AppConstant } from "const";
import { CustomBreadcrumb } from "components";
import {
  ArticleContent,
  ArticleTitle,
  BookBox,
  ArticleRelated,
  ArticleHashtagButtons,
  ArticleAuthor,
  ArticleReacts,
} from "components/articles";
import { BookSlider } from "components/articles/ArticleSliders";

const ArticleDetail = () => {
  const classes = useStyles();
  const shareUrl = AppConstant.WEBSITE_URL;
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const appBarProps = { isDetail: true, shareUrl, appBarTitle: DEMO_TITLE };
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
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={3}
            mb={{ xs: 1, sm: 1.5 }}
          >
            <Typography variant="h6">{getLabel("TXT_ARTICLE_BOOK_MENTIONED")}</Typography>
            {DEMO_ARTICLE_TYPE ? (
              <Typography variant="body2" className="grey-text">
                {StringFormat(getLabel("FM_ARTICLE_BOOK"), 4)}
              </Typography>
            ) : null}
          </Box>
          {!DEMO_ARTICLE_TYPE ? (
            <BookBox {...DEMO_BOOK_SLIDER_LIST[0]} className="mb-16" />
          ) : (
            <BookSlider sliderList={DEMO_BOOK_SLIDER_LIST} className="mb-16" />
          )}
          <ArticleHashtagButtons
            className="mt-16"
            hashtags={DEMO_ARTICLE_RELATED_LIST[0].hashtags}
            category={DEMO_ARTICLE_RELATED_LIST[0].category}
          />
          <ArticleAuthor {...DEMO_AUTHOR} />
          <ArticleReacts reactCount={DEMO_REACT_COUNT} commentCount={DEMO_COMMENT_COUNT} />
        </Grid>
        <ArticleRelated isReviewType={!DEMO_ARTICLE_TYPE} isArticleType={Boolean(DEMO_ARTICLE_TYPE)} />
      </Container>
    </MainLayout>
  );
};

export const PADDING_X_CONTAINER_MOBILE = "16px";

const DEMO_AUTHOR = {
  name: "Nguyễn Thanh Sơn",
  address: "12 Ngô Tất Tố, Hà Nội",
  date: "12 giờ trước",
  avatar: "/images/img-demo-avatar.jpg",
  category: "Tiêu điểm sách",
};
const DEMO_ARTICLE_TYPE = 0; // 0: categoryId= 0 == reviewType, 1: categoryId= 1 == articleType
const DEMO_TITLE = "Đánh giá cuốn sách Nếu chỉ còn một ngày để sống";
const DEMO_REACT_COUNT = 1234;
const DEMO_COMMENT_COUNT = 134;
const DEMO_BOOK_SLIDER_LIST = Array(4).fill({
  bookCover: "/images/img-demo-avatar.jpg",
  bookName: "Nếu chỉ còn một ngày để sống",
  author: "Hạ Vũ",
  rate: 4,
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
