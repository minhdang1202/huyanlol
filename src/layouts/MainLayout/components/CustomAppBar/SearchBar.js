import React, { useState } from "react";
import { Box, InputBase, Divider, makeStyles } from "@material-ui/core";
import { SearchIcon } from "../../../../icons";
import CustomSelect from "./CustomSelect";

const SearchBar = () => {
  const classes = useStyles();

  const [searchFilter, setSearchFilter] = useState("book");
  const onChangeSearchFilter = value => {
    setSearchFilter(value);
  };

  return (
    <Box className={classes.root}>
      <SearchIcon />
      <InputBase placeholder="Tìm kiếm…" />
      <Box>
        <Divider orientation="vertical" className={classes.divider} />
        <CustomSelect searchFilter={searchFilter} onChangeSearchFilter={onChangeSearchFilter} />
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
    background: "#F0F3F6",
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
