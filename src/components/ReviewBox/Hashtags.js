import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

const Hashtags = () => {
  return (
    <>
      <Typography variant="body2"></Typography>
    </>
  );
};

Hashtags.propTypes = {
  hashtags: PropTypes.array,
  category: PropTypes.string,
};

export default Hashtags;
