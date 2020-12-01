import React, { useEffect } from "react";
import MainLayout from "layouts/MainLayout";
import { DownloadApp, ListJoined, ListRecommend, ListAll, DetailCard } from "components/challenges";
import { Box, makeStyles, Typography, useTheme, useMediaQuery } from "@material-ui/core";
import { LangConstant } from "const";
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
  }, []);

  return (
    <MainLayout appBarProps={appBarProps}>
      <Box className={classes.root}>
        <Box>
          <Box className={classes.topContent}>
            <Typography>{getLabel("L_CHALLENGE")}</Typography>
            <Typography variant="h5">{getLabel("L_WITH_GAT")}</Typography>
          </Box>
        </Box>

        {!isMobile && (
          <Box>
            <DownloadApp />
          </Box>
        )}
        <ListJoined />
        <ListRecommend />
        <ListAll />
      </Box>
    </MainLayout>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    paddingTop: `-${HEIGHT_APP_BAR}`,
    "&>*:first-child": {
      height: "570px",
      width: "100%",
      backgroundImage: `url("images/img-challenge-bg.png")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      display: "flex",
      alignItem: "center",
      borderRadius: "0 0 20px 20px",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        height: "443px",
      },
      [theme.breakpoints.down("sm")]: {
        height: "311px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(3),
      },
    },
    "&>*:nth-child(2)": {
      position: "relative",
      marginTop: "-64px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  },
  appBar: {
    [theme.breakpoints.up("xs")]: {
      background: "none !important",
      "& *": {
        color: `${theme.palette.white} !important`,
      },
    },
  },
  topContent: {
    width: "1020px",
    height: "150px",
    marginTop: "12.5%",
    [theme.breakpoints.down("md")]: {
      width: "720px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      color: theme.palette.white,
      height: "100px",
      marginTop: "195px",
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
