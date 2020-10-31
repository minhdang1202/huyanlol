import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { HEIGHT_APP_BAR } from "./index";
import { CommonSelect } from "components";

const AppbarSelect = ({ searchFilter, onChangeSearchFilter }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const SELECT_LIST = [
    { value: "book", title: getLabel("TXT_APPBAR_BOOK") },
    { value: "author", title: getLabel("TXT_APPBAR_AUTHOR") },
    { value: "user", title: getLabel("TXT_APPBAR_USER") },
  ];

  return (
    <CommonSelect
      selectList={SELECT_LIST}
      initialValue={searchFilter}
      onChangeSelectedValue={onChangeSearchFilter}
      menuPaperStyles={classes.selectMenuPaper}
    />
  );
};

const useStyles = makeStyles(() => ({
  selectMenuPaper: {
    position: "fixed !important",
    top: `calc(${HEIGHT_APP_BAR} + 5px) !important`,
  },
}));

AppbarSelect.propTypes = {
  onChangeSearchFilter: PropTypes.func,
  searchFilter: PropTypes.string,
};

export default AppbarSelect;
