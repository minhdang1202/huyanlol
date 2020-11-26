import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Chip as MuiChip, Box, makeStyles } from "@material-ui/core";

const Chip = ({ className, ...otherProps }) => {
  const classes = useStyles();
  return (
    <MuiChip
      className={clsx(classes.root, className)}
      deleteIcon={<Box className="ic-times-circle-light" fontSize={14} />}
      {...otherProps}
    />
  );
};

Chip.propTypes = {
  className: PropTypes.string,
};

export default Chip;

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary[100],
    color: theme.palette.primary.main,
    "&:focus": {
      background: theme.palette.primary[100],
    },
    "& *": {
      color: theme.palette.primary.main,
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
}));
