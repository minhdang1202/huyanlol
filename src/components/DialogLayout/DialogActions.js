import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { DialogActions as MuiDialogActions, makeStyles } from "@material-ui/core";
import { PADDING_X_DIALOG } from "components/DialogLayout";

const DialogActions = ({ children, className }) => {
  const classes = useStyles();
  return <MuiDialogActions className={clsx(classes.root, className)}>{children}</MuiDialogActions>;
};

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: `0px 1px 0px ${theme.palette.divider}`,
    paddingLeft: `${PADDING_X_DIALOG}`,
    paddingRight: `${PADDING_X_DIALOG}`,
    marginRight: "auto",
  },
}));

DialogActions.propTypes = {
  className: PropTypes.string,
};

export default DialogActions;
