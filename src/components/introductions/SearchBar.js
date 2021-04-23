import React from "react";
import { Box, InputBase, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";
import { LangConstant } from "const";

const SearchBar = ({ isTransparent, value, onChange }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);

  return (
    <Box className={clsx(classes.root, isTransparent && classes.transparentBackground)}>
      <Box className="ic-search" />
      <InputBase value={value} onChange={onChange} placeholder={getLabel("P_FAQ_SEARCH")} />
    </Box>
  );
};

SearchBar.propTypes = {
  isTransparent: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

SearchBar.defaultProps = {
  isTransparent: false,
};

export default SearchBar;

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
      color: `${theme.palette.text.secondary}`,
    },
    "&>*:nth-child(2)": {
      flexGrow: 1,
      paddingRight: theme.spacing(2),
    }
  },
  transparentBackground: {
    background: "rgba(240, 243, 246, 0.4)",
    "&>*:nth-child(1)": {
      marginRight: theme.spacing(1.5),
      color: `${theme.palette.white} !important`,
    },
    "&>*:nth-child(3)": {
      "&>*:nth-child(1)": {
        background: `${theme.palette.white} !important`,
      },
    },
  },
}));
