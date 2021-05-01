import React from "react";
import PropTypes from "prop-types";
import { Paper, makeStyles, Tab, Tabs } from "@material-ui/core";
import clsx from "clsx";

const TabBar = ({ selectedTab, onSelectTab, tabList }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Tabs
        orientation="vertical"
        value={selectedTab}
        onChange={onSelectTab}
        classes={{ indicator: classes.indicator }}
      >
        {tabList.map((tabItem, index) => 
          <Tab
            key={`tab-${index}`}
            classes={{
              root: clsx("semiBold-lg-txt", classes.tabRoot),
              wrapper: classes.wrapper,
              selected: classes.selected,
            }}
            label={tabItem}
          />
        )}
      </Tabs>
    </Paper>
  );
};

export default TabBar;

TabBar.propTypes = {
  selectedTab: PropTypes.number,
  onSelectTab: PropTypes.func,
  tabList: PropTypes.array
};

const useStyles = makeStyles(theme => ({
  root: {
    height: 144,
    padding: theme.spacing(1, 1.5),
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    borderRadius: 10,
    [theme.breakpoints.down("xs")]: {
      borderRadius: 0,
      paddingRight: 0,
    },
  },
  indicator: {
    display: "none",
  },
  tabRoot: {
    color: theme.palette.text.secondary,
    textTransform: "inherit",
    paddingTop: 0,
    paddingBottom: 0,
    width: "100%",
    opacity: 1,
    textAlign: "start",
  },
  wrapper: {
    alignItems: "start",
  },
  selected: {
    color: theme.palette.success.contrastText,
  },
}));
