import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs as MuiTabs, Tab as MuiTab, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { LangConstant } from "const";
import { InfoIcon, CartIcon } from "icons";

const CustomTabs = ({ onChangeTab }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const [selectedTab, setSelectedTab] = useState("info");
  const onChange = (e, newSelectedTab) => {
    setSelectedTab(newSelectedTab);
    onChangeTab(newSelectedTab);
  };
  return (
    <Tabs variant="fullWidth" value={selectedTab} onChange={onChange}>
      <Tab icon={<InfoIcon />} label={getLabel("TXT_BOOKDETAIL_BOOK_INFO")} value="info"></Tab>
      <Tab icon={<CartIcon />} label={getLabel("TXT_BOOKDETAIL_BUY_BOOK")} value="cart"></Tab>
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
    color: theme.palette.text.secondary,
    minHeight: "inherit",
  },
  selected: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    "& path": {
      fill: `${theme.palette.primary.main} !important`,
    },
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "& > svg": {
      marginRight: theme.spacing(0.7),
      marginBottom: "1px !important",
    },
  },
}))(MuiTab);

CustomTabs.propTypes = {
  onChangeTab: PropTypes.func.isRequired,
};

export default CustomTabs;
