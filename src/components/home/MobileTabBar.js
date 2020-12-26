import React, { memo } from "react";
import { Box, makeStyles, Tabs, Tab } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
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
        <Tab icon={<Box className="ic-user-circle" />} aria-label="person" />
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
  },
  indicator: {
    display: "none",
  },
}));

export default memo(MobileTabBar);
