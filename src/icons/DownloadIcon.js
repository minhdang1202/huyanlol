import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const DownloadIcon = ({ width, height }) => {
  const SvgIconStyled = withStyles({ root: { width: width, height: height, fill: "#5AA4CC" } })(SvgIcon);

  return (
    <SvgIconStyled width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M17.2812 6.09375C17.4062 5.75 17.5 5.40625 17.5 5C17.5 3.34375 16.1562 2 14.5 2C13.875 2 13.2812 2.1875 12.8125 2.53125C11.9688 1.03125 10.3438 0 8.5 0C5.71875 0 3.5 2.25 3.5 5C3.5 5.09375 3.5 5.1875 3.5 5.28125C1.75 5.875 0.5 7.5625 0.5 9.5C0.5 12 2.5 14 5 14H16.5C18.6875 14 20.5 12.2188 20.5 10C20.5 8.09375 19.125 6.46875 17.2812 6.09375ZM13.125 8.875L9.84375 12.1562C9.65625 12.3438 9.3125 12.3438 9.125 12.1562L5.84375 8.875C5.53125 8.5625 5.75 8 6.1875 8H8.25V4.5C8.25 4.25 8.46875 4 8.75 4H10.25C10.5 4 10.75 4.25 10.75 4.5V8H12.7812C13.2188 8 13.4375 8.5625 13.125 8.875Z"
      />
    </SvgIconStyled>
  );
};

DownloadIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
DownloadIcon.defaultProps = {
  width: 20,
  height: 16,
};

export default memo(DownloadIcon);
