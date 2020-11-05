import React from "react";
import { makeStyles, Typography, Paper, Box, Button } from "@material-ui/core";

const ChallengeInfo = () => {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.root}>
      info
    </Paper>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "336px",
    padding: "24px",
    borderRadius: "10px",
  },
}));

export default ChallengeInfo;
