import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Avatar, Box, makeStyles, Button } from "@material-ui/core";
import { PADDING_X_CONTAINER_MOBILE } from "pages/articles/[article]";
import ArticleActions from "redux/article.redux";
import MentionInput from "../MentionInput";
import { topMentionPlugins } from "../MentionInput/MentionPlugins";
import ReplyInfo from "./ReplyInfo";

const MobileCommentInput = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const { getCommonKey } = LangConstant;
  const [content, setContent] = useState({});
  const [hasContent, setHasContent] = useState(false);

  const dispatch = useDispatch();
  const [isTypingReply, commentId, isPostingComment, articleId] = useSelector(({ articleRedux }) => [
    articleRedux.isTypingReply,
    articleRedux.replyInfo?.commentId,
    articleRedux.isPostingComment,
    articleRedux.article.articleId,
  ]);

  const onChangeContent = ({ hasContent, ...newContent }) => {
    setContent(newContent);
    setHasContent(hasContent);
  };

  const onPostComment = () => {
    isTypingReply
      ? dispatch(ArticleActions.requestPostReply({ ...content, commentId }))
      : dispatch(ArticleActions.requestPostComment({ ...content, articleId }));
  };

  return (
    <Box className={classes.root}>
      <ReplyInfo />
      <Box className={classes.form}>
        <Avatar variant="square" src="/images/ic-book.png" />
        <MentionInput
          id={MOBILE_INPUT_ID}
          onChangeContent={onChangeContent}
          className={classes.input}
          placeholder={getLabel("P_ARTICLE_WRITE_COMMENT")}
          {...topMentionPlugins}
        />
        <Button
          disabled={!hasContent || isPostingComment}
          classes={{ root: classes.button, disabled: classes.disabled }}
          onClick={onPostComment}
        >
          {getLabel(getCommonKey("TXT_POST"))}
        </Button>
      </Box>
    </Box>
  );
};

export const MOBILE_INPUT_ID = "mobile-input";
export default MobileCommentInput;

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
  input: {
    flexGrow: 1,
    borderRadius: 18,
    border: `1px solid ${theme.palette.grey[100]}`,
    padding: theme.spacing(1.5, 0),
    "& .DraftEditor-root": {
      padding: theme.spacing(0, 2),
      overflow: "auto",
      maxHeight: 88,
      fontSize: 16,
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
