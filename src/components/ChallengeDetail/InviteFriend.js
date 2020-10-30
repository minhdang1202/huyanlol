import React from "react";
import { makeStyles, Typography, Paper, Box, Button } from "@material-ui/core";
const InviteFriend = () => {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.root}>
      InviteFriend
    </Paper>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "188px",
    borderRadius: "10px",
  },
}));
export default InviteFriend;
