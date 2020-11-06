import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "@material-ui/core";

const PersonIcon = props => {
  const { width, height, fill } = props;
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} viewBox="0 0 18 21">
      <path
        fill="#7B93A5"
        d="M12.227 11.75c-1.133 0-1.641.625-3.477.625-1.875 0-2.383-.625-3.516-.625C2.344 11.75 0 14.133 0 17.023v1.602C0 19.68.82 20.5 1.875 20.5h13.75c1.016 0 1.875-.82 1.875-1.875v-1.602c0-2.89-2.383-5.273-5.273-5.273zm4.023 6.875c0 .352-.313.625-.625.625H1.875c-.352 0-.625-.273-.625-.625v-1.602C1.25 14.797 3.008 13 5.234 13c.782 0 1.524.625 3.516.625 1.953 0 2.734-.625 3.477-.625 2.226 0 4.023 1.797 4.023 4.023v1.602zM8.75 10.5c2.734 0 5-2.227 5-5 0-2.734-2.266-5-5-5-2.773 0-5 2.266-5 5 0 2.773 2.227 5 5 5zm0-8.75c2.031 0 3.75 1.719 3.75 3.75 0 2.07-1.719 3.75-3.75 3.75C6.68 9.25 5 7.57 5 5.5c0-2.031 1.68-3.75 3.75-3.75z"
      />
    </SvgIcon>
  );
};

PersonIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};
PersonIcon.defaultProps = {
  width: 18,
  height: 21,
  fill: "#7B93A5",
};

export default memo(PersonIcon);
