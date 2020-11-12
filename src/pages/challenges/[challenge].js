import React from "react";
import MainLayout from "layouts/MainLayout";
import { makeStyles, Container, useTheme, useMediaQuery, Box, Grid } from "@material-ui/core";
import {
  ChallengeCover,
  InviteFriend,
  PositiveMember,
  Activity,
  ChallengeInfo,
  Goal,
  Company,
  GoalList,
  Description,
} from "components/challenges";
import CustomBreadCrumb from "components/CustomBreadcrumb";
const Challenge = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const appBarProps = { isDetail: true, className: classes.appBarMobile, appBarTitle: "Challenge name", shareUrl: "/" };

  //////////////////screen variant
  const isDone = false; //progress
  const isEnd = false; // due date
  const joined = true;
  const isGroup = true;
  //////////////////

  return (
    <MainLayout appBarProps={appBarProps}>
      <Container maxWidth="lg" className={classes.root}>
        {!isMobile && <CustomBreadCrumb challengeName="duongdz" className={classes.breadcrumb} />}

        <Grid container justify="center" spacing={0}>
          {!isMobile && (
            <Grid container alignItems="center" item xs={12} sm={4} md={3} direction="column">
              <Box className={classes.item}>
                <ChallengeCover isDone={isDone} isEnd={isEnd} joined={joined} />
              </Box>
              <Box className={classes.item}>
                <InviteFriend />
              </Box>
              <Box className={classes.item}>
                <Company />
              </Box>
            </Grid>
          )}

          {!isMobile && (
            <Grid container item xs={12} sm={7} direction="column" className={classes.rightContainer}>
              <Box className={classes.item}>
                <ChallengeInfo name="asdasdasda" count={6969} from="00/00/0000" to="00/00/0000" />
                <Goal goal="some goal" isGroup={isGroup} />
                {!isDone && <GoalList />}
              </Box>
              <Box className={classes.item}>
                <Description />
              </Box>
              <Box className={classes.item}>
                <PositiveMember />
              </Box>
              <Box className={classes.item}>
                <Activity />
              </Box>
            </Grid>
          )}
          {isMobile && (
            <Grid container alignItems="center" item xs={12} direction="column">
              <Box className={classes.item}>
                <ChallengeCover isDone={isDone} isEnd={isEnd} joined={joined} />
              </Box>
              <Box className={classes.item}>
                <ChallengeInfo name="asdasdasda" count={6969} from="00/00/0000" to="00/00/0000" />
                <Goal goal="some goal" isGroup={isGroup} />
                <GoalList />
              </Box>
              <Box className={classes.item}>
                <Description />
              </Box>
              <Box className={classes.item}>
                <Company />
              </Box>
              <Box className={classes.item}>
                <InviteFriend />
              </Box>
              <Box className={classes.item}>
                <PositiveMember />
              </Box>
              <Box className={classes.item}>
                <Activity />
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </MainLayout>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  breadcrumb: {
    margin: "24px 0px 0px 100px",
  },
  current: {
    color: theme.palette.text.primary,
  },
  item: {
    width: "100%",
    margin: "10px 0px 10px 0px",
    [theme.breakpoints.down("xs")]: {
      margin: "4px 0px 4px 0px",
    },
  },
  rightContainer: {
    padding: "0px 20px 0px 20px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },
  },
  appBarMobile: {
    color: theme.palette.text.primary,
    background: theme.palette.white,
    [theme.breakpoints.down("xs")]: {
      position: "static !important",
      boxShadow: "none !important",
    },
  },
}));
export default Challenge;
