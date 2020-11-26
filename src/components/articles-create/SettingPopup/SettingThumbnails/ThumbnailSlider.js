import React, { forwardRef } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, Avatar } from "@material-ui/core";

const ThumbnailSlider = forwardRef(
  (
    { thumbnailList, settings, currentThumbnail, onChangeCurrentThumbnail, onGoToSlide, className, ...otherProps },
    ref,
  ) => {
    const classes = useStyles();

    return (
      <Slider ref={ref} {...settings} {...otherProps} className={clsx(classes.root, className)}>
        {thumbnailList.map((thumbnail, index) => {
          const isCurrentThumbnail = thumbnail.src === currentThumbnail.src;
          return (
            <Avatar
              key={index}
              className={clsx(classes.slide, isCurrentThumbnail && classes.isCurrentThumbnail)}
              variant="square"
              src={thumbnail.src}
              onClick={() => {
                onChangeCurrentThumbnail(thumbnail);
                onGoToSlide(index);
              }}
            />
          );
        })}
      </Slider>
    );
  },
);

ThumbnailSlider.displayName = "ThumbnailSlider";

ThumbnailSlider.propTypes = {
  thumbnailList: PropTypes.array,
  className: PropTypes.string,
  currentThumbnail: PropTypes.object,
  onChangeCurrentThumbnail: PropTypes.func,
  settings: PropTypes.object,
  onGoToSlide: PropTypes.fuc,
};

export default ThumbnailSlider;

const useStyles = makeStyles(theme => ({
  root: {
    "& .slick-slide": {
      width: 74,
      maxWidth: 74,
      height: 74,
      marginRight: theme.spacing(1),
      "&>*": {
        height: "100%",
      },
    },
  },
  slide: {
    borderRadius: 6,
    height: "100%",
    "&:focus": {
      outline: "none",
    },
    cursor: "pointer",
  },
  isCurrentThumbnail: {
    border: `solid 2px ${theme.palette.primary.main}`,
  },
}));
