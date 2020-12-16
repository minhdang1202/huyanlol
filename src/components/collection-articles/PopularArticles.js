import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Section } from "components";
import { useSelector } from "react-redux";
import { uuid } from "utils";
import { ArticleSummary } from "components";

const PopularArticles = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_COLLECTION_ARTICLES);
  const articleList = useSelector(state => state.articleRedux.articleList.pageData);
  const displayList = articleList ? articleList.slice(0, 2) : [];
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
export default PopularArticles;
