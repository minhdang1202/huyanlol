import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Hidden, makeStyles } from "@material-ui/core";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppBar";
import AsideAuthorButton from "./AsideAuthorButton";

const ArticleContent = ({ body, name, avatar, date }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={2}>
        <Hidden mdDown>
          <Box position="sticky" alignSelf="flex-start" top={`calc(${HEIGHT_APP_BAR} + 112px)`} pr={2}>
            <AsideAuthorButton name={name} avatar={avatar} date={date} />
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
  name: PropTypes.string,
  avatar: PropTypes.string,
  date: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  body: {
    "& *": {
      fontSize: 18,
      lineHeight: 1.56,
      [theme.breakpoints.down("xs")]: {
        fontSize: 16,
        lineHeight: 1.38,
      },
    },
    "& img": {
      maxWidth: "100%",
    },
    "& p:first-child": {
      marginTop: 0,
    },
  },
}));

export default ArticleContent;
