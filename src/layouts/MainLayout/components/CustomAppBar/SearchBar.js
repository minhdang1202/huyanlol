import React, { useState } from "react";
import { Box, InputBase, Divider, FormControl, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import CommonSelect from "components/CommonSelect";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppBar";

const SearchBar = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const SELECT_LIST = [
    { value: "book", title: getLabel("TXT_APPBAR_BOOK") },
    { value: "author", title: getLabel("TXT_APPBAR_AUTHOR") },
    { value: "user", title: getLabel("TXT_APPBAR_USER") },
  ];
  const menuPropsClasses = {
    paper: classes.paper,
  };
  const inputPropsClasses = {
    root: classes.selectInput,
  };
  const selectPropsClasses = {
    icon: classes.selectIcon,
  };
  const [searchFilter, setSearchFilter] = useState(SELECT_LIST[0].value);
  const onChangeSearchFilter = e => {
    setSearchFilter(e.target.value);
  };

  return (
    <Box className={classes.root}>
      <Box className="ic-search" />
      <InputBase placeholder={getLabel("P_APPBAR_SEARCH")} />
      <Box>
        <Divider orientation="vertical" className={classes.divider} />
        <FormControl>
          <CommonSelect
            selectList={SELECT_LIST}
            value={searchFilter}
            onChange={onChangeSearchFilter}
            menuPropsClasses={menuPropsClasses}
            inputPropsClasses={inputPropsClasses}
            selectPropsClasses={selectPropsClasses}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    borderRadius: 44,
    height: "100%",
    width: "100%",
    flexGrow: 1,
    alignItems: "center",
    background: theme.palette.rating.unActive,
    padding: theme.spacing(1, 2),
    "&>*:nth-child(1)": {
      marginRight: theme.spacing(1.5),
    },
    "&>*:nth-child(2)": {
      flexGrow: 1,
      paddingRight: theme.spacing(2),
    },
    "&>*:nth-child(3)": {
      height: "inherit",
      display: "flex",
      alignItems: "center",
    },
  },
  divider: {
    background: theme.palette.text.secondary,
    width: 1,
    marginRight: theme.spacing(1.5),
  },
  paper: {
    position: "fixed !important",
    top: `calc(${HEIGHT_APP_BAR} + 5px) !important`,
  },
  selectIcon: {
    color: theme.palette.text.secondary,
  },
  selectInput: {
    color: theme.palette.text.secondary,
  },
}));

export default SearchBar;
