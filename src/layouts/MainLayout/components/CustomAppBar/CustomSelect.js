import React from "react";
import { FormControl, Select, MenuItem, Button, InputBase, makeStyles, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { HEIGHT_APP_BAR } from "./index";
import { ArrowDownIcon } from "icons";

const CustomSelect = ({ searchFilter, onChangeSearchFilter }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  return (
    <FormControl>
      <Select
        defaultValue={selectList[0].value}
        value={searchFilter}
        onChange={e => {
          onChangeSearchFilter(e.target.value);
        }}
        classes={{ root: classes.selectRoot, icon: classes.selectIcon, iconOpen: classes.selectIconOpen }}
        input={<StyledInput />}
        IconComponent={props => <ArrowDownIcon {...props} />}
        MenuProps={{ classes: { paper: classes.selectMenuPaper, list: classes.selectMenuList } }}
      >
        {selectList.map((select, index) => (
          <MenuItem
            key={index}
            value={select.value}
            classes={{ root: classes.menuItemRoot, selected: classes.menuItemSelected }}
          >
            <Button>{getLabel(select.title)}</Button>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const selectList = [
  { value: "book", title: "TXT_APPBAR_BOOK" },
  { value: "author", title: "TXT_APPBAR_AUTHOR" },
  { value: "user", title: "TXT_APPBAR_USER" },
];

const useStyles = makeStyles(theme => ({
  selectMenuPaper: {
    position: "fixed",
    top: `calc(${HEIGHT_APP_BAR} + 5px) !important`,
    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1) !important",
    borderRadius: "10px !important",
  },
  selectMenuList: {
    padding: 0,
  },
  menuItemRoot: {
    flexFlow: "column",
    position: "relative",
    padding: 0,
    "& > button": {
      color: "inherit",
      padding: theme.spacing(1.5),
      width: "100%",
      minWidth: "fit-content",
      justifyContent: "flex-start",
      "& .MuiTouchRipple-root": {
        display: "none",
      },
      "&:hover": {
        background: "none",
      },
    },
  },
  menuItemSelected: {
    background: "none !important",
    color: theme.palette.primary.main,
  },
  selectRoot: {
    "&:focus": {
      background: "none",
    },
  },
  selectIcon: {
    top: "50%",
    transform: "translate(0, -50%)",
  },
  selectIconOpen: {
    transform: "scaleY(-1)",
    top: "40%",
  },
}));

const StyledInput = withStyles(theme => ({
  root: {
    "& .MuiDivider-root": {
      display: "none",
    },
    "& > div": {
      border: "none !important",
      boxShadow: "none !important",
    },
    "& button": {
      background: "none !important",
      width: "fit-content",
      padding: "0 !important",
      color: theme.palette.text.secondary,
    },
  },
}))(InputBase);

CustomSelect.propTypes = {
  onChangeSearchFilter: PropTypes.func,
  searchFilter: PropTypes.string,
};

export default CustomSelect;
