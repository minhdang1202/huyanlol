import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { makeStyles, IconButton, Typography, Box } from "@material-ui/core";
import { LogoBox, MobileDownloadButton } from "components";

const MobileAppDownload = ({ onClose }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  return (
    <Box className={classes.root}>
      <IconButton classes={{ label: classes.icon }} onClick={() => onClose()}>
        <CloseIcon />
      </IconButton>
      <LogoBox />
      <Box className={classes.typography}>
        <Typography variant="subtitle2">{getLabel("TXT_APPDOWNLOAD_TITLE")}</Typography>
        <Typography variant="caption">{getLabel("TXT_APPDOWNLOAD_SUBTITLE")}</Typography>
      </Box>
      <MobileDownloadButton size="small" />
    </Box>
  );
};

export const HEIGHT_MOBILE_APP_DOWNLOAD = "80px";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    width: "100%",
    padding: theme.spacing(1.5, 2, 1.5, 0.5),
    height: HEIGHT_MOBILE_APP_DOWNLOAD,
    background: theme.palette.white,
    "& > *:nth-child(1)": {
      height: "fit-content",
      width: "fit-content",
      marginRight: theme.spacing(0.5),
      "& svg": {
        width: 20,
        height: 20,
      },
    },
    "&>*:last-child": {
      textTransform: "uppercase",
      height: 29,
      marginLeft: "auto",
      minWidth: 96,
      padding: theme.spacing(1, 1.5),
      fontSize: 12,
      fontWeight: 700,
    },
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  typography: {
    marginLeft: theme.spacing(1.5),
    "& > *:nth-child(1)": {
      marginBottom: theme.spacing(0.5),
      lineHeight: "normal",
    },
  },
}));

MobileAppDownload.propTypes = {
  onClose: PropTypes.func,
};

export default MobileAppDownload;
