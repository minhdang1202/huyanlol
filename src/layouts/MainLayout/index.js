import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Hidden, makeStyles, NoSsr } from "@material-ui/core";
import { AppHead } from "../../components";
import { CustomAppBar, MobileAppDownload } from "./components";
import clsx from "clsx";
import { HEIGHT_MOBILE_APP_DOWNLOAD } from "./components/MobileAppDownload";

const MainLayout = ({ headProps, className, children, appBarProps }) => {
  const primaryHead = headProps || {};
  const [isClose, setIsClose] = useState(false);
  const defaultClasses = useStyles({ isClose: isClose });

  const onClose = () => {
    setIsClose(true);
  };

  return (
    <>
      <AppHead {...primaryHead} />
      <NoSsr>
        <Box id={MAIN_LAYOUT_ID} className={clsx(defaultClasses.root, className)}>
          <CustomAppBar {...appBarProps} />
          <main className={defaultClasses.main}>{children}</main>
          {!isClose && (
            <Hidden smUp>
              <MobileAppDownload onClose={onClose} />
            </Hidden>
          )}
        </Box>
      </NoSsr>
    </>
  );
};

MainLayout.propTypes = {
  headProps: PropTypes.object,
  className: PropTypes.string,
  appBarProps: PropTypes.object,
};

MainLayout.defaultProps = {
  isDetail: false,
  headProps: {},
  appBarProps: {
    isDetail: false,
    appBarTitle: null,
    className: "",
    shareUrl: "",
  },
};

export const MAIN_LAYOUT_ID = "main-layout";

export default memo(MainLayout);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    background: theme.palette.background.default,
  },
  main: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: props => (props.isClose ? 0 : `calc(${HEIGHT_MOBILE_APP_DOWNLOAD} + 8px)`),
    },
  },
}));
