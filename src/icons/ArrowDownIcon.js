import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const ArrowDownIcon = ({ width, height, color, ...otherProps }) => {
  const SvgIconStyled = withStyles({
    root: { width: width, height: height, fill: color },
  })(props => <SvgIcon {...props} {...otherProps} />);

  return (
    <SvgIconStyled width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M13.7812 1.25L13.1875 0.625C13.0312 0.46875 12.7812 0.46875 12.6562 0.625L7 6.28125L1.3125 0.625C1.1875 0.46875 0.9375 0.46875 0.78125 0.625L0.1875 1.25C0.03125 1.375 0.03125 1.625 0.1875 1.78125L6.71875 8.3125C6.875 8.46875 7.09375 8.46875 7.25 8.3125L13.7812 1.78125C13.9375 1.625 13.9375 1.375 13.7812 1.25Z"
      />
    </SvgIconStyled>
  );
};

ArrowDownIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};
ArrowDownIcon.defaultProps = {
  width: 14,
  height: 8,
  color: "#7B93A5",
};

export default memo(ArrowDownIcon);
