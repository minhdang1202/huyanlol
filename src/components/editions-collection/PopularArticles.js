import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { Section, ArticleSummary } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant, PathConstant } from "const";
import { uuid } from "utils";
import { useDispatch, useSelector } from "react-redux";
import ArticleAction from "redux/article.redux";

const PopularArticles = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_COLLECTION_BOOKS);
  const dispatch = useDispatch();
  const listArticlesRedux = useSelector(({ articleRedux }) => articleRedux.articlePopularList);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (listArticlesRedux && listArticlesRedux != list) {
      setList(listArticlesRedux);
    }
  }, [listArticlesRedux]);

  useEffect(() => {
    dispatch(ArticleAction.requestArticlePopularList(DEFAULT_PARAMS));
  }, []);

  return (
    <Section title={getLabel("TXT_POPULAR_ARTICLE")} href={PathConstant.ARTICLES_COLLECTION}>
      <Box className={classes.root}>
        {list.map(article => (
          <Box key={uuid()} className={classes.item}>
            <ArticleSummary data={article} isAction={false} isSummaryReact={false} isSide={true} />
          </Box>
        ))}
      </Box>
    </Section>
  );
};

PopularArticles.propTypes = {
  data: PropTypes.array,
};
PopularArticles.defaultProps = {};

export default memo(PopularArticles);

const DEFAULT_PARAMS = {
  pageNum: 1,
  pageSize: 2,
  sorts: ["reactCount", "DESC"],
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    "& > $item:not(:last-child)": {
      marginBottom: 4,
    },
  },
  item: {},
}));
