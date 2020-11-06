import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "@material-ui/core";

const DateIcon = props => {
  const { width, height, fill } = props;
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} viewBox="0 0 18 21">
      <path
        fill="#7B93A5"
        d="M15.625 3H13.75V.969c0-.235-.234-.469-.469-.469h-.312c-.274 0-.469.234-.469.469V3H5V.969C5 .734 4.766.5 4.531.5H4.22c-.274 0-.469.234-.469.469V3H1.875C.82 3 0 3.86 0 4.875v13.75C0 19.68.82 20.5 1.875 20.5h13.75c1.016 0 1.875-.82 1.875-1.875V4.875C17.5 3.859 16.64 3 15.625 3zM1.875 4.25h13.75c.313 0 .625.313.625.625V6.75h-15V4.875c0-.313.273-.625.625-.625zm13.75 15H1.875c-.352 0-.625-.273-.625-.625V8h15v10.625c0 .352-.313.625-.625.625z"
      />
    </SvgIcon>
  );
};

DateIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};
DateIcon.defaultProps = {
  width: 18,
  height: 21,
  fill: "#7B93A5",
};

export default memo(DateIcon);
