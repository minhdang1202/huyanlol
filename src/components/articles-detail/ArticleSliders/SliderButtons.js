import React, { useState } from "react";
import { makeStyles, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import SliderButton, { WIDTH_BUTTON } from "components/SliderButton";

const SliderButtons = ({ onPrevSlide, onNextSlide, slideIndex, totalSlides }) => {
  const classes = useStyles();
  const [lastSlide, setLastSlide] = useState(Math.ceil(totalSlides / 2));

  return (
    <Hidden xsDown>
      {slideIndex > 0 && <SliderButton className={clsx(classes.button, classes.prevButton)} onClick={onPrevSlide} />}
      {(slideIndex != lastSlide && totalSlides > 2) && (
        <SliderButton isNext={true} className={clsx(classes.button, classes.nextButton)} onClick={onNextSlide} />
      )}
    </Hidden>
  );
};

SliderButtons.propTypes = {
  onNextSlide: PropTypes.func,
  onPrevSlide: PropTypes.func,
  slideIndex: PropTypes.number,
  totalSlides: PropTypes.number,
};

const useStyles = makeStyles(() => ({
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
