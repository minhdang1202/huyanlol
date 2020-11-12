import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "@material-ui/core";

const DotIcon = ({ width, height }) => {
  return (
    <SvgIcon width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </SvgIcon>
  );
};

DotIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
DotIcon.defaultProps = {
  width: 24,
  height: 24,
};

export default memo(DotIcon);
