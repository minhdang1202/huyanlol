import React from "react";
import { makeStyles, Typography, Box, Avatar } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";

const Carousel = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ABOUT_US);
  const IMAGES = [
    "./images/img-about-us-slider-1.jpg",
    "./images/img-about-us-slider-2.jpg",
    "./images/img-about-us-slider-3.jpg",
    "./images/img-about-us-slider-4.jpg",
    "./images/img-about-us-slider-5.jpg",
    "./images/img-about-us-slider-6.jpg",
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box className={classes.root}>
      <Box className="center-root" flexDirection="column">
        <Typography variant="h5" className={classes.title}>
          {getLabel("TXT_GIVE_WAY_IS_TO_GET_BACK")}
        </Typography>
        <Typography variant="h5" className={classes.title}>
          {getLabel("TXT_LEND_GOOD_BOOKS")}
        </Typography>
      </Box>
      <Slider {...settings} className={classes.sliderRoot}>
        {IMAGES.map((imgUrl, index) => (
          <Avatar key={index} variant="square" src={imgUrl} className={classes.image} />
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 0),
    marginTop: theme.spacing(2),
  },
  sliderRoot: {
    marginTop: theme.spacing(4),
    "& .slick-arrow": {
      zIndex: 100,
      "&:before": {
        fontSize: 60,
        opacity: 1,
        lineHeight: 0.5
      },
      [theme.breakpoints.down("xs")]: {
        display: "none !important"
      }
    },
    "& .slick-prev": {
      left: 20,
    },
    "& .slick-next": {
      right: 60,
    },
  },
  image: {
    height: 224,
  },
  title: {
    maxWidth: 465,
    textAlign: "center",
  },
}));
