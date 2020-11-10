import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const BookIcon = ({ width, height, ...otherProps }) => {
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
        d="M33 28.219V13.78c0-.558-.473-1.031-1.031-1.031H17.875c-2.277 0-4.125 1.848-4.125 4.125v13.75c0 2.277 1.848 4.125 4.125 4.125h14.094c.558 0 1.031-.43 1.031-1.031v-.688c0-.3-.172-.601-.387-.773-.215-.688-.215-2.578 0-3.223.215-.172.387-.473.387-.816zm-13.75-9.711c0-.13.086-.258.258-.258h9.11c.128 0 .257.129.257.258v.86c0 .171-.129.257-.258.257h-9.11c-.171 0-.257-.086-.257-.258v-.86zm0 2.75c0-.13.086-.258.258-.258h9.11c.128 0 .257.129.257.258v.86c0 .171-.129.257-.258.257h-9.11c-.171 0-.257-.086-.257-.258v-.86zM30.121 32H17.875c-.773 0-1.375-.602-1.375-1.375 0-.73.602-1.375 1.375-1.375h12.246c-.086.773-.086 2.02 0 2.75z"
      />
    </SvgIconStyled>
  );
};

BookIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
BookIcon.defaultProps = {
  width: 48,
  height: 48,
};

export default memo(BookIcon);
