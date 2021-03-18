import React, { memo } from "react";
import { makeStyles, Tabs, Tab } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { LangConstant } from "const";

const MobileTabBar = ({ selectedTab, onSelectedTab }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);

  return (
    <Tabs
      value={selectedTab}
      onChange={onSelectedTab}
      classes={{ root: classes.root, indicator: classes.indicator }}
    >
      <Tab
        classes={{ root: classes.tabRoot, selected: classes.selected }}
        label={getLabel("TXT_FAQ")}
      />
      <Tab
        classes={{ root: classes.tabRoot, selected: classes.selected }}
        label={getLabel("TXT_TERM_AND_PRIVACY")}
      />
    </Tabs>
  );
};

export default memo(MobileTabBar);

MobileTabBar.propTypes = {
  selectedTab: PropTypes.number,
  onSelectedTab: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white,
    borderBottom: "1px solid #f0f3f6"
  },
  indicator: {
    backgroundColor: theme.palette.primary.main
  },
  tabRoot: {
    flexGrow: 1,
    fontSize: "16px",
    fontWeight: 400,
    textTransform: "inherit",
    lineHeight: "20px",
    color: theme.palette.grey[500]
  },
  selected: {
    color: theme.palette.primary.main,
    fontWeight: 600
  }
}));
