import React, { useEffect } from "react";
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
import PropTypes from "prop-types";
import { getTitleNoMark, getNumberIdFromQuery, getImageById } from "utils";
import { useDispatch } from "react-redux";

import { ChallengeService } from "services";
import ChallengeAction from "redux/challenge.redux";
const Challenge = ({ data }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const appBarProps = { isDetail: true, className: classes.appBarMobile, appBarTitle: "Challenge name", shareUrl: "/" };
  const dispatch = useDispatch();
  //////////////////screen variant
  const isDone = false; //progress
  const isEnd = false; // due date
  const joined = false;
  const isGroup = false;
  //////////////////

  useEffect(() => {
    dispatch(ChallengeAction.setChallengeInfo(data));
  }, []);

  return (
    <MainLayout appBarProps={appBarProps}>
      <Container maxWidth="lg" className={classes.root}>
        {!isMobile && <CustomBreadCrumb challengeName="duongdz" className={classes.breadcrumb} />}

        <Grid container justify="center" spacing={0}>
          {!isMobile && (
            <Grid
              container
              alignItems="center"
              item
              xs={12}
              sm={4}
              direction="column"
              className={classes.leftContainer}
            >
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
                <ChallengeInfo />
                <Goal goal="some goal" isGroup={isGroup} haveDone={750} total={3000} />
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
            <Box className={classes.mobileContainer}>
              <Grid container alignItems="center" item xs={12} direction="column">
                <Box className={classes.item}>
                  <ChallengeCover isDone={isDone} isEnd={isEnd} joined={joined} />
                </Box>
                <Box className={classes.item}>
                  <ChallengeInfo />
                  <Goal goal="some goal" isGroup={isGroup} haveDone={750} total={3000} />
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
            </Box>
          )}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export async function getServerSideProps({ query }) {
  let challengeId = query && query.challenge ? query.challenge : null;
  const isOnlyNumber = /^\d+$/.test(challengeId);
  challengeId = isOnlyNumber ? challengeId : getNumberIdFromQuery(challengeId);
  const challengeInfo = await ChallengeService.getChallengeInfo(challengeId);
  let data = challengeInfo.data.data;
  const coverId = data.coverId ? getImageById(data.coverId) : null;
  data = { ...data, coverId };
  return { props: { data } };
}

Challenge.propTypes = {
  data: PropTypes.object,
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      margin: "4px 0px 4px 0px",
    },
  },
  leftContainer: {
    maxWidth: "330px",
    [theme.breakpoints.down("md")]: {
      minWidth: "255px",
    },
  },
  rightContainer: {
    marginLeft: theme.spacing(2),
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
  mobileContainer: {
    width: "100%",
    height: "100%",
    paddingBottom: "85px",
  },
}));
export default Challenge;
