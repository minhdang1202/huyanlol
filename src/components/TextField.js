import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { TextField as MuiTextField, makeStyles } from "@material-ui/core";

const TextField = ({ className, ...otherProps }) => {
  const classes = useStyles();
  return (
    <MuiTextField
      className={clsx(classes.root, className)}
      {...otherProps}
    />
  );
};

TextField.propTypes = {
  className: PropTypes.string,
};

export default TextField;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& .MuiInput-underline": {
      "&:after": {
        borderBottom: "none",
      },
      "&:hover:before": {
        borderBottom: `1px solid ${theme.palette.grey[500]}`,
      },
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: theme.palette.grey[500],
    },
    "& .MuiFormLabel-root.Mui-disabled": {
      color: theme.palette.grey[500],
    },
    "& .MuiInput-underline.Mui-disabled:before": {
      borderBottom: `1px solid ${theme.palette.grey[300]} !important`,
    },
    "& .MuiInputBase-input": {
      paddingTop: 4,
    },
  },
}));
