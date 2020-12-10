import React, { useState } from "react";
import StringFormat from "string-format";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import createMentionPlugin from "draft-js-mention-plugin";
import { LangConstant } from "const";
import { Avatar, Box, makeStyles, Button, IconButton, Typography } from "@material-ui/core";
import { PADDING_X_CONTAINER_MOBILE } from "pages/articles/[article]";
import ArticleActions from "redux/article.redux";
import MentionInput from "./MentionInput";
import Mention from "./MentionInput/Mention";
import {
  HEIGHT_EDITION_SUGGESTIONS,
  HEIGHT_USER_SUGGESTIONS,
  WIDTH_EDITION_SUGGESTIONS,
  WIDTH_USER_SUGGESTIONS,
} from "./MentionInput";

const MobileInput = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const { getCommonKey } = LangConstant;
  const [content, setContent] = useState({});
  const [hasContent, setHasContent] = useState(false);

  const dispatch = useDispatch();
  const [isTypingReply, replyInfo, isPostingComment, articleId] = useSelector(({ articleRedux }) => [
    articleRedux.isTypingReply,
    articleRedux.replyInfo,
    articleRedux.isPostingComment,
    articleRedux.article.articleId,
  ]);
  const { user, commentId } = replyInfo || {};

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
      {isTypingReply && (
        <Box className={classes.reply}>
          <Typography variant="subtitle1" className="eclipse">
            {StringFormat(getLabel("FM_ARTICLE_REPLY_COMMENT"), user.name)}
          </Typography>
          <IconButton onClick={dispatch(ArticleActions.cancelReply())}>
            <Box className="ic-times-circle" />
          </IconButton>
        </Box>
      )}
      <Box className={classes.form}>
        <Avatar variant="square" src="/images/ic-book.png" />
        <MentionInput
          id={MOBILE_INPUT_ID}
          MentionUserSuggestions={MentionUserSuggestions}
          MentionEditionSuggestions={MentionEditionSuggestions}
          plugins={plugins}
          onChangeContent={onChangeContent}
          className={classes.input}
          placeholder={getLabel("P_ARTICLE_WRITE_COMMENT")}
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

const mentionUserPlugin = createMentionPlugin({
  mentionTrigger: "@",
  mentionComponent: Mention,
  entityMutability: "IMMUTABLE",
  supportWhitespace: true,
  positionSuggestions: settings => {
    return {
      left: settings.decoratorRect.left + "px",
      top: settings.decoratorRect.top - 25 + "px", // Change this value (25) for manage the distance between cursor and bottom edge of popover
      transform: "scale(1) translateY(-100%)",
      maxHeight: HEIGHT_USER_SUGGESTIONS,
      width: WIDTH_USER_SUGGESTIONS,
    };
  },
});
const mentionEditionPlugin = createMentionPlugin({
  mentionTrigger: "&",
  mentionComponent: Mention,
  entityMutability: "IMMUTABLE",
  supportWhitespace: true,
  positionSuggestions: settings => {
    return {
      left: settings.decoratorRect.left + "px",
      top: settings.decoratorRect.top - 25 + "px", // Change this value (25) for manage the distance between cursor and bottom edge of popover
      transform: "scale(1) translateY(-100%)",
      maxHeight: HEIGHT_EDITION_SUGGESTIONS,
      width: WIDTH_EDITION_SUGGESTIONS,
    };
  },
});
const plugins = [mentionEditionPlugin, mentionUserPlugin];
const { MentionSuggestions: MentionUserSuggestions } = mentionUserPlugin;
const { MentionSuggestions: MentionEditionSuggestions } = mentionEditionPlugin;

export const MOBILE_INPUT_ID = "mobile-input";
export default MobileInput;

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
