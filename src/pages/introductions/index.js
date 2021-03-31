import React, { useState }  from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, Grid, Hidden } from "@material-ui/core";

import MainLayout from "layouts/MainLayout";
import { LangConstant, AppConstant } from "const";
import { TopHeader, TabBar, TermsAndPrivacy, MobileTabBar } from "components/introductions";

const IntroductionPage = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);
  const appBarProps = {
    isDetail: true,
    className: classes.appBar,
    appBarTitle: getLabel("TXT_INTRODUCTION_HELP"),
  };
  const [selectedTab, setSelectedTab] = useState(AppConstant.INTRODUCTION_TABS_VALUE.faq);

  const onSelectedTab = (event, selectedTabIndex) => {
    setSelectedTab(selectedTabIndex);
  };

  return (
    <MainLayout appBarProps={appBarProps}>
      <TopHeader />
      <Grid container className={classes.root}>
        <Hidden xsDown>
          <Grid item sm={3} className={classes.paddingRight}>
            <TabBar selectedTab={selectedTab} onSelectedTab={onSelectedTab} />
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid item xs={12}>
            <MobileTabBar selectedTab={selectedTab} onSelectedTab={onSelectedTab} />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={9} className={classes.paddingLeft}>
          <TermsAndPrivacy selectedTab={selectedTab} />
        </Grid>
      </Grid> 
    </MainLayout> 
  );
}

export default IntroductionPage;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1022,
    margin: "16px auto",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 3, 1),
    },
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      padding: 0,
    },
  },
  paddingRight: {
    paddingRight: "12px"
  },
  paddingLeft: {
    paddingLeft: "12px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0
    }
  }
}));

