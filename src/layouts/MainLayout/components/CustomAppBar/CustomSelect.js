import React from "react";
import {
  FormControl,
  Select,
  MenuItem as MuiMenuItem,
  Button,
  InputBase,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { HEIGHT_APP_BAR } from "./index";

const CustomSelect = ({ searchFilter, onChangeSearchFilter }) => {
  const classes = useStyles();
  return (
    <FormControl>
      <StyledSelect
        value={searchFilter}
        onChange={e => {
          onChangeSearchFilter(e.target.value);
        }}
        paper={classes.paper}
      >
        {selectList.map((select, index) => (
          <MenuItem key={index} value={select.value}>
            <Button>{select.title}</Button>
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

const selectList = [
  { value: "book", title: "Sách" },
  { value: "author", title: "Tác giả" },
  { value: "user", title: "Người dùng" },
];

const useStyles = makeStyles(() => ({
  paper: {
    position: "fixed",
    top: `calc(${HEIGHT_APP_BAR} + 5px) !important`,
    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1) !important",
    borderRadius: "10px !important",
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

const StyledSelect = withStyles(theme => ({
  root: {
    "&:focus": {
      background: "none",
    },
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  selectMenu: {
    padding: 0,
  },
}))(props => (
  <Select
    {...props}
    input={<StyledInput />}
    MenuProps={{ classes: { paper: props.paper, list: props.classes.selectMenu } }}
  />
));

const MenuItem = withStyles(theme => ({
  root: {
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
  selected: {
    background: "none !important",
    color: theme.palette.primary.main,
  },
}))(MuiMenuItem);

CustomSelect.propTypes = {
  onChangeSearchFilter: PropTypes.func,
  searchFilter: PropTypes.string,
};

export default CustomSelect;
