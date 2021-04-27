import React from "react";
import { makeStyles, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";

const LogoBox = ({ width, imgSrc, className }) => {
  const classes = useStyles({ width: width });
  return (
    <Avatar className={clsx(className, classes.root)} variant="square" src={imgSrc}>
      Logo
    </Avatar>
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
    "&>img": {
      objectFit: "contain",
      width: "100%",
      height: "100%",
    },
  },
}));

LogoBox.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imgSrc: PropTypes.string,
  className: PropTypes.string,
};

LogoBox.defaultProps = {
  width: 54,
  imgSrc: "/images/logo.png",
};

export default LogoBox;
