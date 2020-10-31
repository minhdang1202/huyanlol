import React, { useState } from "react";
import MainLayout from "layouts/MainLayout";
import { makeStyles, useMediaQuery, useTheme, Grid, Container, Divider, Box } from "@material-ui/core";
import {
  BookInfo,
  BookDescription,
  AppDownload,
  WriteReview,
  BookReviews,
  BookPriceCompare,
  BookLenders,
  CustomTabs,
} from "components/editions";
import { CustomBreadcrumb } from "components";

const BookDetail = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const appBarProps = { isDetail: true, className: classes.appBarMobile };
  const [selectedTab, setSelectedTab] = useState("info");
  const onChangeTab = tab => {
    setSelectedTab(tab);
  };
  return (
    <MainLayout appBarProps={appBarProps}>
      {isMobile ? (
        <Box>
          <BookInfo />
          <CustomTabs onChangeTab={onChangeTab} />
          {selectedTab === "info" ? (
            <>
              <BookDescription />
              <Divider />
              <WriteReview />
              <BookReviews />
            </>
          ) : (
            <BookPriceCompare />
          )}
        </Box>
      ) : (
        <Container className={classes.rootDesktop}>
          <CustomBreadcrumb book="Nếu chỉ còn một ngày để sống" />
          <Grid container>
            <Grid item sm={4}>
              <BookInfo />
              <AppDownload />
              <BookPriceCompare />
            </Grid>
            <Grid item sm={8}>
              <BookDescription />
              <BookLenders />
              <WriteReview />
              <BookReviews />
            </Grid>
          </Grid>
        </Container>
      )}
    </MainLayout>
  );
};

const useStyles = makeStyles(theme => ({
  rootDesktop: {
    maxWidth: 1020,
    paddingTop: theme.spacing(3),
    "&>*:first-child": {
      marginBottom: theme.spacing(2),
      "&+*": {
        "&>*:first-child": {
          "&>*:not(:last-child)": {
            marginBottom: theme.spacing(3),
          },
          paddingRight: theme.spacing(2.5),
        },
        "&>*:last-child": {
          "&>*:not(:last-child)": {
            marginBottom: theme.spacing(2),
          },
        },
      },
    },
  },
  appBarMobile: {
    [theme.breakpoints.down("xs")]: {
      position: "static !important",
      boxShadow: "none !important",
      background: "none !important",
      "& svg": {
        fill: `${theme.palette.white} !important`,
      },
    },
  },
}));

export default BookDetail;
