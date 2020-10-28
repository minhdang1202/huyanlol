import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const AvatarIcon = ({ width, height }) => {
  const SvgIconStyled = withStyles({ root: { width: width, height: height } })(SvgIcon);

  return (
    <SvgIconStyled width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <circle xmlns="http://www.w3.org/2000/svg" cx="24" cy="24" r="24" fill="#E4F2FA" />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M24.25 22.5C28.0781 22.5 31.25 19.3828 31.25 15.5C31.25 11.6719 28.0781 8.5 24.25 8.5C20.3672 8.5 17.25 11.6719 17.25 15.5C17.25 19.3828 20.3672 22.5 24.25 22.5ZM29.1172 24.25H28.1875C26.9844 24.8516 25.6719 25.125 24.25 25.125C22.8281 25.125 21.4609 24.8516 20.2578 24.25H19.3281C15.2812 24.25 12 27.5859 12 31.6328V33.875C12 35.3516 13.1484 36.5 14.625 36.5H33.875C35.2969 36.5 36.5 35.3516 36.5 33.875V31.6328C36.5 27.5859 33.1641 24.25 29.1172 24.25Z"
        fill="#7B93A5"
      />
    </SvgIconStyled>
  );
};

AvatarIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
AvatarIcon.defaultProps = {
  width: 48,
  height: 48,
};

export default memo(AvatarIcon);
