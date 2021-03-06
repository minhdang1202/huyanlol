import React, { useEffect, useState } from "react";
import MainLayout from "layouts/MainLayout";
import { DownloadApp, ListJoined, ListAll } from "components/challenges";
import { Box, makeStyles, Typography, useTheme, useMediaQuery } from "@material-ui/core";
import { LangConstant, AppConstant } from "const";
import { useTranslation } from "react-i18next";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppBar";
import { useDispatch, useSelector } from "react-redux";
import ChallengeAction from "redux/challenge.redux";
import { MAIN_LAYOUT_ID } from "layouts/MainLayout";
import { hasLogged } from "utils/auth";
const Challenge = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_LIST);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [isTransparentAppBar, setIsTransparentAppBar] = useState(true);
  const appBarProps = {
    isDetail: true,
    className: classes.appBar,
    appBarTitle: getLabel("L_CHALLENGE_WITH_GAT"),
    isTransparent: isTransparentAppBar,
  };
  const listJoined = useSelector(state => state.challengeRedux.listJoined.pageData);
  const listRecommend = useSelector(state => state.challengeRedux.listRecommend.pageData);
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
  useEffect(() => {
    if (!isMobile) {
      const mainLayout = document.getElementById(MAIN_LAYOUT_ID);
      if (mainLayout) {
        mainLayout.addEventListener("scroll", onScroll);
        return () => {
          mainLayout.removeEventListener("scroll", onScroll);
        };
      }
    }
  });
  const onScroll = e => {
    if (e.target.scrollTop > 0 && isTransparentAppBar) {
      setIsTransparentAppBar(false);
    } else if (e.target.scrollTop === 0) {
      setIsTransparentAppBar(true);
    }
  };
  return (
    <MainLayout appBarProps={appBarProps}>
      <Box className={classes.root}>
        <Box className={classes.background}>
          <Box className={classes.gradientTop} />
          <Box className={classes.gradientBottom} />
        </Box>
        <Box className={classes.mainContent}>
          <Box className={classes.topContent}>
            <Typography>{getLabel("L_CHALLENGE")}</Typography>
            <Typography variant="h5">{getLabel("L_WITH_GAT")}</Typography>
          </Box>
          {!isMobile && <DownloadApp />}
          {hasLogged() && listJoined && <ListJoined />}
          {listRecommend && <ListAll />}
        </Box>
      </Box>
    </MainLayout>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "relative",
    marginTop: `-${HEIGHT_APP_BAR}`,
    overflowX: "hidden",
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
  },
  background: {
    margin: "auto",
    height: "570px",
    width: "100%",
    maxWidth: "1366px",
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  gradientTop: {
    width: "100%",
    height: "160px",
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0.43), rgba(0, 0, 0, 0))",
    [theme.breakpoints.down("xs")]: {
      background: "transparent",
    },
  },

  gradientBottom: {
    width: "100%",
    height: "160px",
    [theme.breakpoints.down("xs")]: {
      background: "linear-gradient(rgba(0, 0, 0, 0), #000000)",
    },
  },
  mainContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    marginTop: "-360px",
    [theme.breakpoints.down("md")]: {
      marginTop: "-300px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "-131px",
    },
    "&>*": {
      marginBottom: theme.spacing(5),
      width: "1020px",
      [theme.breakpoints.down("md")]: {
        width: "720px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        padding: "0 16px",
      },
    },
    "&>*:first-child": {
      marginBottom: "170px",
      [theme.breakpoints.down("md")]: {
        marginBottom: "100px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(7),
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
