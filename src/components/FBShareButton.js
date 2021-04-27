import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Button, Box, makeStyles } from "@material-ui/core";
import { FacebookShareButton } from "react-share";

const FBShareButton = ({ size, className, ...otherProps }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  return (
    <FacebookShareButton resetButtonStyle={false} className={clsx(classes.root, className)} {...otherProps}>
      <Button
        size={size ? size : "medium"}
        component="div"
        startIcon={<Box className={clsx("ic-share", "grey-text")} />}
      >
        {getLabel("TXT_SHARE")}
      </Button>
    </FacebookShareButton>
  );
};

FBShareButton.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "fit-content",
    height: "fit-content",
    border: "none",
    background: "none",
    "& span": {
      color: theme.palette.text.secondary,
    },
  },
}));

export default FBShareButton;
