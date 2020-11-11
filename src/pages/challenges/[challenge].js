import React from "react";
import MainLayout from "layouts/MainLayout";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import { makeStyles, Container, Breadcrumbs, Typography, useTheme, useMediaQuery, Box, Grid } from "@material-ui/core";
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

const Challenge = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const appBarProps = { isDetail: true, className: classes.appBarMobile, appBarTitle: "Challenge name", shareUrl: "/" };

  //////////////////screen variant
  const isDone = true; //progress
  const isEnd = true; // due date
  const joined = true;
  const isGroup = true;
  //////////////////

  return (
    <MainLayout appBarProps={appBarProps}>
      <Container maxWidth="lg" className={classes.root}>
        {!isMobile && (
          <Breadcrumbs separator={">"} aria-label="breadcrumb" className={classes.breadcrumb}>
            <Typography variant="body2">{getLabel("L_HOME")}</Typography>
            <Typography variant="body2">{getLabel("L_CHALLENGE")}</Typography>
            <Typography variant="body2" className={classes.current}>
              Challenge name
            </Typography>
          </Breadcrumbs>
        )}
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
    padding: "0px",
  },
  breadcrumb: {
    margin: "18px 0px 24px 0px",
    width: "100%",
    color: theme.palette.text.secondary,
    cursor: "pointer",
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
