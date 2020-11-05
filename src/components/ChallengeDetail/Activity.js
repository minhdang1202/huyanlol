import React from "react";
import { makeStyles, Typography, Paper, Box, Button } from "@material-ui/core";
const Activity = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant={"h5"} className={classes.title}>
        Activity
      </Typography>
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
  title: {
    fontSize: "18px",
    fontWeight: 600,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "20px",
    },
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
