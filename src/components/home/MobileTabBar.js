import React, { memo } from "react";
import { Box, makeStyles, Tabs, Tab, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { hasLogged } from "utils/auth";
import clsx from "clsx";
const MobileTabBar = ({ screenValue, onChangeScreen }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  return (
    <Box className={classes.root}>
      <Tabs
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        value={screenValue}
        onChange={onChangeScreen}
        classes={{
          indicator: classes.indicator,
        }}
      >
        <Tab icon={<Box className="ic-home-lg" />} aria-label="phone" />
        <Tab icon={<Box className="ic-search-light" />} aria-label="favorite" />
        <Tab
          icon={
            hasLogged() ? (
              <Box className="ic-user-circle" />
            ) : (
              <Box className={clsx(classes.notAuthUser, "ic-user-circle")}>
                <Typography variant="caption">{getLabel("TXT_LOGIN")}</Typography>
              </Box>
            )
          }
          aria-label="person"
        />
      </Tabs>
    </Box>
  );
};

MobileTabBar.propTypes = {
  screenValue: PropTypes.number,
  onChangeScreen: PropTypes.func,
};
const useStyles = makeStyles(theme => ({
  root: {
    height: 56,
    width: "100vw",
    background: theme.palette.white,
    position: "absolute",
    left: 0,
    bottom: 0,
    zIndex: 3,
    "&>*:first-child": {
      height: "100%",
      "&>*:first-child": {
        height: "100%",
        "&>*:first-child": {
          height: "100%",
        },
      },
    },
    boxShadow: `0 1px 0 0 ${theme.palette.grey[100]}, 0 -1px 0 0 ${theme.palette.grey[100]}`,
  },
  indicator: {
    display: "none",
  },
  notAuthUser: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textTransform: "none !important",
    "&:before": {
      height: 32,
    },
  },
}));

export default memo(MobileTabBar);
