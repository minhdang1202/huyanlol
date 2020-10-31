import React, { useState } from "react";
import { Box, InputBase, Divider, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "icons";
import AppbarSelect from "./AppbarSelect";

const SearchBar = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [searchFilter, setSearchFilter] = useState();
  const onChangeSearchFilter = value => {
    setSearchFilter(value);
  };

  return (
    <Box className={classes.root}>
      <SearchIcon />
      <InputBase placeholder={getLabel("P_APPBAR_SEARCH")} />
      <Box>
        <Divider orientation="vertical" className={classes.divider} />
        <AppbarSelect searchFilter={searchFilter} onChangeSearchFilter={onChangeSearchFilter} />
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
}));

export default SearchBar;
