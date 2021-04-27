import React, { forwardRef } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, Avatar } from "@material-ui/core";
import { getImageById } from "utils";

const ThumbnailSlider = forwardRef(
  ({ thumbnailList, settings, thumbnailId, onChangeThumbnailId, onGoToSlide, className, ...otherProps }, ref) => {
    const classes = useStyles();

    return (
      <Slider ref={ref} {...settings} {...otherProps} className={clsx(classes.root, className)}>
        {thumbnailList.map((id, index) => {
          const isCurrentThumbnailId = id === thumbnailId;
          return (
            <Avatar
              key={index}
              className={clsx(classes.slide, isCurrentThumbnailId && classes.border)}
              variant="square"
              src={getImageById(id)}
              onClick={() => {
                onChangeThumbnailId(id);
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
  thumbnailId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChangeThumbnailId: PropTypes.func,
  settings: PropTypes.object,
  onGoToSlide: PropTypes.func,
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
  border: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));
