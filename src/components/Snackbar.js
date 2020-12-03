import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Snackbar as MuiSnackbar, SnackbarContent, Box, Slide, Typography, makeStyles } from "@material-ui/core";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppBar";
import { AppConstant } from "const";

const Snackbar = ({ error, className, message, open, ...otherProps }) => {
  const classes = useStyles({ error });
  const [isOpen, setIsOpen] = useState(open);

  return (
    <MuiSnackbar
      open={isOpen}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={AppConstant.SNACKBAR_DURATION}
      TransitionComponent={SlideTransition}
      className={clsx(classes.root, className)}
      onClose={() => setIsOpen(false)}
      {...otherProps}
    >
      <SnackbarContent
        className={classes.content}
        message={
          <>
            <Box className={clsx(error ? "ic-times-circle" : "ic-check-circle", "mr-16")} fontSize={28} />
            <Typography variant="subtitle1">{message}</Typography>
          </>
        }
      />
    </MuiSnackbar>
  );
};

Snackbar.propTypes = {
  error: PropTypes.bool,
  className: PropTypes.string,
  message: PropTypes.string,
  open: PropTypes.bool,
};

const SlideTransition = forwardRef((props, ref) => {
  return <Slide ref={ref} {...props} direction="down" />;
});

SlideTransition.displayName = "SlideTranslation";

export default Snackbar;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2.5, 3),
    color: ({ error }) => (error ? theme.palette.error.main : theme.palette.success.dark),
    background: ({ error }) => (error ? theme.palette.error[100] : theme.palette.success[100]),
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
    borderRadius: 8,
    minWidth: 400,
    maxWidth: "70%",
    marginTop: `calc(${HEIGHT_APP_BAR} - ${theme.spacing(1)}px)`,
  },
  content: {
    padding: 0,
    alignItems: "center",
    background: "inherit",
    boxShadow: "none",
    color: "inherit",
    width: "100%",
    height: "fit-content",
    "& *": {
      padding: 0,
      display: "flex",
      alignItems: "center",
    },
  },
}));
