import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const CartIcon = ({ width, height, color }) => {
  const SvgIconStyled = withStyles({ root: { width: width, height: height, fill: color, overflow: "visible" } })(SvgIcon);

  return (
    <SvgIconStyled width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M14.4375 9.00781L15.7227 3.32031C15.8047 2.91016 15.5039 2.5 15.0664 2.5H4.34766L4.10156 1.29688C4.01953 0.996094 3.74609 0.75 3.44531 0.75H0.65625C0.273438 0.75 0 1.05078 0 1.40625V1.84375C0 2.22656 0.273438 2.5 0.65625 2.5H2.54297L4.48438 11.9062C4.01953 12.1797 3.71875 12.6719 3.71875 13.2188C3.71875 14.0664 4.40234 14.75 5.25 14.75C6.07031 14.75 6.78125 14.0664 6.78125 13.2188C6.78125 12.8086 6.58984 12.4258 6.31641 12.125H12.0312C11.7578 12.4258 11.5938 12.8086 11.5938 13.2188C11.5938 14.0664 12.2773 14.75 13.125 14.75C13.9453 14.75 14.6562 14.0664 14.6562 13.2188C14.6562 12.6172 14.3008 12.0977 13.7812 11.8516L13.918 11.1953C14.0273 10.7852 13.6992 10.375 13.2891 10.375H5.96094L5.76953 9.5H13.7812C14.082 9.5 14.3555 9.30859 14.4375 9.00781Z"
      />
    </SvgIconStyled>
  );
};

CartIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};
CartIcon.defaultProps = {
  width: 16,
  height: 14,
  color: "#7B93A5",
};

export default memo(CartIcon);
