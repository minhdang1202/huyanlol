import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { Section, ArticleSummary } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant, PathConstant, AppConstant } from "const";
import { uuid } from "utils";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ArticleAction from "redux/article.redux";
import StringFormat from "string-format";

const ListArticles = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);
  const dispatch = useDispatch();
  const listArticlesRedux = useSelector(({ articleRedux }) => articleRedux.homeArticles.pageData, shallowEqual);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (listArticlesRedux && listArticlesRedux != list) {
      setList(listArticlesRedux);
    }
  }, [listArticlesRedux]);

  useEffect(() => {
    dispatch(ArticleAction.requestHomeArticles(DEFAULT_PARAMS));
  }, []);

  return (
    <Section
      title={getLabel("TXT_LIST_ARTICLES")}
      href={StringFormat(PathConstant.FM_ARTICLES_BY_CATEGORY, AppConstant.ARTICLE_CATEGORY.article)}
    >
      <Box className={classes.root}>
        {list.map(article => (
          <Box key={uuid()} className={classes.item}>
            <ArticleSummary data={article} />
          </Box>
        ))}
      </Box>
    </Section>
  );
};

ListArticles.propTypes = {
  data: PropTypes.array,
};
ListArticles.defaultProps = {};

export default memo(ListArticles);

const DEFAULT_PARAMS = {
  pageNum: 1,
  pageSize: 2,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    "& > $item:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  item: {},
}));
