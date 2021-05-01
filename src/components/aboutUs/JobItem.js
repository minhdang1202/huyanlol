import React from "react";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import PropTypes from "prop-types";

const JobItem = ({ title, body }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography className="semiBold-lg-txt" gutterBottom>{title}</Typography>
      <Typography>{body}</Typography>
    </Paper>
  );
};

export default JobItem;

JobItem.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    borderRadius: 10,
    height: "100%"
  },
}));
