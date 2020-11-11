import React from "react";
import { makeStyles, Typography, Paper, Box, Avatar, useTheme, useMediaQuery } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
const GoalList = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  return (
    <Paper className={classes.root}>
      <Typography variant="subtitle1" className={classes.text}>
        {getLabel("L_GOAL_LIST")}
      </Typography>
      <Box className={classes.goals}>
        <Avatar alt="goal" src="/images/img-goal.jpg" variant="square" className={classes.goal} />
        <Avatar alt="goal" src="/images/img-goal.jpg" variant="square" className={classes.goal} />
        <Avatar alt="goal" src="/images/img-goal.jpg" variant="square" className={classes.goal} />
        <Avatar alt="goal" src="/images/img-goal.jpg" variant="square" className={classes.goal} />
        {!isTablet && <Avatar alt="goal" src="/images/img-goal.jpg" variant="square" className={classes.goal} />}
        {!isMobile && <Avatar alt="goal" src="/images/img-goal.jpg" variant="square" className={classes.goal} />}
      </Box>
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
  goals: {
    display: "flex",
    justifyContent: "space-between",
  },
  goal: {
    height: "142px",
    width: "94px",
    [theme.breakpoints.down("sm")]: {
      height: "94px",
      width: "62px",
    },
    zIndex: "1",
  },
}));

export default GoalList;
