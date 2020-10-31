import React from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import MuiRating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";

const CustomRating = ({ initialRating, isReadOnly, size }) => {
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
      readOnly={isReadOnly}
      name="Rating"
      defaultValue={initialRating}
      precision={0.5}
      size={size ? size : ratingSize}
      style={{ marginRight: theme.spacing(1) }}
    />
  );
};

CustomRating.propTypes = {
  initialRating: PropTypes.number,
  isReadOnly: PropTypes.bool,
  size: PropTypes.string
};

CustomRating.defaultProps = {
  initialRating: 0,
  isReadOnly: false,
};

export default CustomRating;
