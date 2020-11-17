import React, { useState, useRef, useEffect } from "react";
import StringFormat from "string-format";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Avatar, Box, makeStyles, Button, TextareaAutosize, IconButton, Typography } from "@material-ui/core";
import { PADDING_X_CONTAINER_MOBILE } from "pages/articles/[article]";
import ArticleActions from "redux/article.redux";

const MobileInput = () => {
  const classes = useStyles();
  const input = useRef();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const { getCommonKey } = LangConstant;

  const dispatch = useDispatch();
  const onCancelReply = () => dispatch(ArticleActions.onCancelReply());
  const [isTypingReply, replyInfo] = useSelector(state => [
    state.articleRedux.isTypingReply,
    state.articleRedux.replyInfo,
  ]);

  const [content, setContent] = useState();

  useEffect(() => {
    const onFocusout = () => {
      onCancelReply();
      input.current.value = null;
    };
    input.current.addEventListener("focusout", onFocusout);
    return () => {
      input.current.removeEventListener("focusout", onFocusout);
    };
  }, []);

  useEffect(() => {
    if (isTypingReply) {
      input.current.focus();
      input.current.value = replyInfo.name;
      setContent(replyInfo.name);
      return;
    }
    setContent(null);
    input.current.value = null;
  }, [isTypingReply]);

  const onChange = e => {
    setContent(e.target.value);
  };

  return (
    <Box className={classes.root}>
      {isTypingReply && (
        <Box className={classes.reply}>
          <Typography variant="subtitle1" className="eclipse">
            {StringFormat(getLabel("FM_ARTICLE_REPLY_COMMENT"), replyInfo.name)}
          </Typography>
          <IconButton onClick={onCancelReply}>
            <Box className="ic-times-circle" />
          </IconButton>
        </Box>
      )}
      <form className={classes.form}>
        <Avatar variant="square" src="/images/ic-book.png" />
        <TextareaAutosize
          ref={input}
          className={classes.textarea}
          placeholder={getLabel("P_ARTICLE_WRITE_COMMENT")}
          onChange={onChange}
        />
        <Button disabled={!Boolean(content)} classes={{ root: classes.button, disabled: classes.disabled }}>
          {getLabel(getCommonKey("TXT_POST"))}
        </Button>
      </form>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "sticky",
    bottom: 0,
    [theme.breakpoints.down("xs")]: {
      width: `calc(100% + ${PADDING_X_CONTAINER_MOBILE} * 2)`,
      marginLeft: `calc(${PADDING_X_CONTAINER_MOBILE} * -1)`,
    },
  },
  form: {
    display: "flex",
    alignItems: "center",
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
  reply: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: theme.palette.grey[100],
    padding: theme.spacing(1, 2),
    color: theme.palette.grey[500],
    "& .ic-times-circle": {
      fontSize: 14,
      color: theme.palette.grey[500],
    },
  },
}));

export default MobileInput;
