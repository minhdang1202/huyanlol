import React, { memo } from "react";
import PropTypes from "prop-types";
import { SvgIcon, withStyles } from "@material-ui/core";

const HeartIcon = ({ width, height, isActive, color }) => {
  let fill = color ? color : "none";
  fill = isActive ? "url(#paint0_linear)" : fill;
  let stroke = color ? "none" : "#7B93A5";
  stroke = isActive ? "none" : stroke;
  const SvgIconStyled = withStyles({
    root: {
      width: width,
      height: height,
      fill: fill,
      stroke: stroke,
      strokeWidth: stroke != "none" ? 2 : 0,
      overflow: "visible",
    },
  })(SvgIcon);

  return (
    <SvgIconStyled width={width} height={height} viewBox={"0 0 20 20"}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M10.8828 17.3711L18.4413 9.56643C20.6406 7.29692 20.5116 3.53911 18.0585 1.44534C15.9179 -0.378846 12.7343 -0.0507444 10.7695 1.97661L9.99997 2.76957L9.23043 1.97661C7.26949 -0.0507444 4.08201 -0.378846 1.9414 1.44534C-0.51171 3.53911 -0.640647 7.29692 1.55467 9.56643L9.11324 17.3711C9.60152 17.875 10.3945 17.875 10.8828 17.3711Z"
      />
      <defs xmlns="http://www.w3.org/2000/svg">
        <linearGradient
          id="paint0_linear"
          x1="4.9996"
          y1="0.248749"
          x2="4.9996"
          y2="8.99889"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA9393" />
          <stop offset="1" stopColor="#F45A5A" />
        </linearGradient>
      </defs>
    </SvgIconStyled>
  );
};

HeartIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  isActive: PropTypes.bool,
  color: PropTypes.string,
};
HeartIcon.defaultProps = {
  width: 21,
  height: 18,
  isActive: false,
};

export default memo(HeartIcon);
