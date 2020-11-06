import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "@material-ui/core";

const GoalIcon = props => {
  const { width, height, fill } = props;
  return (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} viewBox="0 0 19 18">
      <path
        fill="#F66262"
        d="M9.508 8.723l-7.559 2.144c-.527.14-.562.88-.07 1.125l2.39 1.16-3.128 3.13c-.211.21-.211.562 0 .773l.773.773c.211.211.563.211.774 0L5.816 14.7l1.16 2.39c.247.493.985.458 1.126-.07l2.144-7.558c.14-.457-.281-.844-.738-.738zm.949 4.113l-.492 1.758c2.812-.14 5.098-2.461 5.098-5.344 0-2.953-2.391-5.344-5.344-5.344-2.883 0-5.203 2.285-5.344 5.098l1.758-.492c.351-1.653 1.828-2.918 3.586-2.918 2.004 0 3.656 1.652 3.656 3.656 0 1.758-1.266 3.234-2.918 3.586zM9.719.53C4.902.531 1 4.47 1 9.25c0 .281 0 .527.035.773.106-.07.246-.14.387-.175l1.266-.352V9.25c0-3.867 3.128-7.031 7.03-7.031 3.868 0 7.032 3.164 7.032 7.031 0 3.902-3.164 7.031-7.031 7.031h-.246l-.352 1.266c-.035.14-.105.281-.176.387.246.035.492.035.774.035 4.781 0 8.719-3.903 8.719-8.719 0-4.781-3.938-8.719-8.72-8.719z"
      />
    </SvgIcon>
  );
};

GoalIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};
GoalIcon.defaultProps = {
  width: 19,
  height: 18,
  fill: "#F66262",
};

export default memo(GoalIcon);
