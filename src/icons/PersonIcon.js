import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const PersonIcon = ({ width, height, ...otherProps }) => {
  const SvgIconStyled = withStyles({
    root: {
      width: width,
      height: height,
    },
  })(SvgIcon);

  return (
    <SvgIconStyled width={width} height={height} viewBox={`0 0 ${width} ${height}`} {...otherProps}>
      <circle cx="24" cy="24" r="23.5" stroke="#fff" />
      <path
        fill="#fff"
        d="M24.375 23.75c3.008 0 5.5-2.45 5.5-5.5 0-3.008-2.492-5.5-5.5-5.5-3.05 0-5.5 2.492-5.5 5.5 0 3.05 2.45 5.5 5.5 5.5zm3.824 1.375h-.73c-.946.473-1.977.688-3.094.688-1.117 0-2.191-.215-3.137-.688h-.73c-3.18 0-5.758 2.621-5.758 5.8v1.762c0 1.16.902 2.063 2.063 2.063h15.125c1.117 0 2.062-.902 2.062-2.063v-1.761c0-3.18-2.621-5.801-5.8-5.801z"
      />
    </SvgIconStyled>
  );
};

PersonIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
PersonIcon.defaultProps = {
  width: 48,
  height: 48,
};

export default memo(PersonIcon);
