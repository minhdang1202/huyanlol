import React from "react";
import { makeStyles, Box, Grid } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";

const TopBar = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      
    </Grid>
  );
}

export default TopBar;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1022,
    margin: "16px auto",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 3, 1),
    },
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      padding: 0,
      display: "block"
    },
  },
}));