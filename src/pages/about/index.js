import React from "react";
import { makeStyles } from "@material-ui/core";

import { StoryAboutGat, JobOfGat, Banner, StagesGatWent, AUFooter, AUCarousel } from "components/aboutUs";
import MainLayout from "layouts/MainLayout";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";

const IntroductionPage = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ABOUT_US);
  const appBarProps = {
    isDetail: true,
    className: classes.appBar,
    appBarTitle: getLabel("TXT_ABOUT_US"),
  };

  return (
    <MainLayout appBarProps={appBarProps} className={classes.backgroundColorWhite} classes={{ main: classes.main }}>
      <Banner />
      <StoryAboutGat />
      <JobOfGat />
      <StagesGatWent />
      <AUCarousel />
      <AUFooter />
    </MainLayout>
  );
};

export default IntroductionPage;

const useStyles = makeStyles(theme => ({
  backgroundColorWhite: {
    backgroundColor: theme.palette.white,
  },
  main: {
    overflowX: "hidden",
  },
}));
