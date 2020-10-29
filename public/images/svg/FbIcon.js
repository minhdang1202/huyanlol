import React from "react";
import PropTypes from "prop-types";

function FbIcon(props) {
  const { width, height, fill, onClick } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 16"
      fill={fill ? fill : "#fff"}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M7.094 2.656h1.531V.125C8.344.094 7.469 0 6.406 0 4.25 0 2.75 1.344 2.75 3.781V6H.375v2.844H2.75V16h2.938V8.844H8L8.375 6H5.687V4.062c0-.843.25-1.406 1.407-1.406z" />
    </svg>
  );
}

FbIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  onClick: PropTypes.func,
};

export default FbIcon;
