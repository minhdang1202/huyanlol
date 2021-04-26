import React from "react";
import { makeStyles, useTheme, useMediaQuery } from "@material-ui/core";

import {
  TopBar,
  StoryAboutGat,
  JobOfGat,
  Banner,
  StagesGatWent,
  AUFooter,
  AUCarousel,
  MobileTopBar,
} from "components/aboutUs";
import MainLayout from "layouts/MainLayout";

const IntroductionPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <MainLayout className={classes.backgroundColorWhite} classes={{ main: classes.main }}>
      {isMobile ? <MobileTopBar /> : <TopBar />}
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
