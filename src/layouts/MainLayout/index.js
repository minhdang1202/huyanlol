import React, { memo } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, NoSsr } from "@material-ui/core";
import { AppHead } from "../../components";
import CustomAppBar from "./components/CustomAppBar";
import clsx from "clsx";

const MainLayout = ({ headProps, className, children }) => {
  const defaultClasses = useStyles();
  const primaryHead = headProps || {};

  return (
    <>
      <AppHead {...primaryHead} />
      <NoSsr>
        <Box className={clsx(defaultClasses.root, className)}>
          <CustomAppBar />
          {children}
        </Box>
      </NoSsr>
    </>
  );
};

MainLayout.propTypes = {
  headProps: PropTypes.object,
  className: PropTypes.string,
};

MainLayout.defaultProps = {
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
