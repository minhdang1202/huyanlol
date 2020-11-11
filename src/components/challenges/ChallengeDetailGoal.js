import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Paper, Box } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import { GoalIcon } from "icons";
import clsx from "clsx";
const Goal = ({ goal, isGroup }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
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
        <Box className={clsx("ic-progress", classes.progress)}>
          <Typography variant="subtitle1" component="span">{`${getLabel("L_COMPLETE")}: 750/3000 (25%)`}</Typography>
        </Box>
      )}
    </Paper>
  );
};

Goal.propTypes = {
  goal: PropTypes.string,
  isGroup: PropTypes.bool,
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
    color: theme.palette.text.link,
    "&>:first-child": {
      color: theme.palette.text.primary,
      marginLeft: theme.spacing(1),
    },
  },
}));
export default Goal;
