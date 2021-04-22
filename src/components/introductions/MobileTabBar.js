import React, { memo } from "react";
import { makeStyles, Tabs, Tab } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { LangConstant } from "const";

const MobileTabBar = ({ selectedTab, onSelectTab }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);

  return (
    <Tabs
      value={selectedTab}
      onChange={onSelectTab}
      classes={{ root: classes.root, indicator: classes.indicator }}
    >
      <Tab
        className="regular-lg-txt"
        classes={{ root: classes.tabRoot, selected: classes.selected }}
        label={getLabel("TXT_FAQ")}
      />
      <Tab
        className="regular-lg-txt"
        classes={{ root: classes.tabRoot, selected: classes.selected }}
        label={getLabel("TXT_TERMS_AND_PRIVACY")}
      />
    </Tabs>
  );
};

export default memo(MobileTabBar);

MobileTabBar.propTypes = {
  selectedTab: PropTypes.number,
  onSelectTab: PropTypes.func,
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
