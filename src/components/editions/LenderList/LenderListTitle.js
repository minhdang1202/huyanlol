import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";
import { LangConstant } from "const";

const LenderListTitle = ({ totalLenders }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  return (
    <Hidden xsDown>
      <Typography className="mb-8">{totalLenders + " " + getLabel("TXT_EDITION_USER")}</Typography>
    </Hidden>
  );
};

LenderListTitle.propTypes = {
  totalLenders: PropTypes.number,
};

export default LenderListTitle;
