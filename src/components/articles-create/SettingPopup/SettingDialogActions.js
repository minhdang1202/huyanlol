import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { DialogActions, Button, makeStyles } from "@material-ui/core";

const SettingDialogActions = ({ onClose, isDisabled }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  return (
    <DialogActions>
      <Button
        variant="contained"
        size="large"
        className={clsx("light-blue-button", classes.button)}
        onClick={() => onClose()}
      >
        {getLabel("TXT_BACK_TO_ARTICLE")}
      </Button>
      <Button
        variant="contained"
        size="large"
        className={clsx("light-blue-button", classes.button)}
        onClick={() => onClose()}
      >
        {getLabel("TXT_SAVE_DRAFT")}
      </Button>
      <Button
        disabled={isDisabled}
        variant="contained"
        size="large"
        className={clsx("dark-blue-button", classes.button)}
      >
        {getLabel("TXT_POST_ARTICLE")}
      </Button>
    </DialogActions>
  );
};

SettingDialogActions.propTypes = {
  isDisabled: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SettingDialogActions;

const useStyles = makeStyles(() => ({
  button: {
    height: 45,
    width: 160,
    padding: 0,
    "&:first-child": {
      marginRight: "auto",
    },
  },
}));
