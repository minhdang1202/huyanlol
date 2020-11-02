import React from "react";
import { Select, MenuItem, Typography, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import { ArrowDownIcon } from "icons";

const CommonSelect = ({
  selectList,
  selectPropsClasses,
  inputPropsClasses,
  menuPropsClasses,
  menuItemPropsClasses,
  ...otherProps
}) => {
  const classes = useStyles();
  return (
    <Select
      disableUnderline
      classes={{
        ...selectPropsClasses,
        root: classes.selectRoot,
        icon: clsx(classes.selectIcon, selectPropsClasses && selectPropsClasses.icon && selectPropsClasses.icon),
        iconOpen: classes.selectIconOpen,
      }}
      inputProps={{
        classes: {
          ...inputPropsClasses,
          root: clsx(classes.selectInput, inputPropsClasses && inputPropsClasses.root && inputPropsClasses.root),
        },
      }}
      IconComponent={props => <ArrowDownIcon {...props} />}
      MenuProps={{
        classes: {
          ...menuPropsClasses,
          paper: clsx(classes.selectMenuPaper, menuPropsClasses && menuPropsClasses.paper && menuPropsClasses.paper),
          list: classes.selectMenuList,
        },
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        getContentAnchorEl: null,
      }}
      {...otherProps}
    >
      {selectList.map((select, index) => (
        <MenuItem
          key={index}
          value={select.value}
          classes={{
            ...menuItemPropsClasses,
            root: clsx(
              classes.menuItemRoot,
              menuItemPropsClasses && menuItemPropsClasses.root && menuItemPropsClasses.root,
            ),
            selected: classes.menuItemSelected,
          }}
        >
          <Typography variant="subtitle1" style={{ lineHeight: "normal" }}>
            {select.title}
          </Typography>
        </MenuItem>
      ))}
    </Select>
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
    color: "inherit",
    padding: theme.spacing(1, 2),
    width: "100%",
    minWidth: "fit-content",
    alignItems: "flex-start",
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
  selectList: PropTypes.array.isRequired,
  selectPropsClasses: PropTypes.object,
  inputPropsClasses: PropTypes.object,
  menuPropsClasses: PropTypes.object,
  menuItemPropsClasses: PropTypes.object,
};

export default CommonSelect;
