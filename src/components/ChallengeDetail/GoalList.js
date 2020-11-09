import React from "react";
import { makeStyles, Typography, Paper, Box, Avatar } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
const GoalList = () => {
  const classes = useStyles();
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
        <Avatar alt="goal" src="/images/img-goal.jpg" variant="square" className={classes.goal} />
        <Avatar alt="goal" src="/images/img-goal.jpg" variant="square" className={classes.goal} />
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
  },
  text: {
    marginBottom: "16px",
  },
  goals: {
    height: "142px",
    display: "flex",
    justifyContent: "space-between",
  },
  goal: {
    height: "142px",
    width: "94px",
  },
}));

export default GoalList;
