import React, { memo } from "react";
import { makeStyles, Tabs, Tab } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";

const MobileTabBar = ({ selectedTab, onSelectTab, tabList }) => {
  const classes = useStyles();

  return (
    <Tabs
      value={selectedTab}
      onChange={onSelectTab}
      classes={{ root: classes.root, indicator: classes.indicator }}
    >
      {tabList.map((tabItem, index) => 
        <Tab
          key={`tab-${index}`}
          classes={{
            root: clsx("regular-lg-txt", classes.tabRoot),
            wrapper: classes.wrapper,
            selected: classes.selected,
          }}
          label={tabItem}
        />
      )}
    </Tabs>
  );
};

export default memo(MobileTabBar);

MobileTabBar.propTypes = {
  selectedTab: PropTypes.number,
  onSelectTab: PropTypes.func,
  tabList: PropTypes.array
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white,
    borderBottom: `1px solid ${theme.palette.grey[100]}`
  },
  indicator: {
    backgroundColor: theme.palette.primary.main
  },
  tabRoot: {
    flexGrow: 1,
    textTransform: "inherit",
    color: theme.palette.grey[500]
  },
  selected: {
    color: theme.palette.primary.main,
    fontWeight: 600
  }
}));
