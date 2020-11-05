import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Box, Paper } from "@material-ui/core";
const Goal = ({ goal }) => {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.root}>
      <Typography>{goal}</Typography>
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
    padding: 0,
    height: "120px",
    margin: "4px 0px 4px 0px",
  },
}));
export default Goal;
