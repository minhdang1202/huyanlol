import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { IconButton, Box, makeStyles } from "@material-ui/core";

const SliderButton = ({ isNext, className, ...otherProps }) => {
  const classes = useStyles({ isNext });
  return (
    <IconButton className={clsx(classes.root, className)} classes={{ disabled: classes.disabled }} {...otherProps}>
      <Box className={isNext ? "ic-chevron-right" : "ic-chevron-left"}></Box>
    </IconButton>
  );
};

SliderButton.propTypes = {
  isNext: PropTypes.bool,
  className: PropTypes.string,
};

export default SliderButton;

export const WIDTH_BUTTON = "41px";

const useStyles = makeStyles(theme => ({
  root: {
    width: WIDTH_BUTTON,
    height: WIDTH_BUTTON,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    background: theme.palette.white,
    fontSize: 16,
    color: theme.palette.text.secondary,
    padding: 0,
    "&:hover": {
      background: theme.palette.white,
    },
  },
  disabled: {
    visibility: "hidden",
  },
}));
