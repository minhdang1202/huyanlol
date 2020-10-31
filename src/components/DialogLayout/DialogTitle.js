import React from "react";
import PropTypes from "prop-types";
import { makeStyles, DialogTitle as MuiDialogTitle, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";

const DialogTitle = ({ title, children, onClose, className }) => {
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={clsx(classes.root, className)}>
      <div>
        <Typography variant="h5">{title}</Typography>
        {onClose ? (
          <IconButton className={classes.closeButton} onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
      {children}
    </MuiDialogTitle>
  );
};

const useStyles = makeStyles(theme => ({
  closeButton: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(-1.5),
    [theme.breakpoints.down("xs")]: {
      marginRight: theme.spacing(1),
      color: theme.palette.text.primary,
    },
  },
  root: {
    boxShadow: `0px 1px 0px ${theme.palette.divider}`,
    "&>*:nth-child(1)": {
      width: "100%",
      margin: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
      },
    },
  },
}));

DialogTitle.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default DialogTitle;
