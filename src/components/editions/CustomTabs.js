import React, { useState } from "react";
import { Tabs as MuiTabs, Tab as MuiTab, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const CustomTabs = ({ onChangeTab, tabs }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const onChange = (e, newSelectedTab) => {
    setSelectedTab(newSelectedTab);
    onChangeTab(newSelectedTab);
  };
  return (
    <Tabs variant="fullWidth" value={selectedTab} onChange={onChange}>
      {tabs.map((tab, index) => {
        const { icon, label, value } = tab;
        return <Tab key={index} icon={icon} label={label} value={value}></Tab>;
      })}
    </Tabs>
  );
};

const Tabs = withStyles(theme => ({
  root: {
    height: theme.spacing(6),
    background: theme.palette.white,
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    background: "transparent",
    "& > span": {
      width: "100%",
      background: theme.palette.primary.main,
    },
  },
}))(props => <MuiTabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const Tab = withStyles(theme => ({
  root: {
    fontWeight: "bold",
    fontSize: 14,
    height: theme.spacing(6),
  },
  labelIcon: {
    textTransform: "none",
    minHeight: "inherit",
    color: theme.palette.text.secondary,
  },
  selected: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "& > *:first-child": {
      marginBottom: "0 !important",
      paddingRight: theme.spacing(1),
    },
  },
}))(MuiTab);

CustomTabs.propTypes = {
  onChangeTab: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired,
};

export default CustomTabs;
