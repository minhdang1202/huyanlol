import React from "react";
import { makeStyles, Typography, Paper, Box, Button } from "@material-ui/core";
const PositiveMember = () => {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.root}>
      PositiveMember
    </Paper>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "240px",
    padding: "24px",
    borderRadius: "10px",
  },
}));
export default PositiveMember;
