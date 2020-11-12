import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Avatar, makeStyles, Button, TextareaAutosize } from "@material-ui/core";
import { PADDING_X_CONTAINER_MOBILE } from "pages/articles/[article]";

const MobileInput = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const { getCommonKey } = LangConstant;
  const [content, setContent] = useState();

  const onChange = e => {
    setContent(e.target.value);
  };
  return (
    <form className={classes.root}>
      <Avatar variant="square" src="/images/ic-book.png" />
      <TextareaAutosize
        className={classes.textarea}
        placeholder={getLabel("P_ARTICLE_WRITE_COMMENT")}
        onChange={onChange}
      />
      <Button disabled={!Boolean(content)} classes={{ root: classes.button, disabled: classes.disabled }}>
        {getLabel(getCommonKey("TXT_POST"))}
      </Button>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    position: "sticky",
    bottom: 0,
    [theme.breakpoints.down("xs")]: {
      width: `calc(100% + ${PADDING_X_CONTAINER_MOBILE} * 2)`,
      marginLeft: `calc(${PADDING_X_CONTAINER_MOBILE} * -1)`,
    },
    padding: theme.spacing(1, 2),
    background: theme.palette.white,
    boxShadow: `0px -1px 0px ${theme.palette.grey[100]}, 0px 1px 0px ${theme.palette.grey[100]}`,
    "&>*:first-child": {
      width: 24,
      height: 26,
      alignSelf: "flex-end",
      marginBottom: theme.spacing(1),
    },
    "&>*:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
  textarea: {
    resize: "none",
    flexGrow: 1,
    borderRadius: 18,
    fontFamily: "SFProDisplay",
    fontSize: 14,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.grey[100]}`,
    padding: theme.spacing(1.5, 2),
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
  },
  button: {
    color: theme.palette.primary.main,
    alignSelf: "flex-end",
    marginBottom: theme.spacing(0.5),
  },
  disabled: {
    color: `${theme.palette.grey[500]} !important`,
  },
}));

export default MobileInput;
