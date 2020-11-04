import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
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
import { InfoIcon, CartIcon } from "icons";
import { CustomBreadcrumb } from "components";

const BookDetail = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const appBarProps = { isDetail: true, className: classes.appBarMobile };
  const SELECT_TABS = [
    {
      icon: <InfoIcon />,
      label: getLabel("TXT_BOOKDETAIL_BOOK_INFO"),
      value: "info",
    },
    {
      icon: <CartIcon />,
      label: getLabel("TXT_BOOKDETAIL_BUY_BOOK"),
      value: "cart",
    },
  ];

  const [selectedTab, setSelectedTab] = useState(SELECT_TABS[0].value);
  const onChangeTab = tab => {
    setSelectedTab(tab);
  };
  return (
    <MainLayout appBarProps={appBarProps}>
      {isMobile ? (
        <Box>
          <BookInfo />
          <CustomTabs onChangeTab={onChangeTab} tabs={SELECT_TABS} />
          {selectedTab === SELECT_TABS[0].value ? (
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
          <CustomBreadcrumb bookName="Nếu chỉ còn một ngày để sống" />
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
