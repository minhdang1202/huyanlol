import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Paper, Box, CircularProgress } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import { GoalIcon } from "icons";
import StringFormat from "string-format";
const Goal = ({ goal, isGroup, haveDone, total }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  let progress = (haveDone / total) * 100;
  return (
    <Paper elevation={1} className={classes.root}>
      <Typography className={classes.titleContainer}>
        <GoalIcon />
        <Typography className={classes.title} component="span" variant="h6">
          {getLabel(isGroup ? "L_GROUP_GOAL" : "L_PERSONAL_GOAL")}
        </Typography>
      </Typography>
      <Typography variant="body1">{goal}</Typography>
      {isGroup && (
        <Box className={classes.progress}>
          <CircularProgress variant="static" value={progress} size={16} />
          <Typography variant="subtitle1" component="span">
            {StringFormat(getLabel("FM_HAVE_DONE"), haveDone, total, progress)}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

Goal.propTypes = {
  goal: PropTypes.string,
  isGroup: PropTypes.bool,
  haveDone: PropTypes.number,
  total: PropTypes.number,
};
Goal.defaultProps = {
  isGroup: false,
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
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: "20px",
    marginLeft: theme.spacing(2),
  },
  progress: {
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    "&>:nth-child(1)": {
      color: theme.palette.text.link,
      marginRight: theme.spacing(1),
    },
  },
}));
export default Goal;
