import React from "react";
import { makeStyles } from "@material-ui/core";
import { CommonSelect } from "components";
import { RADIO_LIST } from "..";

const SortSelect = props => {
  const classes = useStyles();
  return (
    <CommonSelect
      className={classes.root}
      menuPropsClasses={{ paper: classes.paper }}
      selectList={RADIO_LIST}
      {...props}
    />
  );
};

export default SortSelect;

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.grey[500],
  },
  paper: {
    "& ul": {
      color: theme.palette.grey[500],
    },
  },
}));
