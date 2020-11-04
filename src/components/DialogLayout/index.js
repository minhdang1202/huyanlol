import React from "react";
import PropTypes from "prop-types";
import { Dialog, useMediaQuery, useTheme, makeStyles } from "@material-ui/core";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppBar";

const DialogLayout = ({ children, className, ...otherProps }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  return (
    <Dialog
      open={false}
      fullScreen={isMobile}
      classes={{ root: classes.root, paper: className }}
      fullWidth
      maxWidth="sm"
      {...otherProps}
    >
      {children}
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
}));

DialogLayout.propTypes = {
  className: PropTypes.string,
};

export default DialogLayout;
