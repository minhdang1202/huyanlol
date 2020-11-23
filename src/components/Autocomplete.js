import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, Popper } from "@material-ui/core";
import { Autocomplete as MuiAutocomplete } from "@material-ui/lab";

const Autocomplete = ({ classes, ...otherProps }) => {
  const defaultClasses = useStyles();
  return (
    <MuiAutocomplete
      classes={{
        input: clsx(defaultClasses.input, classes && classes.input),
        popper: clsx(defaultClasses.popper, classes && classes.popper),
        paper: clsx(defaultClasses.paper, classes && classes.paper),
        option: clsx(defaultClasses.option, classes && classes.option),
      }}
      closeIcon={null}
      PopperComponent={props => <Popper {...props} placement="bottom-start" />}
      {...otherProps}
    />
  );
};

Autocomplete.propTypes = {
  classes: PropTypes.object,
};

export default Autocomplete;

const useStyles = makeStyles(theme => ({
  popper: {
    maxWidth: 290,
    height: "fit-content",
    zIndex: 3000,
    padding: 0,
    marginTop: theme.spacing(1),
    "& ul": {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  paper: {
    padding: 0,
  },
  input: {
    padding: `${theme.spacing(0.5, 0, 1, 0)} !important`,
  },
  option: {
    height: 55,
    "&:hover": {
      background: theme.palette.grey[100],
    },
    "&:selected": {
      background: theme.palette.grey[100],
    },
  },
}));
