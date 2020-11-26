import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const ArrowRightIcon = ({ width, height, ...otherProps }) => {
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
        d="M14.9999 16.9644H8.40053C8.40053 16.9644 0.999878 16.3758 0.999878 10.4644C0.999878 4.55291 7.99988 3.96433 7.99988 3.96433H14.9999"
        stroke="#7B93A5"
        strokeWidth="2"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.645 0V8L18.645 3.94503L12.645 0Z"
        fill="#7B93A5"
      />
    </SvgIconStyled>
  );
};

ArrowRightIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
ArrowRightIcon.defaultProps = {
  width: 19,
  height: 18,
};

export default memo(ArrowRightIcon);
