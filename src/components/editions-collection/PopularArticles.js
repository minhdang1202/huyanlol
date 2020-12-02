import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { Section, ArticleSummary } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { uuid } from "utils";
import { useDispatch, useSelector } from "react-redux";
import ArticleAction from "redux/article.redux";

const PopularArticles = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_COLLECTION_BOOKS);
  const dispatch = useDispatch();
  const listArticlesRedux = useSelector(({ articleRedux }) => articleRedux.homeArticles.pageData);

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
    <Section title={getLabel("TXT_POPULAR_ARTICLE")}>
      <Box className={classes.root}>
        {list.map(article => (
          <Box key={uuid()} className={classes.item}>
            <ArticleSummary data={article} isAction={false} isSummaryReact={false} />
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
