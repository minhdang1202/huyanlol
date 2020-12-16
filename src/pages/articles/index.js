import React, { useState, useRef, useEffect } from "react";
import MainLayout from "layouts/MainLayout";
import { Box, Grid, makeStyles, useTheme, useMediaQuery, Typography, Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import { ListCategory, CustomBreadcrumb } from "components";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const ArticlesCollectionPage = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_COLLECTION_ARTICLES);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const appBarProps = {
    isDetail: true,
    className: classes.appBar,
    appBarTitle: getLabel("TXT_MOST_BORROWING_BOOK"),
  };
  const headRef = useRef();
  return (
    <MainLayout appBarProps={appBarProps}>
      <Container ref={headRef} className={classes.root}>
        <CustomBreadcrumb className={classes.customBreadcrumb} />
        <Typography variant="h4" component="h1" ref={headRef}>
          {getLabel("TXT_LATEST_ARTICLE")}
        </Typography>
        <Box className={classes.content}>
          <Box className={classes.leftContent}>left</Box>
          <Box className={classes.rightContent}>right</Box>
        </Box>
      </Container>
    </MainLayout>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: 1020,
    padding: 0,
  },
  customBreadcrumb: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
  },
  leftContent: {
    width: 672,
    background: "tomato",
  },
  rightContent: {
    width: 324,
    background: "tomato",
  },
}));
export default ArticlesCollectionPage;
