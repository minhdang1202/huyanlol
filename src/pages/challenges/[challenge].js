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
  Creator,
} from "components/challenges";
import CustomBreadCrumb from "components/CustomBreadcrumb";
import PropTypes from "prop-types";
import { getTitleNoMark, getNumberIdFromQuery } from "utils";
import { pastDueDate } from "utils/date";
import { useDispatch, useSelector } from "react-redux";
import { ChallengeService } from "services";
import ChallengeAction from "redux/challenge.redux";
import StringFormat from "string-format";
import { AppConstant, PathConstant } from "const";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppBar";
import { CHALLENGE_TARGET_TYPE } from "const/app.const";
const Challenge = ({ data }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const { WEBSITE_URL, CHALLENGE_PROGRESS_STATUS, CHALLENGE_MODE } = AppConstant;
  const { title, challengeProgress, challengeModeId, endDate, challengeId, targetTypeId } = data;
  const leaderBoard = useSelector(state => state.challengeRedux.detailLeaderBoard);
  const activity = useSelector(state => state.challengeRedux.detailActivity);
  const SHARE_URL = WEBSITE_URL + StringFormat(PathConstant.FM_CHALLENGE_DETAIL_ID, challengeId);
  const appBarProps = { isDetail: true, className: classes.appBarMobile, appBarTitle: title, shareUrl: SHARE_URL };

  //////////////////screen variant
  let isDone = challengeProgress && challengeProgress.completeStatus === CHALLENGE_PROGRESS_STATUS.complete; //progress
  let isEnd = pastDueDate(endDate); // due date
  let joined = Boolean(challengeProgress);
  let isGroup = !(challengeModeId === CHALLENGE_MODE.personal);
  //////////////////
  useEffect(() => {
    const load = () => {
      dispatch(ChallengeAction.setChallengeDetail(data));
      dispatch(ChallengeAction.requestGetChallengeActivity(challengeId));
      dispatch(ChallengeAction.requestGetChallengeLeaderBoard(challengeId));
      dispatch(ChallengeAction.requestGetChallengeFriendLeaderBoard(challengeId));
    };
    load();
  }, []);

  return (
    <MainLayout appBarProps={appBarProps}>
      <Container maxWidth="lg" className={classes.root}>
        {!isMobile && <CustomBreadCrumb challengeName={title} className={classes.breadcrumb} />}

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
                <Goal isGroup={isGroup} />
                {(targetTypeId === CHALLENGE_TARGET_TYPE.readBookList ||
                  targetTypeId === CHALLENGE_TARGET_TYPE.writeArticleList) && <GoalList />}
              </Box>
              <Box className={classes.item}>
                <Description />
              </Box>
              {leaderBoard && leaderBoard.length > 0 && (
                <Box className={classes.item}>
                  <PositiveMember />
                </Box>
              )}

              {activity && activity.length > 0 && (
                <Box className={classes.item}>
                  <Activity />
                </Box>
              )}
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
                  <Goal isGroup={isGroup} />
                  {(targetTypeId === CHALLENGE_TARGET_TYPE.readBookList ||
                    targetTypeId === CHALLENGE_TARGET_TYPE.writeArticleList) && <GoalList />}
                </Box>
                <Box className={classes.item}>
                  <Description />
                </Box>
                <Box className={classes.item}>
                  <Creator />
                </Box>
                <Box className={classes.item}>
                  <InviteFriend />
                </Box>
                {leaderBoard && leaderBoard.length > 0 && (
                  <Box className={classes.item}>
                    <PositiveMember />
                  </Box>
                )}

                {activity && activity.length > 0 && (
                  <Box className={classes.item}>
                    <Activity />
                  </Box>
                )}
              </Grid>
            </Box>
          )}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export async function getServerSideProps({ res, query }) {
  let challengeId = query && query.challenge ? query.challenge : null;
  const isOnlyNumber = /^\d+$/.test(challengeId);
  challengeId = isOnlyNumber ? challengeId : getNumberIdFromQuery(challengeId);
  const challengeInfo = await ChallengeService.getChallengeInfo(challengeId);
  if (challengeInfo.data.data) {
    const data = {
      ...challengeInfo.data.data,
    };

    if (isOnlyNumber) {
      const challengeTitleNoMark = getTitleNoMark(data.title);
      res
        .writeHead(301, {
          Location: StringFormat(PathConstant.FM_CHALLENGE_DETAIL, challengeTitleNoMark, challengeId),
        })
        .end();
    }
    return { props: { data } };
  }
  return res.status(404).end();
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
      marginTop: `-${HEIGHT_APP_BAR} !important`,
    },
  },
  mobileContainer: {
    width: "100%",
    height: "100%",
    paddingBottom: "85px",
  },
}));
export default Challenge;
