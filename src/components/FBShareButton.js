import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Button, Box, makeStyles } from "@material-ui/core";
import { FacebookShareButton } from "react-share";

const FBShareButton = ({ shareUrl, size, className }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  return (
    <FacebookShareButton resetButtonStyle={false} url={shareUrl} className={clsx(classes.root, className)}>
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
  shareUrl: PropTypes.string,
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
