import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const ArrowLeftIcon = ({ width, height, ...otherProps }) => {
  const SvgIconStyled = withStyles({
    root: {
      width: width,
      height: height,
      fill: "transparent",
    },
  })(SvgIcon);

  return (
    <SvgIconStyled width={width} height={height} viewBox={`0 0 ${width} ${height}`} {...otherProps}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M3.64514 16.9644H10.2445C10.2445 16.9644 17.6451 16.3758 17.6451 10.4644C17.6451 4.55291 10.6451 3.96433 10.6451 3.96433H3.64514"
        stroke="#7B93A5"
        strokeWidth="2"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0V8L0 3.94503L6 0Z"
        fill="#7B93A5"
      />
    </SvgIconStyled>
  );
};

ArrowLeftIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
ArrowLeftIcon.defaultProps = {
  width: 19,
  height: 18,
};

export default memo(ArrowLeftIcon);
