import React from "react";
import { FormControl, Select, MenuItem, Button, Typography, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import { ArrowDownIcon } from "icons";

const CommonSelect = ({
  initialValue,
  onChangeSelectedValue,
  selectList,
  menuPaperStyles,
  selectInputStyles,
  selectIconStyles,
  menuItemStyles,
}) => {
  const classes = useStyles();
  return (
    <FormControl>
      <Select
        defaultValue={selectList[0].value}
        value={initialValue ? initialValue : selectList[0].value}
        onChange={e => {
          onChangeSelectedValue(e.target.value);
        }}
        disableUnderline
        classes={{
          root: classes.selectRoot,
          icon: clsx(classes.selectIcon, selectIconStyles),
          iconOpen: classes.selectIconOpen,
        }}
        inputProps={{
          classes: { root: clsx(classes.selectInput, selectInputStyles) },
        }}
        IconComponent={props => <ArrowDownIcon {...props} />}
        MenuProps={{
          classes: {
            paper: clsx(classes.selectMenuPaper, menuPaperStyles),
            list: classes.selectMenuList,
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        {selectList.map((select, index) => (
          <MenuItem
            key={index}
            value={select.value}
            classes={{ root: clsx(classes.menuItemRoot, menuItemStyles), selected: classes.menuItemSelected }}
          >
            <Button>
              <Typography variant="subtitle1">{select.title}</Typography>
            </Button>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const useStyles = makeStyles(theme => ({
  selectMenuPaper: {
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
      padding: "8px 16px !important",
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
  selectInput: {
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
}));

CommonSelect.propTypes = {
  onChangeSelectedValue: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  selectList: PropTypes.array.isRequired,
  menuPaperStyles: PropTypes.string,
  menuItemStyles: PropTypes.string,
  selectInputStyles: PropTypes.string,
  selectIconStyles: PropTypes.string,
};

export default CommonSelect;
