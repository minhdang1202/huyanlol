import React, { useRef, useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, Box, useTheme, useMediaQuery } from "@material-ui/core";
import { ReviewBox } from "components";
import SliderButtons from "./SliderButtons";

const ArticleSlider = ({ sliderList, isReviewType, isArticleType, ...otherProps }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between("xs", "md"));
  const totalSlides = sliderList ? sliderList.length : null;
  let settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToScroll: 1,
    swipeToSlide: true,
    slidesToShow: 1,
    arrows: false,
    variableWidth: true,
    beforeChange: (current, next) => {
      setSlideIndex(next);
    },
  };

  settings = isTablet ? { ...settings, rows: 2, slidesPerRow: 1, variableWidth: false } : settings;

  const slider = useRef();
  const [slideIndex, setSlideIndex] = useState(0);

  const onPrevSlide = () => {
    slider.current.slickPrev();
  };

  const onNextSlide = () => {
    slider.current.slickNext();
  };

  return totalSlides ? (
    <Box position="relative">
      <Slider ref={slider} {...settings} {...otherProps} className={classes.root}>
        {sliderList.map((slider, index) => {
          const hasMb = isTablet && index % 2 === 0;
          return (
            <ReviewBox
              className={clsx(classes.slide, hasMb && "mb-8")}
              key={index}
              review={slider}
              isReviewType={isReviewType}
              isArticleType={isArticleType}
              isSlide={true}
            />
          );
        })}
      </Slider>
      <SliderButtons
        onNextSlide={onNextSlide}
        onPrevSlide={onPrevSlide}
        totalSlides={totalSlides}
        slideIndex={slideIndex}
        isArticleSlider={true}
      />
    </Box>
  ) : null;
};

ArticleSlider.propTypes = {
  sliderList: PropTypes.array,
  isReviewType: PropTypes.bool,
  isArticleType: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: theme.spacing(8.5),
    "& .slick-slide": {
      width: 497,
      maxWidth: 497,
      marginRight: theme.spacing(3),
      [theme.breakpoints.between("xs", "md")]: {
        width: "100%",
        maxWidth: "100%",
        marginRight: 0,
      },
    },
  },
  slide: {
    border: `solid 1px ${theme.palette.grey[100]}`,
  },
}));

export default ArticleSlider;
