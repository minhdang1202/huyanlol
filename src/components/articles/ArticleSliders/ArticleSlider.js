import React, { useRef, useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";
import { ReviewBox } from "components";
import SliderButtons from "./SliderButtons";

const ArticleSlider = ({ sliderList, isReviewType, isArticleType, ...otherProps }) => {
  const classes = useStyles();
  const totalSlides = sliderList.length;
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
    <Box position="relative">
      <Slider ref={slider} {...settings} {...otherProps} className={classes.root}>
        {sliderList.map((slider, index) => (
          <ReviewBox
            className={classes.slide}
            key={index}
            review={slider}
            isReviewType={isReviewType}
            isArticleType={isArticleType}
            isSlide={true}
          />
        ))}
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

ArticleSlider.propTypes = {
  sliderList: PropTypes.array.isRequired,
  isReviewType: PropTypes.bool,
  isArticleType: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    "& .slick-slide": {
      width: 497,
      maxWidth: 497,
      marginRight: theme.spacing(3),
    },
  },
  slide: {
    border: `solid 1px ${theme.palette.grey[100]}`,
  },
}));

export default ArticleSlider;
