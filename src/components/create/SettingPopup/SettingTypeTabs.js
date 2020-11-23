import React from "react";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { withStyles, makeStyles, Tabs, Tab as MuiTab, Divider } from "@material-ui/core";

const SettingTypeTabs = props => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
  return (
    <Tabs classes={{ indicator: classes.indicator }} {...props}>
      <Tab disableRipple label={getLabel("TXT_TYPE_1")} />
      <Tab label="" icon={<Divider orientation="vertical" flexItem className={classes.divider} />} disabled />
      <Tab disableRipple label={getLabel("TXT_TYPE_2")} />
    </Tabs>
  );
};

export default SettingTypeTabs;

const useStyles = makeStyles(theme => ({
  indicator: {
    display: "none",
  },
  divider: {
    width: 2,
    background: theme.palette.primary.main,
    height: 15,
    margin: theme.spacing(0, 1.5),
  },
}));

const Tab = withStyles(theme => ({
  root: {
    textTransform: "none",
    fontSize: 16,
    minHeight: "fit-content",
    minWidth: "fit-content",
    padding: 0,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  selected: {
    color: theme.palette.primary.main,
  },
}))(MuiTab);
