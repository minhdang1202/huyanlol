import React, { memo } from "react";
import PropTypes from "prop-types";
const LogoIcon = ({ width, height }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 50 26">
      <path
        fill="#5AA4CC"
        fillRule="evenodd"
        d="M16 25.6l9.953-23.4h5.363L41.2 25.6c-5.058-.42-7.483-4.66-7.483-4.66H23.09C20.739 24.986 16 25.6 16 25.6zm8.818-9.01l3.758-9.222 3.928 9.222h-7.686zM20.737 12.338l-5.503 13.147s-8.814.993-13.098-6.573C-2.148 11.345 3.582-.177 13.672.422 18.648.778 21.4 3.655 21.4 3.655l-1.747 4.453S12.65 2.534 7.67 8.514c-4.538 7.142 2.209 12.762 6.356 12.762.224-.212 2.37-5.62 2.37-5.62h-2.723l1.561-3.318h5.504zM34 1.3h15.3v4.712h-5.764V24.7h-1.674l-3.669-8.786V6.012h-2.06L34 1.3z"
        clipRule="evenodd"
      />
    </svg>
  );
};
LogoIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
export default memo(LogoIcon);
