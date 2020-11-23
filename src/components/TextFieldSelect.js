import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { MenuItem, Box, makeStyles } from "@material-ui/core";
import TextField from "./TextField";

const TextFieldSelect = ({ selectList, className, ...otherProps }) => {
  const classes = useStyles();
  return (
    <TextField
      select
      className={clsx(classes.root, className)}
      SelectProps={{
        classes: { select: classes.select, disabled: classes.disabled },
        IconComponent: ArrowIcon,
        MenuProps: {
          classes: {
            paper: classes.paper,
            list: classes.list,
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        },
      }}
      {...otherProps}
    >
      {selectList.map((select, index) => (
        <MenuItem classes={{ selected: classes.selected }} key={index} value={select.id}>
          {select.title}
        </MenuItem>
      ))}
    </TextField>
  );
};

const ArrowIcon = ({ className, ...otherProps }) => (
  <Box fontSize={18} className={clsx("ic-chevron-down", className)} {...otherProps} />
);

ArrowIcon.displayName = "ArrowIcon";

ArrowIcon.propTypes = {
  className: PropTypes.string,
};

TextFieldSelect.propTypes = {
  selectList: PropTypes.array,
  className: PropTypes.string,
};

export default TextFieldSelect;

const useStyles = makeStyles(theme => ({
  root: {
    "& ic-chevron-down": {
      color: theme.palette.grey[500],
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
    borderRadius: 10,
    minWidth: "295px !important",
    width: "fit-content !important",
    maxHeight: 215,
  },
  selected: {
    backgroundColor: `${theme.palette.grey[100]} !important`,
  },
  select: {
    "&:focus": {
      background: "none",
    },
  },
  disabled: {
    color: theme.palette.grey[300],
    "& .ic-chevron-down": {
      color: `${theme.palette.grey[300]} !important`,
    },
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    "& li": {
      height: 55,
      "&:hover": {
        backgroundColor: `${theme.palette.grey[100]} !important`,
      },
    },
  },
}));
