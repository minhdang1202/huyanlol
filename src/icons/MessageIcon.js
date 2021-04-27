import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const MessageIcon = ({ width, height }) => {
  const SvgIconStyled = withStyles({ root: { width: width, height: height, fill: "#7B93A5" } })(SvgIcon);

  return (
    <SvgIconStyled width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.29646 18.1656C6.21914 18.2254 6.13125 18.25 6.04686 18.25C5.82889 18.25 5.62499 18.0777 5.62499 17.8281V14.875H2.24999C1.00899 14.875 0 13.866 0 12.625V2.50006C0 1.25905 1.00899 0.250061 2.24999 0.250061H15.75C16.991 0.250061 18 1.25905 18 2.50006V12.625C18 13.866 16.991 14.875 15.75 14.875H10.6875L6.29646 18.1656ZM7.31248 13.1875V15.2969L9.67498 13.525L10.125 13.1875H15.75C16.0593 13.1875 16.3125 12.9344 16.3125 12.625V2.50006C16.3125 2.19069 16.0593 1.93756 15.75 1.93756H2.24999C1.94063 1.93756 1.6875 2.19069 1.6875 2.50006V12.625C1.6875 12.9344 1.94063 13.1875 2.24999 13.1875H7.31248Z"
      />
    </SvgIconStyled>
  );
};

MessageIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
MessageIcon.defaultProps = {
  width: 18,
  height: 18,
};

export default memo(MessageIcon);
