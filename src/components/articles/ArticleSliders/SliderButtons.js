import React, { useState } from "react";
import { IconButton, Box, makeStyles, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";

const SliderButtons = ({ onPrevSlide, onNextSlide, slideIndex, totalSlides }) => {
  const classes = useStyles();
  const [lastSlide, setLastSlide] = useState(Math.ceil(totalSlides / 2));

  return (
    <Hidden xsDown>
      {slideIndex === 0 ? null : (
        <CustomSliderButton className={clsx(classes.button, classes.prevButton)} onClick={onPrevSlide} />
      )}
      {slideIndex === lastSlide || totalSlides <= 2 ? null : (
        <CustomSliderButton isNext={true} className={clsx(classes.button, classes.nextButton)} onClick={onNextSlide} />
      )}
    </Hidden>
  );
};

const CustomSliderButton = ({ isNext, className, ...otherProps }) => {
  const classes = useStyles({ isNext });
  return (
    <IconButton className={clsx(classes.root, className)} {...otherProps}>
      <Box className={isNext ? "ic-chevron-right" : "ic-chevron-left"}></Box>
    </IconButton>
  );
};

const WIDTH_BUTTON = "41px";

SliderButtons.propTypes = {
  onNextSlide: PropTypes.func,
  onPrevSlide: PropTypes.func,
  slideIndex: PropTypes.number,
  totalSlides: PropTypes.number,
};

CustomSliderButton.propTypes = {
  isNext: PropTypes.bool,
  className: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: WIDTH_BUTTON,
    height: WIDTH_BUTTON,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    border: `solid 1px ${theme.palette.grey[100]}`,
    background: theme.palette.white,
    fontSize: 16,
    color: theme.palette.text.secondary,
    padding: 0,
    "&:hover": {
      background: theme.palette.grey[100],
    },
  },
  button: {
    position: "absolute",
    top: `calc(50% + ${WIDTH_BUTTON} / 2)`,
    transform: "translate(-50%, -100%)",
  },
  prevButton: {
    left: 0,
  },
  nextButton: {
    right: `calc(${WIDTH_BUTTON} * -1)`,
  },
}));

export default SliderButtons;
