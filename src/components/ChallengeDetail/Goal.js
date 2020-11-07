import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import { GoalIcon } from "../../icons/index";
const Goal = ({ goal }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  return (
    <Paper elevation={1} className={classes.root}>
      <Typography className={classes.titleContainer}>
        <GoalIcon />
        <Typography className={classes.title} component="span" variant="subtitle1">
          {getLabel("L_PERSONAL_GOAL")}
        </Typography>
      </Typography>
      <Typography className={classes.content} variant="body1">
        {goal}
      </Typography>
    </Paper>
  );
};

Goal.propTypes = {
  goal: PropTypes.string,
};
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "112px",
    marginTop: "2px",
    padding: "24px",
    justifyContent: "space-around",
    borderRadius: "0px",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: "20px",
    marginLeft: "16px",
  },
  content: {
    fontSize: "16px",
    marginLeft: "40px",
  },
}));
export default Goal;
