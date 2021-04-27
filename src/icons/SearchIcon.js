import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const SearchIcon = ({ width, height }) => {
  const SvgIconStyled = withStyles({ root: { width: width, height: height, fill: "#7B93A5" } })(SvgIcon);

  return (
    <SvgIconStyled width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M21.8281 20.9023L16.6289 15.7031C16.5 15.6172 16.3711 15.5312 16.2422 15.5312H15.6836C17.0156 13.9844 17.875 11.9219 17.875 9.6875C17.875 4.78906 13.8359 0.75 8.9375 0.75C3.99609 0.75 0 4.78906 0 9.6875C0 14.6289 3.99609 18.625 8.9375 18.625C11.1719 18.625 13.1914 17.8086 14.7812 16.4766V17.0352C14.7812 17.1641 14.8242 17.293 14.9102 17.4219L20.1094 22.6211C20.3242 22.8359 20.668 22.8359 20.8398 22.6211L21.8281 21.6328C22.043 21.4609 22.043 21.1172 21.8281 20.9023ZM8.9375 16.5625C5.11328 16.5625 2.0625 13.5117 2.0625 9.6875C2.0625 5.90625 5.11328 2.8125 8.9375 2.8125C12.7188 2.8125 15.8125 5.90625 15.8125 9.6875C15.8125 13.5117 12.7188 16.5625 8.9375 16.5625Z"
      />
    </SvgIconStyled>
  );
};

SearchIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
SearchIcon.defaultProps = {
  width: 22,
  height: 23,
};

export default memo(SearchIcon);
