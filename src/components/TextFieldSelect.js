import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { MenuItem as MuiMenuItem, Box, makeStyles } from "@material-ui/core";
import TextField from "./TextField";

const TextFieldSelect = ({ className, children, ...otherProps }) => {
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
      {children}
    </TextField>
  );
};

TextFieldSelect.propTypes = {
  className: PropTypes.string,
};

export default TextFieldSelect;

export const MenuItem = forwardRef(({ children, ...otherProps }, ref) => {
  const classes = useStyles();
  return (
    <MuiMenuItem ref={ref} classes={{ selected: classes.selected }} {...otherProps}>
      {children}
    </MuiMenuItem>
  );
});

MenuItem.displayName = "MenuItem";

const ArrowIcon = ({ className, ...otherProps }) => (
  <Box fontSize={18} className={clsx("ic-chevron-down", className)} {...otherProps} />
);

ArrowIcon.displayName = "ArrowIcon";

ArrowIcon.propTypes = {
  className: PropTypes.string,
};

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
    color: `${theme.palette.grey[300]} !important`,
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
