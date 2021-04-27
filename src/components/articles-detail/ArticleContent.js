import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Hidden, makeStyles } from "@material-ui/core";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppBar";
import AsideAuthorButton from "./AsideAuthorButton";

const ArticleContent = ({ body, creator, date }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={2}>
        <Hidden mdDown>
          <Box position="sticky" alignSelf="flex-start" top={`calc(${HEIGHT_APP_BAR} + 112px)`} pr={2}>
            <AsideAuthorButton creator={creator} date={date} />
          </Box>
        </Hidden>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box className={classes.body} dangerouslySetInnerHTML={{ __html: body }} fontSize={16} />
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
};

ArticleContent.propTypes = {
  body: PropTypes.string,
  creator: PropTypes.object,
  date: PropTypes.string,
};

const useStyles = makeStyles(() => ({
  body: {
    "& *": {
      fontSize: 16,
      lineHeight: 1.56,
    },
    "& img": {
      maxWidth: "100%",
      display: "block",
      margin: "0 auto",
    },
    "&>*:first-child": {
      marginTop: 0,
    },
  },
}));

export default ArticleContent;
