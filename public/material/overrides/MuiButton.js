const smallSize = 24;
const mediumSize = 43;
const largeSize = 50;
const smallBorderRadius = 47;
const mediumBorderRadius = 55;
const largeBorderRadius = 63;

const smallStyle = {
  paddingLeft: smallSize,
  paddingRight: smallSize,
  minHeight: smallSize,
  borderRadius: smallBorderRadius,
};
const mediumStyle = {
  paddingLeft: mediumSize,
  paddingRight: mediumSize,
  minHeight: mediumSize,
  borderRadius: mediumBorderRadius,
};
const largeStyle = {
  paddingLeft: largeSize,
  paddingRight: largeSize,
  minHeight: largeSize,
  borderRadius: largeBorderRadius,
};
const textSizeSmall = { fontSize: "14px", letterSpacing: "0.77px" };
const textSizeMedium = { fontSize: 16 };
const textSizeLarge = { fontSize: "18px" };

export default {
  root: {
    textTransform: "none",
  },
  contained: {
    boxShadow: "none",
    borderRadius: "20px",
    "&:hover": {
      boxShadow: "none !important",
    },
    "&:focus": {
      boxShadow: "none",
    },
    ...mediumStyle,
    ...textSizeMedium,
  },
  outlined: {
    borderRadius: "20px",
    ...mediumStyle,
    ...textSizeMedium,
  },
  text: {
    padding: "8px !important",
    borderRadius: "6px !important",
    lineHeight: "normal",
    ...textSizeMedium,
  },
  textSizeSmall: textSizeSmall,
  textSizeLarge: textSizeLarge,
  sizeSmall: { ...smallStyle, ...textSizeSmall },
  sizeLarge: { ...largeStyle, ...textSizeLarge },
};
