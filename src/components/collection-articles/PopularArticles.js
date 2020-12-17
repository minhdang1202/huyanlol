import React, { useEffect, memo } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Section } from "components";
import { useSelector, useDispatch } from "react-redux";
import { uuid } from "utils";
import { ArticleSummary } from "components";
import ArticleAction from "redux/article.redux";

const PopularArticles = () => {
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
      }),
    );
  }, []);
  return (
    <Section title={getLabel("TXT_POPULAR_ARTICLE")}>
      <Box className={classes.root}>
        {displayList.map(article => (
          <ArticleSummary key={uuid()} data={article} isAction={false} isSummaryReact={false} />
        ))}
      </Box>
    </Section>
  );
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
