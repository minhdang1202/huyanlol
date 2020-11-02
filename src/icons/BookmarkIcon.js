import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const BookmarkIcon = ({ width, height, color, stroke }) => {
  const SvgIconStyled = withStyles({
    root: { width: width, height: height, fill: stroke ? "none" : color, stroke: stroke, overflow: "visible" },
  })(SvgIcon);

  return (
    <SvgIconStyled width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H20V27L10 18.2385L0 27V0Z"
      />
    </SvgIconStyled>
  );
};

BookmarkIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  stroke: PropTypes.string,
};
BookmarkIcon.defaultProps = {
  width: 20,
  height: 27,
  color: "#F0F3F6",
};

export default memo(BookmarkIcon);
