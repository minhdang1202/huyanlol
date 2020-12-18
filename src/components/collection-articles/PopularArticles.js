import React, { useEffect, memo } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Section } from "components";
import { useSelector, useDispatch } from "react-redux";
import { uuid } from "utils";
import { ArticleSummary } from "components";
import ArticleAction from "redux/article.redux";
import PropTypes from "prop-types";

const PopularArticles = ({ categoryId }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_COLLECTION_ARTICLES);
  const dispatch = useDispatch();
  const articlePopularList = useSelector(state => state.articleRedux.articlePopularList);
  const displayList = articlePopularList ? articlePopularList : [];

  useEffect(() => {
    dispatch(
      ArticleAction.requestArticlePopularList({
        pageSize: 2,
        sorts: ["reactCount", "DESC"],
        categoryIds: [categoryId],
      }),
    );
  }, []);
  return (
    <Section title={getLabel("TXT_POPULAR_ARTICLE")} needMore={false}>
      <Box className={classes.root}>
        {displayList.map(article => (
          <ArticleSummary key={uuid()} data={article} isAction={false} isSummaryReact={false} />
        ))}
      </Box>
    </Section>
  );
};
PopularArticles.propTypes = {
  categoryId: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "&>*": {
      marginBottom: theme.spacing(0.5),
    },
  },
}));
export default memo(PopularArticles);
