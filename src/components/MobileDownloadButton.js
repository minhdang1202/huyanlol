import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Button, makeStyles } from "@material-ui/core";
import AppLink from "components/AppLink";
import { getAppDownloadLink } from "utils";

const MobileDownloadButton = ({ size, className, title, ...otherProps }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [appDownloadLink, setAppDownloadLink] = useState();

  useEffect(() => {
    const link = getAppDownloadLink();
    setAppDownloadLink(link);
  }, []);

  return (
    <Button
      size={size}
      variant="contained"
      className={clsx("light-blue-button", className, classes.root)}
      {...otherProps}
    >
      <AppLink target="_blank" as={appDownloadLink}>{title ? title : getLabel("TXT_APPDOWNLOAD_BUTTON")}</AppLink>
    </Button>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    "& a:hover": {
      textDecoration: "none",
    },
  },
}));

MobileDownloadButton.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};

MobileDownloadButton.defaultProps = {
  size: "medium",
};

export default MobileDownloadButton;
