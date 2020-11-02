import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const InfoIcon = ({ width, height }) => {
  const SvgIconStyled = withStyles({ root: { width: width, height: height, fill: "#7B93A5", overflow: "visible" } })(
    SvgIcon,
  );

  return (
    <SvgIconStyled width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M7 0.96875C3.25391 0.96875 0.21875 4.03125 0.21875 7.75C0.21875 11.4961 3.25391 14.5312 7 14.5312C10.7188 14.5312 13.7812 11.4961 13.7812 7.75C13.7812 4.03125 10.7188 0.96875 7 0.96875ZM7 3.97656C7.62891 3.97656 8.14844 4.49609 8.14844 5.125C8.14844 5.78125 7.62891 6.27344 7 6.27344C6.34375 6.27344 5.85156 5.78125 5.85156 5.125C5.85156 4.49609 6.34375 3.97656 7 3.97656ZM8.53125 10.9219C8.53125 11.1133 8.36719 11.25 8.20312 11.25H5.79688C5.60547 11.25 5.46875 11.1133 5.46875 10.9219V10.2656C5.46875 10.1016 5.60547 9.9375 5.79688 9.9375H6.125V8.1875H5.79688C5.60547 8.1875 5.46875 8.05078 5.46875 7.85938V7.20312C5.46875 7.03906 5.60547 6.875 5.79688 6.875H7.54688C7.71094 6.875 7.875 7.03906 7.875 7.20312V9.9375H8.20312C8.36719 9.9375 8.53125 10.1016 8.53125 10.2656V10.9219Z"
      />
    </SvgIconStyled>
  );
};

InfoIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
InfoIcon.defaultProps = {
  width: 14,
  height: 14,
};

export default memo(InfoIcon);
