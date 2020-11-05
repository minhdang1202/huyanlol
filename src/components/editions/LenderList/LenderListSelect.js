import React from "react";
import { Typography, Box, FormControl, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import CommonSelect from "components/CommonSelect";

const LenderListSelect = ({ selectList, lenderFilter, onChangeLenderFilter }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const inputPropsClasses = {
    root: classes.selectInputStyles,
  };
  const menuItemPropsClasses = {
    root: classes.menuItemStyles,
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography className="mr-4">{getLabel("TXT_EDITION_ARRANGE")}</Typography>
        <FormControl>
          <CommonSelect
            selectList={selectList}
            onChange={e => onChangeLenderFilter(e.target.value)}
            value={lenderFilter}
            inputPropsClasses={inputPropsClasses}
            menuItemPropsClasses={menuItemPropsClasses}
          />
        </FormControl>
      </Box>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  menuItemStyles: {
    textTransform: "uppercase !important",
  },
  selectInputStyles: {
    textTransform: "uppercase !important",
    color: theme.palette.text.primary,
  },
}));

LenderListSelect.propTypes = {
  selectList: PropTypes.array,
  onChangeLenderFilter: PropTypes.func,
  lenderFilter: PropTypes.string,
};

export default LenderListSelect;
