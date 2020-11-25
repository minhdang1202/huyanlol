import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Paper, Box, CircularProgress } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import { GoalIcon } from "icons";
import StringFormat from "string-format";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { CHALLENGE_TARGET_TYPE } from "const/app.const";
const Goal = ({ isGroup, joined }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);

  const data = useSelector(state => state.challengeRedux.detail.detailInfo.challengeProgress);
  const targetTypeId = useSelector(state => state.challengeRedux.detail.detailInfo.targetTypeId);
  const fixedTargetNumber = useSelector(state => state.challengeRedux.detail.detailInfo.targetNumber);
  const progress = data ? data.progress : 0;
  const targetNumber = data && data.progress ? data.targetNumber : fixedTargetNumber;
  const progressPercent = (progress / targetNumber) * 100;

  return (
    <Paper
      elevation={1}
      className={clsx(
        classes.root,
        (targetTypeId === CHALLENGE_TARGET_TYPE.readBook || targetTypeId === CHALLENGE_TARGET_TYPE.writeArticle) &&
          classes.noList,
      )}
    >
      <Typography className={classes.titleContainer}>
        <GoalIcon />
        <Typography className={classes.title} component="span" variant="h6">
          {getLabel(isGroup ? "L_GROUP_GOAL" : "L_PERSONAL_GOAL")}
        </Typography>
      </Typography>
      <Typography variant="body1">
        {(targetTypeId === CHALLENGE_TARGET_TYPE.readBook || targetTypeId === CHALLENGE_TARGET_TYPE.readBookList) &&
          StringFormat(getLabel(isGroup ? "FM_GOAL_GROUP" : "FM_GOAL"), targetNumber)}
        {(targetTypeId === CHALLENGE_TARGET_TYPE.writeArticle ||
          targetTypeId === CHALLENGE_TARGET_TYPE.writeArticleList) &&
          StringFormat(getLabel(isGroup ? "FM_GOAL_REVIEW_GROUP" : "FM_GOAL_REVIEW"), targetNumber)}
      </Typography>
      {isGroup && joined && (
        <Box className={classes.progress}>
          <CircularProgress variant="static" value={progress} size={16} thickness={5} />
          <CircularProgress variant="static" value={100} size={16} thickness={5} className={classes.bottom} />
          <Typography variant="subtitle1" component="span">
            {StringFormat(getLabel("FM_HAVE_DONE"), progress, targetNumber, progressPercent)}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

Goal.propTypes = {
  isGroup: PropTypes.bool,
  joined: PropTypes.bool,
};
Goal.defaultProps = {
  isGroup: false,
  joined: false,
};
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "112px",
    marginTop: "2px",
    padding: theme.spacing(3),
    justifyContent: "space-around",
    borderRadius: "0px",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
  noList: {
    borderRadius: "0px 0px 10px 10px",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: "20px",
    marginLeft: theme.spacing(1),
  },
  progress: {
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    position: "relative",
    "&>:nth-child(1)": {
      position: "absolute",
      marginRight: "0px",
      zIndex: 1,
      color: "#d2d9de",
    },
    "&>:nth-child(2)": {
      marginRight: theme.spacing(1),
      color: theme.palette.text.link,
    },
  },
}));
export default Goal;
