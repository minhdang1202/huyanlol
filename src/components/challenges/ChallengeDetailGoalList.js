import React from "react";
import { makeStyles, Typography, Paper, Avatar, useTheme, useMediaQuery, Grid } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
const GoalList = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);

  const data = [
    "/images/img-goal.jpg",
    "/images/img-goal.jpg",
    "/images/img-goal.jpg",
    "/images/img-goal.jpg",
    "/images/img-goal.jpg",
    "/images/img-goal.jpg",
  ];

  const renderImageCount = () => {
    let count;
    if (isMobile) {
      count = 5;
    } else if (isTablet) {
      count = 4;
    } else {
      count = 6;
    }
    return count >= data.length ? data.length : count;
    //this is for later
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="subtitle1" className={classes.text}>
        {getLabel("L_GOAL_LIST")}
      </Typography>
      <Grid container direction="row" justify="space-around" alignItems="center">
        {data.map((item, index) => {
          if (index < renderImageCount()) {
            return (
              <Grid item xs={2} sm={3} className={classes.goalContainer}>
                <Avatar alt="goal" src={item} variant="square" className={classes.goal} />
              </Grid>
            );
          }
        })}
      </Grid>
    </Paper>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0px 0px 10px 10px",
    marginTop: "2px",
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
    },
  },
  text: {
    marginBottom: "16px",
  },
  goalContainer: {
    maxHeight: "142px",
    maxWidth: "94px",
    [theme.breakpoints.down("xs")]: {
      maxHeight: "94px",
      maxWidth: "62px",
    },
  },
  goal: {
    width: "100%",
    height: "100%",
  },
}));

export default GoalList;
