import React from "react";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import { withStyles, makeStyles, Tabs, Tab as MuiTab, Divider } from "@material-ui/core";

const SettingTypeTabs = props => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  return (
    <Tabs className={classes.root} classes={{ indicator: classes.indicator }} {...props}>
      <Tab disableRipple label={getLabel("TXT_TYPE_THUMBNAIL")} value={AppConstant.THUMBNAIL_TYPE} />
      <Tab label="" icon={<Divider orientation="vertical" flexItem className={classes.divider} />} disabled />
      <Tab disableRipple label={getLabel("TXT_TYPE_COVER")} value={AppConstant.COVER_TYPE} />
    </Tabs>
  );
};

export default SettingTypeTabs;

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "fit-content",
  },
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
