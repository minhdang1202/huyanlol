import React, { useRef, useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";
import BookBox from "../BookBox";
import SliderButtons from "./SliderButtons";
import { PADDING_X_CONTAINER_MOBILE } from "pages/articles/[article]";

const BookSlider = ({ sliderList, ...otherProps }) => {
  const totalSlides = sliderList.length;
  const classes = useStyles({ totalSlides });
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    variableWidth: true,
    beforeChange: (current, next) => {
      setSlideIndex(next);
    },
  };
  const slider = useRef();
  const [slideIndex, setSlideIndex] = useState(0);

  const onPrevSlide = () => {
    slider.current.slickPrev();
  };

  const onNextSlide = () => {
    slider.current.slickNext();
  };

  return (
    <Box
      position="relative"
      width={{ xs: `calc(100% + ${PADDING_X_CONTAINER_MOBILE})`, sm: "100%" }}
      mr={{ xs: `calc(${PADDING_X_CONTAINER_MOBILE} * -1)`, sm: "auto" }}
    >
      <Slider ref={slider} {...settings} {...otherProps} className={classes.root}>
        {sliderList.map((slide, index) => {
          return <BookBox key={index} data={slide} className={classes.slide} />;
        })}
      </Slider>
      <SliderButtons
        onNextSlide={onNextSlide}
        onPrevSlide={onPrevSlide}
        totalSlides={totalSlides}
        slideIndex={slideIndex}
      />
    </Box>
  );
};

export const HEIGHT_BOOK_BOX = "174px";
const WIDTH_BOOK_BOX = "316px";
const WIDTH_BOOK_BOX_TABLET = "280px";
export const HEIGHT_BOOK_BOX_MOBILE = "139px";
const WIDTH_BOOK_BOX_MOBILE = "287px";

BookSlider.propTypes = {
  sliderList: PropTypes.array.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    "& .slick-slide": {
      marginRight: ({ totalSlides }) => (totalSlides === 1 ? 0 : theme.spacing(2)),
      width: ({ totalSlides }) => (totalSlides === 1 ? "100%" : WIDTH_BOOK_BOX),
      height: HEIGHT_BOOK_BOX,
      [theme.breakpoints.down("md")]: {
        width: ({ totalSlides }) => (totalSlides === 1 ? "100%" : WIDTH_BOOK_BOX_TABLET),
        height: HEIGHT_BOOK_BOX,
      },
      [theme.breakpoints.down("xs")]: {
        width: ({ totalSlides }) => (totalSlides === 1 ? "100%" : WIDTH_BOOK_BOX_MOBILE),
        height: HEIGHT_BOOK_BOX_MOBILE,
      },
    },
  },
}));

export default BookSlider;
