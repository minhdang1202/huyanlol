import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Paper, makeStyles, Tab, Tabs } from "@material-ui/core";
import { LangConstant } from "const";

const TabBar = ({ selectedTab, onSelectedTab }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);

  return (
    <Paper className={classes.root}>
      <Tabs
        orientation="vertical"
        value={selectedTab}
        onChange={onSelectedTab}
        classes={{ indicator: classes.indicator, flexContainer: classes.flexContainer }}
      >
        <Tab
          classes={{
            root: classes.tabRoot,
            wrapper: classes.wrapper,
            selected: classes.selected,
          }}
          label={getLabel("TXT_FAQ")}
        />
        <Tab
          classes={{
            root: classes.tabRoot,
            wrapper: classes.wrapper,
            selected: classes.selected,
          }}
          label={getLabel("TXT_TERM_AND_PRIVACY")}
        />
      </Tabs>
    </Paper>
  );
};

export default TabBar;

TabBar.propTypes = {
  selectedTab: PropTypes.number,
  onSelectedTab: PropTypes.func,
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
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.5px",
    fontWeight: 600,
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
