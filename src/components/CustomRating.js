import React from "react";
import { useTheme, Box } from "@material-ui/core";
import MuiRating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";

const CustomRating = ({ size, ...otherProps }) => {
  const theme = useTheme();
  return (
    <MuiRating
      name="Rating"
      icon={<Box className="ic-star" />}
      size={size ? size : "medium"}
      style={{ marginRight: theme.spacing(1) }}
      {...otherProps}
    />
  );
};

CustomRating.propTypes = {
  size: PropTypes.string,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
};

export default CustomRating;
