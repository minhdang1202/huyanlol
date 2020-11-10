import React from "react";
import { Typography, Hidden } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { LangConstant } from "const";
import ArticleSlider from "./ArticleSliders/ArticleSlider";

const ArticleRelated = ({ isReviewType, isArticleType }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  return (
    <Hidden mdDown>
      <Typography variant="h5" className="mb-24">
        {getLabel("TXT_ARTICLE_RELATED")}
      </Typography>
      <ArticleSlider sliderList={DEMO_ARTICLE_RELATED_LIST} isReviewType={isReviewType} isArticleType={isArticleType} />
    </Hidden>
  );
};

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
  rate: 4,
});

ArticleRelated.propTypes = {
  isReviewType: PropTypes.bool,
  isArticleType: PropTypes.bool,
};

export default ArticleRelated;
