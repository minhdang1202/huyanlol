import React, { useState } from "react";
import { makeStyles, Typography, Paper, Box, Button, useTheme, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import StringFormat from "string-format";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { daysLeft } from "utils/date";
import { CHALLENGE_TARGET_TYPE } from "const/app.const";
import { ChallengeService } from "services";
import { hasLogged } from "utils/auth";
import AuthDialog from "components/AuthDialog";
const ChallengeDetailFooter = ({ isDone, isEnd, joined }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isLoggedIn = hasLogged();
  const challengeProgress = useSelector(state => state.challengeRedux.detailInfo.challengeProgress);
  const fixedTargetNumber = useSelector(state => state.challengeRedux.detailInfo.targetNumber);
  const targetTypeId = useSelector(state => state.challengeRedux.detailInfo.targetTypeId);
  const endDate = useSelector(state => state.challengeRedux.detailInfo.endDate);
  const progress = challengeProgress ? challengeProgress.progress : 0;
  const target = challengeProgress ? challengeProgress.targetNumber : fixedTargetNumber;
  const challengeId = useSelector(state => state.challengeRedux.detailInfo.challengeId);
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false);
  const onJoin = async challengeId => {
    if (isLoggedIn) {
      const response = await ChallengeService.putJoinChallenge(challengeId);
      if (response) window.location.reload();
    } else {
      setIsOpenLoginForm(true);
    }
  };
  const onCloseLoginForm = () => setIsOpenLoginForm(false);

  return (
    <Paper elevation={1} className={classes.content}>
      {joined && (
        <Box className={classes.detail}>
          {!isMobile && (
            <Typography variant="subtitle1" className="processLabel">
              {getLabel("L_PROCESS")}
            </Typography>
          )}
          {isDone ? (
            <Box className={clsx(!isMobile && [classes.icLine1, "ic-check"], isDone && classes.isDone)}>
              <Typography variant="body1" component="span">
                {StringFormat(
                  getLabel(
                    targetTypeId === CHALLENGE_TARGET_TYPE.readBook ||
                      targetTypeId === CHALLENGE_TARGET_TYPE.readBookList
                      ? "FM_PROGRESS"
                      : "FM_PROGRESS_REVIEW",
                  ),
                  progress,
                  target,
                )}
              </Typography>
            </Box>
          ) : (
            <Box className={!isMobile ? clsx(classes.icLine1, "ic-bullseye") : null}>
              <Typography variant="body1" component="span">
                {StringFormat(
                  getLabel(
                    targetTypeId === CHALLENGE_TARGET_TYPE.readBook ||
                      targetTypeId === CHALLENGE_TARGET_TYPE.readBookList
                      ? "FM_PROGRESS"
                      : "FM_PROGRESS_REVIEW",
                  ),
                  progress,
                  target,
                )}
              </Typography>
            </Box>
          )}
          <Box className={clsx(classes.icLine2, classes.gray, "ic-calendar-alt")}>
            {isEnd ? (
              <Typography variant={isMobile ? "body2" : "body1"} component="span">
                {getLabel("L_END")}
              </Typography>
            ) : (
              <Typography variant={isMobile ? "body2" : "body1"} component="span">
                {StringFormat(getLabel("FM_DAYS_LEFT"), daysLeft(endDate))}
              </Typography>
            )}
          </Box>
        </Box>
      )}
      {joined ? (
        <Box className={classes.btnContainer}>
          <Button
            fullWidth
            size={isMobile ? "small" : "medium"}
            color="primary"
            variant="contained"
            className={classes.btn}
          >
            {getLabel("L_UPDATE_PROGRESS")}
          </Button>
        </Box>
      ) : (
        <Button
          fullWidth
          size={isMobile ? "large" : "medium"}
          color="primary"
          variant="contained"
          onClick={() => onJoin(challengeId)}
        >
          {getLabel("L_JOIN")}
        </Button>
      )}
      <AuthDialog isOpen={isOpenLoginForm} onClose={onCloseLoginForm} />
    </Paper>
  );
};

ChallengeDetailFooter.propTypes = {
  isDone: PropTypes.bool,
  isEnd: PropTypes.bool,
  joined: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  content: {
    borderRadius: "0px 0px 10px 10px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    zIndex: 4,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      bottom: "0",
      left: 0,
      alignItems: "center",
      height: "72px",
      padding: theme.spacing(2),
    },
  },
  btnContainer: {
    width: "100%",
    minHeight: "45px",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      width: "50%",
    },
  },
  joinBtn: {
    height: "100%",
    backgroundColor: theme.palette.text.link,
    color: theme.palette.white,
  },
  detail: {
    marginBottom: theme.spacing(2),
    "&>:nth-child(n+2)": {
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
      "&>:nth-child(n+2)": {
        marginTop: 0,
      },
    },
  },
  icLine1: {
    "&>:first-child": {
      margin: "4px",
    },
  },
  icLine2: {
    "&>:first-child": {
      margin: theme.spacing(1),
    },
  },
  gray: {
    color: theme.palette.text.secondary,
  },
  isDone: {
    color: theme.palette.text.link,
  },
}));

export default ChallengeDetailFooter;
