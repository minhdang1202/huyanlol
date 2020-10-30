import React from "react";
import { makeStyles, Typography, Paper, Box, Button } from "@material-ui/core";
const Activity = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant={"h5"}>Activity</Typography>
      <Paper className={classes.item}>...</Paper>
      <Paper className={classes.item}>...</Paper>
      <Paper className={classes.item}>...</Paper>
    </Box>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  item: {
    width: "100%",
    height: "213px",
    borderRadius: "10px",
    margin: "16px 0px 16px 0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default Activity;
