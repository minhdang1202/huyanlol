import React, { useState } from "react";
import MainLayout from "layouts/MainLayout";
import { Box, Grid, Hidden, makeStyles, Container, useTheme, useMediaQuery } from "@material-ui/core";
import {
  HomeAppDownload,
  QuickAction,
  MostBorrowing,
  ListArticles,
  ListReviews,
  TopWriter,
  MobileTabBar,
} from "components/home";
import { ListCategory } from "components";

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [screenValue, setScreenValue] = useState(0);
  const onChangeScreen = (event, newValue) => {
    setScreenValue(newValue);
  };
  return (
    <MainLayout classes={{ main: classes.mainLayout }}>
      <Container>
        <Grid container className={classes.root}>
          <Hidden smDown>
            <Grid item xs="auto" sm={8} md={2} className={classes.leftContainer}>
              <Box className={classes.fixedPosition}>
                <HomeAppDownload />
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={7} md={6} className={classes.mainContainer}>
            <MostBorrowing />
            <ListReviews />
            <ListArticles />
            <TopWriter />
          </Grid>
          <Grid item xs={12} sm={5} md={4} className={classes.rightContainer}>
            <Box className={classes.fixedPosition}>
              <QuickAction />
              <Hidden xsDown>
                <ListCategory />
              </Hidden>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {isMobile && <MobileTabBar screenValue={screenValue} onChangeScreen={onChangeScreen} />}
    </MainLayout>
  );
};

export default Home;

const useStyles = makeStyles(theme => ({
  mainLayout: {
    paddingTop: theme.spacing(3),
  },
  root: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  leftContainer: {
    position: "relative",
    paddingRight: 12,
  },
  mainContainer: { paddingRight: 12, paddingLeft: 12 },
  rightContainer: { paddingLeft: 12 },
  fixedPosition: {
    width: "100%",
    position: "sticky",
    top: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      top: 0,
    },
  },
}));
