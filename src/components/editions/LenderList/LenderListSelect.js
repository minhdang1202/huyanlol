import React from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import CommonSelect from "components/CommonSelect";

const LenderListSelect = ({ lenderFilter, onChangeLenderFilter }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const SELECT_LIST = [
    { value: "activityDuration", title: getLabel("TXT_LENDERLIST_ACTIVITY_DURATION") },
    { value: "distance", title: getLabel("TXT_LENDERLIST_DISTANCE") },
  ];

  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography className="mr-4">{getLabel("TXT_LENDERLIST_ARRANGE")}</Typography>
        <CommonSelect
          selectList={SELECT_LIST}
          onChangeSelectedValue={onChangeLenderFilter}
          initialValue={lenderFilter}
          menuItemStyles={classes.menuItemStyles}
          selectInputStyles={classes.selectInputStyles}
          selectIconStyles={classes.selectIconStyles}
        />
      </Box>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  menuItemStyles: {
    "& > button": {
      textTransform: "uppercase !important",
    },
  },
  selectInputStyles: {
    "& > button": {
      textTransform: "uppercase !important",
      color: theme.palette.text.primary,
    },
  },
  selectIconStyles: {
    fill: `${theme.palette.text.primary} !important`,
  },
}));

LenderListSelect.propTypes = {
  onChangeLenderFilter: PropTypes.func,
  lenderFilter: PropTypes.string,
};

export default LenderListSelect;
