import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { makeStyles, DialogContent } from "@material-ui/core";
import Dialog from "components/DialogLayout";
import DialogTitle from "components/DialogLayout/DialogTitle";
import AppDownloadContent from "./AppDownloadContent";
import AppDownloadImage from "./AppDownloadImage";

const DialogAppDownload = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  return (
    <Dialog open={isOpen} className={classes.root}>
      <AppDownloadImage />
      <DialogTitle title={getLabel("TXT_APPDOWNLOAD_TITLE")} onClose={() => onClose()} className={classes.title} />
      <DialogContent>
        <AppDownloadContent />
      </DialogContent>
    </Dialog>
  );
};

export const TOP_DIALOG = "28vh";
const WIDTH_DIALOG = "615px";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: "url(/images/img-download-theme.svg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    boxShadow: "none",
    [theme.breakpoints.up("md")]: {
      width: WIDTH_DIALOG,
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: WIDTH_DIALOG,
      bottom: -30,
    },
    [theme.breakpoints.up("sm")]: {
      position: "fixed",
      top: TOP_DIALOG,
      overflow: "visible",
      height: "fit-content",
    },
  },
  title: {
    color: theme.palette.white,
    boxShadow: "none",
    "& svg": {
      fill: `${theme.palette.white} !important`,
    },
    "& button": {
      marginLeft: 0,
    },
    [theme.breakpoints.up("sm")]: {
      "& h5": {
        display: "none",
      },
      "& button": {
        marginLeft: "auto",
      },
    },
  },
}));

DialogAppDownload.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DialogAppDownload;
