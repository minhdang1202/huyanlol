import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Hidden, makeStyles, NoSsr } from "@material-ui/core";
import { AppHead } from "../../components";
import clsx from "clsx";
import MobileAppDownload, { HEIGHT_MOBILE_APP_DOWNLOAD } from "./components/MobileAppDownload";
import CustomAppBar, { HEIGHT_APP_BAR } from "./components/CustomAppBar";

const MainLayout = ({ headProps, className, classes, children, appBarProps, isChallengeDetail }) => {
  const primaryHead = headProps || {};
  const [isClose, setIsClose] = useState(false);
  const defaultClasses = useStyles({ isClose: isClose, isChallengeDetail });

  const onClose = () => {
    setIsClose(true);
  };

  return (
    <>
      <AppHead {...primaryHead} />
      <NoSsr>
        <Box id={MAIN_LAYOUT_ID} className={clsx(defaultClasses.root, className)}>
          <CustomAppBar {...appBarProps} />
          <main className={clsx(defaultClasses.main, classes.main)}>{children}</main>
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
  classes: PropTypes.object,
  isChallengeDetail: PropTypes.bool,
};

MainLayout.defaultProps = {
  isDetail: false,
  headProps: {},
  appBarProps: {
    isDetail: false,
    appBarTitle: null,
    className: "",
    shareUrl: "",
    hasBookmark: false,
  },
  classes: {},
};

export const MAIN_LAYOUT_ID = "main-layout";

export default memo(MainLayout);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    background: theme.palette.background.default,
    paddingTop: HEIGHT_APP_BAR,
  },
  main: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: ({ isClose, isChallengeDetail }) =>
        isClose || isChallengeDetail ? 0 : `calc(${HEIGHT_MOBILE_APP_DOWNLOAD} + 8px)`,
    },
  },
}));
