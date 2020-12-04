import React, { useEffect } from "react";
import MainLayout from "layouts/MainLayout";
import { DownloadApp, ListJoined, ListRecommend, ListAll } from "components/challenges";
import { Box, makeStyles, Typography, useTheme, useMediaQuery } from "@material-ui/core";
import { LangConstant, AppConstant } from "const";
import { useTranslation } from "react-i18next";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppBar";
import { useDispatch } from "react-redux";
import ChallengeAction from "redux/challenge.redux";
const Challenge = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_LIST);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const SHARE_URL = getLabel("L_CHALLENGE_ADDRESS");
  const appBarProps = { shareUrl: SHARE_URL, className: classes.appBar };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ChallengeAction.requestGetChallengeList());
    dispatch(
      ChallengeAction.requestGetChallengeListJoined({ joinStatusFilter: AppConstant.CHALLENGE_LIST_TYPE.joined }),
    );
    dispatch(
      ChallengeAction.requestGetChallengeListRecommend({ joinStatusFilter: AppConstant.CHALLENGE_LIST_TYPE.notJoined }),
    );
  }, []);

  return (
    <MainLayout appBarProps={appBarProps}>
      <Box className={classes.root}>
        <Box className={classes.background}></Box>
        <Box className={classes.mainContent}>
          <Box className={classes.topContent}>
            <Typography>{getLabel("L_CHALLENGE")}</Typography>
            <Typography variant="h5">{getLabel("L_WITH_GAT")}</Typography>
          </Box>
          {!isMobile && <DownloadApp />}
          <ListJoined />
          <ListAll />
        </Box>
      </Box>
    </MainLayout>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  background: {
    height: "570px",
    width: "100%",
    backgroundImage: `url("images/img-challenge-bg.png")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "0 0 20px 20px",
    [theme.breakpoints.down("md")]: {
      height: "443px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "311px",
      backgroundPosition: "right",
    },
  },
  mainContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: "-350px",
    [theme.breakpoints.down("md")]: {
      marginTop: "-300px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "-144px",
      padding: theme.spacing(2),
    },
    "&>*": {
      marginBottom: theme.spacing(5),
      width: "1020px",
      [theme.breakpoints.down("md")]: {
        width: "720px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    "&>*:first-child": {
      marginBottom: "160px",
      [theme.breakpoints.down("md")]: {
        marginBottom: "100px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(5),
      },
    },
  },
  topContent: {
    [theme.breakpoints.down("xs")]: {
      color: theme.palette.white,
    },
    "&>*:first-child": {
      fontSize: "60px",
      fontWeight: 500,
      [theme.breakpoints.down("xs")]: {
        fontSize: "38px",
      },
    },
  },
}));
export default Challenge;
