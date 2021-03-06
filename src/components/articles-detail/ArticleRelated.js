import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Hidden } from "@material-ui/core";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { LangConstant } from "const";
import EditionActions from "redux/edition.redux";
import ArticleSlider from "./ArticleSliders/ArticleSlider";

const ArticleRelated = ({ isReviewType, isArticleType, categoryId, editionId, articleId }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const PARAMS = isReviewType
    ? {
        editionIds: editionId,
      }
    : {
        categoryIds: categoryId,
      };
  const dispatch = useDispatch();
  const articles = useSelector(state => state.editionRedux.reviewsList);
  const [articlesList, setArticlesList] = useState();

  useEffect(() => {
    dispatch(EditionActions.requestGetReviews(PARAMS));
  }, []);

  useEffect(() => {
    if (articles) {
      setArticlesList(articles.filter(article => article.articleId != articleId));
    }
  }, [articles]);

  return (
    <Hidden xsDown>
      <Typography variant="h5" className={clsx("mb-16", "mt-24")}>
        {getLabel("TXT_ARTICLE_RELATED")}
      </Typography>
      <ArticleSlider sliderList={articlesList} isReviewType={isReviewType} isArticleType={isArticleType} />
    </Hidden>
  );
};

ArticleRelated.propTypes = {
  isReviewType: PropTypes.bool,
  isArticleType: PropTypes.bool,
  categoryId: PropTypes.number,
  editionId: PropTypes.number,
  articleId: PropTypes.number,
};

export default ArticleRelated;
