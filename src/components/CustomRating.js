import React from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import MuiRating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";

const CustomRating = ({ size, ...otherProps }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery("(max-width:355px)");
  let ratingSize = "medium";
  if (isDesktop) {
    ratingSize = "large";
  } else if (isMobile) {
    ratingSize = "small";
  }

  return (
    <MuiRating
      name="Rating"
      precision={0.5}
      size={size ? size : ratingSize}
      style={{ marginRight: theme.spacing(1) }}
      {...otherProps}
    />
  );
};

CustomRating.propTypes = {
  size: PropTypes.string
};

export default CustomRating;
