import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, Grid, Hidden } from "@material-ui/core";
import { useRouter } from "next/router";

import MainLayout from "layouts/MainLayout";
import { LangConstant, AppConstant, PathConstant } from "const";
import { TopHeader, TabBar, TermsAndPrivacy, MobileTabBar, FAQ } from "components/introductions";

const FaqPage = () => {
  const router = useRouter();
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);
  const appBarProps = {
    isDetail: true,
    className: classes.appBar,
    appBarTitle: getLabel("TXT_INTRODUCTION_HELP"),
  };
  const [selectedTab, setSelectedTab] = useState(AppConstant.INTRODUCTION_TABS_VALUE.faq);

  const TAB_LIST = [getLabel("TXT_FAQ"), getLabel("TXT_TERMS_AND_PRIVACY")];

  const onSelectTab = (event, selectedTabIndex) => {
    selectedTabIndex === AppConstant.INTRODUCTION_TABS_VALUE.termAndPrivacy
      ? router.push(PathConstant.TERM_AND_POLICY)
      : router.push(PathConstant.FAQ);
    setSelectedTab(selectedTabIndex);
  };

  return (
    <MainLayout appBarProps={appBarProps} classes={{ main: classes.main }} className={classes.backgroundColorWhite}>
      <TopHeader />
      <Grid container className={classes.root}>
        <Hidden xsDown>
          <Grid item sm={3} className={classes.paddingRight}>
            <TabBar selectedTab={selectedTab} onSelectTab={onSelectTab} tabList={TAB_LIST} />
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid item xs={12}>
            <MobileTabBar selectedTab={selectedTab} onSelectTab={onSelectTab} tabList={TAB_LIST} />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={9} className={classes.paddingLeft}>
          <TermsAndPrivacy selectedTab={selectedTab} />
          <FAQ selectedTab={selectedTab} />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default FaqPage;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1022,
    margin: "16px auto",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 3, 1),
    },
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      padding: 0,
      display: "block",
    },
  },
  paddingRight: {
    paddingRight: "12px",
  },
  paddingLeft: {
    paddingLeft: "12px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      height: "calc(100% - 49px)",
    },
  },
  main: {
    marginBottom: "0 !important",
    [theme.breakpoints.down("xs")]: {
      height: "inherit",
      overflowX: "hidden",
    },
  },
  backgroundColorWhite: {
    [theme.breakpoints.down("xs")]: {
      backgroundColor: theme.palette.white,
    },
  },
}));
