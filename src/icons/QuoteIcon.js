import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const QuoteIcon = ({ width, height, ...otherProps }) => {
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
        d="M8.72725 0L11 2.18981C11 2.18981 8.72725 4.60872 7.56245 6.67336C6.5457 8.55053 5.87648 10.7167 7.56245 12.2709C9.24842 13.8251 9.30449 16.4506 8.72725 18.0891C8.15002 19.7276 2.19862 22.2338 0.0191349 16.0096C-0.408494 6.65719 8.72725 0 8.72725 0ZM21.7273 0L24 2.18981C24 2.18981 21.7273 4.60872 20.5624 6.67336C19.5457 8.55053 18.8765 10.7167 20.5624 12.2709C22.2484 13.8251 22.3045 16.4506 21.7273 18.0891C21.15 19.7276 15.1986 22.2338 13.0191 16.0096C12.5915 6.65719 21.7273 0 21.7273 0Z"
      />
    </SvgIconStyled>
  );
};

QuoteIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
QuoteIcon.defaultProps = {
  width: 24,
  height: 20,
};

export default memo(QuoteIcon);
