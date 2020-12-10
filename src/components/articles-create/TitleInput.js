import React from "react";
import { makeStyles, TextareaAutosize } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";

const TitleInput = props => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  return <TextareaAutosize className={classes.root} placeholder={getLabel("P_CREATE_TITLE")} {...props} />;
};

export default TitleInput;

const useStyles = makeStyles(theme => ({
  root: {
    resize: "none",
    width: "100%",
    fontFamily: "SFProDisplay",
    fontSize: 34,
    color: theme.palette.text.primary,
    padding: theme.spacing(1.5, 0),
    border: "none",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
  },
}));
