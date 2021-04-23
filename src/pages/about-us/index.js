import React from "react";
import { makeStyles, Box } from "@material-ui/core";

import { TopBar, StoryAboutGat, JobOfGat, Banner, StagesGatWent } from "components/aboutUs";
import MainLayout from "layouts/MainLayout";

const IntroductionPage = () => {
  const classes = useStyles();
  const appBarProps = {
    isDetail: false,
  };

  return (
    <MainLayout appBarProps={appBarProps} className={classes.backgroundColorWhite}>
      {/* <TopBar /> */}
      <Banner />
      <Box container className={classes.gridRoot}>
        <StoryAboutGat />
      </Box>
      <JobOfGat />
      <StagesGatWent />
    </MainLayout>
  );
}

export default IntroductionPage;

const useStyles = makeStyles(theme => ({
  gridRoot: {
    maxWidth: 1022,
    margin: "16px auto",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      padding: theme.spacing(3, 2),
    },
  },
  backgroundColorWhite: {
    backgroundColor: theme.palette.white
  },
}));

