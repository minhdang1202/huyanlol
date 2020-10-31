import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogActions, useMediaQuery, useTheme, makeStyles } from "@material-ui/core";
import DialogTitle from "./DialogTitle";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppbar";

const DialogLayout = ({
  title,
  titleChildren,
  contentChildren,
  actionChildren,
  className,
  isOpen,
  titleStyles,
  onClose,
  image,
}) => {
  const theme = useTheme();
  const classes = useStyles({ hasAction: actionChildren ? true : false });
  return (
    <Dialog
      open={isOpen}
      fullScreen={useMediaQuery(theme.breakpoints.down("xs")) ? true : false}
      classes={{ root: classes.root, paper: className }}
      fullWidth
      maxWidth="sm"
    >
      {image}
      <DialogTitle title={title} className={titleStyles} onClose={onClose}>
        {titleChildren}
      </DialogTitle>
      <DialogActions className={classes.actions}>{actionChildren}</DialogActions>
      <DialogContent>{contentChildren}</DialogContent>
    </Dialog>
  );
};

export const PADDING_X_DIALOG = "24px";

const useStyles = makeStyles(theme => ({
  root: {
    height: `calc((100vh - ${HEIGHT_APP_BAR}) * 0.95)`,
    margin: "auto 0",
    [theme.breakpoints.down("xs")]: {
      height: "100vh",
    },
  },
  actions: {
    display: props => (props.hasAction ? "block" : "none"),
    boxShadow: `0px 1px 0px ${theme.palette.divider}`,
    paddingLeft: `${PADDING_X_DIALOG}`,
    paddingRight: `${PADDING_X_DIALOG}`,
  },
}));

DialogLayout.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  titleStyles: PropTypes.string,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};

DialogLayout.defaultProps = {
  isOpen: false,
};

export default DialogLayout;
