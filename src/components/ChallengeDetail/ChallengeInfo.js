import React from "react";
import { makeStyles, Typography, Paper, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import { PersonIcon, DateIcon } from "../../icons/index";
const ChallengeInfo = ({ name, count, from, to }) => {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.root}>
      <Typography variant="h5" component="h1" className={classes.title}>
        {name}
      </Typography>
      <Typography className={classes.content}>
        <Typography variant="body1" component="span" className={classes.centerText}>
          <PersonIcon />
          <Typography component="span">{`${count} nguoi`}</Typography>
        </Typography>
        <Typography variant="body1" component="span" className={classes.centerText}>
          <DateIcon />
          <Typography component="span">{`${from} to ${to}`}</Typography>
        </Typography>
      </Typography>
    </Paper>
  );
};
ChallengeInfo.PropTypes = {
  name: PropTypes.string,
  count: PropTypes.number,
  from: PropTypes.string,
  to: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: "24px",
    borderRadius: "10px 10px 0px 0px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "24px",
  },
  content: {
    display: "flex",
    justifyContent: "center",
  },
  centerText: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0px 5px 0px",
    width: "250px",
  },
}));
export default ChallengeInfo;
