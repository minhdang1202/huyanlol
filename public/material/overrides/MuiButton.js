const smallSize = 30;
const mediumSize = 40;
const largeSize = 50;

const smallStyle = { paddingLeft: smallSize, paddingRight: smallSize, minHeight: smallSize };
const mediumStyle = { paddingLeft: mediumSize, paddingRight: mediumSize, minHeight: mediumSize };
const largeStyle = { paddingLeft: largeSize, paddingRight: largeSize, minHeight: largeSize, borderRadius: "28px" };
const textSizeSmall = { fontSize: "10px", letterSpacing: "0.77px" };
const textSizeLarge = { fontSize: "16px" };

export default {
  contained: {
    boxShadow: "none",
    borderRadius: "20px",
    ...mediumStyle,
  },
  outlined: {
    borderRadius: "20px",
    ...mediumStyle,
  },
  textSizeSmall: textSizeSmall,
  textSizeLarge: textSizeLarge,
  sizeSmall: { ...smallStyle, ...textSizeSmall },
  sizeLarge: { ...largeStyle, ...textSizeLarge },
};
