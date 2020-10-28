import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const LogoBox = ({ width, imgSrc }) => {
  const classes = useStyles({ width: width });
  return (
    <div className={classes.root}>
      <img src={imgSrc} />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: props => props.width,
    height: props => props.width,
    minHeight: props => props.width,
    minWidth: props => props.width,
    padding: theme.spacing(0.75),
    background: theme.palette.white,
    borderRadius: 7,
    border: `1px solid ${theme.palette.primary.main}`,
    "& img": {
      objectFit: "contain",
      width: "100%",
      height: "100%",
    },
  },
}));

LogoBox.propTypes = {
  width: PropTypes.number,
  imgSrc: PropTypes.string,
};

LogoBox.defaultProps = {
  width: 54,
  imgSrc: "images/logo.png",
};

export default LogoBox;
