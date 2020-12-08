import React, { memo } from "react";
import { Box, Grid, makeStyles, useTheme } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant, PathConstant } from "const";
import { uuid } from "utils";
import QuickActionItem from "./QuickActionItem";
import { BookIcon, PersonIcon } from "icons";

const QuickAction = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);

  const data = [
    {
      title: getLabel("TXT_BOOKSTOP_GAT"),
      cover: "/images/img-bookstop-gat.jpg",
      icon: (
        <Box color="#4D5B41">
          <BookIcon />
        </Box>
      ),
    },
    {
      title: getLabel("TXT_PROFILE"),
      cover: "/images/img-complete-profile.jpg",
      icon: (
        <Box color={theme.palette.primary.main}>
          <PersonIcon />
        </Box>
      ),
    },
    {
      title: getLabel("TXT_CREATE_ARTICLE"),
      cover: "/images/img-create-article.png",
      path: PathConstant.ARTICLE_CREATE,
    },
  ];

  return (
    <Grid container className={classes.root} spacing={2}>
      {data.map(item => (
        <Grid item xs={6} key={uuid()}>
          <QuickActionItem {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

QuickAction.propTypes = {};
QuickAction.defaultProps = {};

export default memo(QuickAction);

const useStyles = makeStyles(theme => ({
  root: { marginBottom: theme.spacing(2) },
}));
