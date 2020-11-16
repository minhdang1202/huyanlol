import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Typography, useTheme, useMediaQuery, Button, Box, makeStyles } from "@material-ui/core";
import Slider from "react-slick";
import { AppLink } from "components";
import { PADDING_X_CONTAINER_MOBILE } from "pages/articles/[article]";

const ArticleHashtagButtons = ({ hashtags, category, className }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    variableWidth: true,
  };
  return isMobile ? (
    <Slider {...settings} className={clsx(classes.root, classes.isMobile, className)}>
      <AppLink to="#">
        <Button size="small" variant="contained" className="dark-blue-button" startIcon={<Box className="ic-tag" />}>
          {category}
        </Button>
      </AppLink>
      {hashtags.length > 0 &&
        hashtags.map((hashtag, index) => (
          <AppLink key={index} to="#">
            <Button variant="contained" className="light-blue-button">
              <Typography variant="body2">{hashtag.tagName}</Typography>
            </Button>
          </AppLink>
        ))}
    </Slider>
  ) : (
    <Box className={clsx(classes.root, className)}>
      <AppLink to="#">
        <Button variant="contained" className="dark-blue-button" startIcon={<Box className="ic-tag" />}>
          {category}
        </Button>
      </AppLink>
      {hashtags.length > 0 &&
        hashtags.map((hashtag, index) => (
          <AppLink key={index} to="#">
            <Button variant="contained" className="light-blue-button">
              <Typography variant="body1">{hashtag.tagName}</Typography>
            </Button>
          </AppLink>
        ))}
    </Box>
  );
};

ArticleHashtagButtons.propTypes = {
  hashtags: PropTypes.array,
  category: PropTypes.string,
  className: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& .ic-tag": {
      fontSize: 12,
    },
    "& button": {
      minHeight: 43,
      padding: "0 16px !important",
      borderRadius: "4px !important",
      minWidth: "fit-content",
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        minHeight: 25,
        padding: "0 12px !important",
      },
    },
    "& a": {
      "&:hover": {
        textDecoration: "none",
      },
    },
  },
  isMobile: {
    display: "flex",
    flexWrap: "wrap",
    width: `calc(100% + ${PADDING_X_CONTAINER_MOBILE})`,
    marginRight: `calc(${PADDING_X_CONTAINER_MOBILE} * -1)`,
  },
}));

export default ArticleHashtagButtons;
