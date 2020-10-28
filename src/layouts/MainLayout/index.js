import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Hidden, makeStyles, NoSsr } from "@material-ui/core";
import { AppHead } from "../../components";
import { CustomAppBar, MobileAppDownload } from "./components";
import clsx from "clsx";

const MainLayout = ({ headProps, className, children, appBarTitle, isDetail }) => {
  const defaultClasses = useStyles();
  const primaryHead = headProps || {};
  const [isClose, setIsClose] = useState(false);

  const onClose = () => {
    setIsClose(true);
  };

  return (
    <>
      <AppHead {...primaryHead} />
      <NoSsr>
        <Box className={clsx(defaultClasses.root, className)}>
          <CustomAppBar isDetail={isDetail} appBarTitle={appBarTitle} />
          <main>{children}</main>
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
  isDetail: PropTypes.bool,
  appBarTitle: PropTypes.string,
};

MainLayout.defaultProps = {
  isDetail: false,
  headProps: {},
};

export default memo(MainLayout);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    background: theme.palette.background.default,
  },
}));
