import React from "react";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Popover, Box, makeStyles } from "@material-ui/core";

const LinkInput = props => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
  return (
    <Popover elevation={0} {...props}>
      <Box className="ic-times-circle-light" />
      <input placeholder={getLabel("P_CREATE_LINK")} />
    </Popover>
  );
};

export default LinkInput;

const useStyles = makeStyles(() => ({}));
