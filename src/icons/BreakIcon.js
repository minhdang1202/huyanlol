import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const BreakIcon = ({ width, height, ...otherProps }) => {
  const SvgIconStyled = withStyles({
    root: {
      width: width,
      height: height,
    },
  })(SvgIcon);

  return (
    <SvgIconStyled width={width} height={height} viewBox={`0 0 ${width} ${height}`} {...otherProps}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.875 1C1.875 0.447715 2.32272 0 2.875 0H17.125C17.6773 0 18.125 0.447715 18.125 1V1.5C18.125 2.05228 17.6773 2.5 17.125 2.5H2.875C2.32272 2.5 1.875 2.05228 1.875 1.5V1ZM1.875 17.25C1.875 16.6977 2.32272 16.25 2.875 16.25H17.125C17.6773 16.25 18.125 16.6977 18.125 17.25V17.75C18.125 18.3023 17.6773 18.75 17.125 18.75H2.875C2.32272 18.75 1.875 18.3023 1.875 17.75V17.25ZM1 8.75C0.447715 8.75 0 9.19771 0 9.75V10.25C0 10.8023 0.447715 11.25 1 11.25H1.5C2.05228 11.25 2.5 10.8023 2.5 10.25V9.75C2.5 9.19771 2.05228 8.75 1.5 8.75H1ZM8.75 9.75C8.75 9.19771 9.19771 8.75 9.75 8.75H10.25C10.8023 8.75 11.25 9.19771 11.25 9.75V10.25C11.25 10.8023 10.8023 11.25 10.25 11.25H9.75C9.19771 11.25 8.75 10.8023 8.75 10.25V9.75ZM18.5 8.75C17.9477 8.75 17.5 9.19771 17.5 9.75V10.25C17.5 10.8023 17.9477 11.25 18.5 11.25H19C19.5523 11.25 20 10.8023 20 10.25V9.75C20 9.19771 19.5523 8.75 19 8.75H18.5Z"
      />
    </SvgIconStyled>
  );
};

BreakIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
BreakIcon.defaultProps = {
  width: 20,
  height: 19,
};

export default memo(BreakIcon);
