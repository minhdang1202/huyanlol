import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Divider, Box, Button, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import FBShareButton from "../FBShareButton";

const FooterButtons = ({ shareUrl, onOpenDownload }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  return (
    <>
      <Divider className={classes.divider} />
      <Box display="flex" justifyContent="space-between">
        <Button startIcon={<Box className={clsx("ic-heart-empty", "grey-text")} />} onClick={e => onOpenDownload(e)}>
          {getLabel("TXT_LOVE")}
        </Button>
        <Button startIcon={<Box className={clsx("ic-comment", "grey-text")} />} onClick={e => onOpenDownload(e)}>
          {getLabel("TXT_COMMENT")}
        </Button>
        <FBShareButton url={shareUrl} />
      </Box>
    </>
  );
};

const PAPER_DEFAULT_PADDING_X = "24px";

FooterButtons.propTypes = {
  shareUrl: PropTypes.string,
  onOpenDownload: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  divider: {
    width: `calc(100% + ${PAPER_DEFAULT_PADDING_X} * 2)`,
    marginLeft: `calc(${PAPER_DEFAULT_PADDING_X} * -1)`,
    marginBottom: `${theme.spacing(1)}px !important`,
    [theme.breakpoints.down("xs")]: {
      marginBottom: `${theme.spacing(0.5)}px !important`,
    },
  },
}));

export default FooterButtons;
