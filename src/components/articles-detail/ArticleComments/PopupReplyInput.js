import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import MentionInput from "./MentionInput";
import { Avatar } from "components";
import { Box, Button, makeStyles } from "@material-ui/core";
import { getImageById } from "utils";
import ArticleActions from "redux/article.redux";

const PopupReplyInput = ({ commentId }) => {
  const classes = useStyles();
  const inputRef = useRef();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const dispatch = useDispatch();
  const { isTypingReply, replyInfo, isPostingComment } = useSelector(({ articleRedux }) => articleRedux, shallowEqual);
  const { profile } = useSelector(({ userRedux }) => userRedux);
  const [content, setContent] = useState({});
  const [hasContent, setHasContent] = useState(false);

  const onChangeContent = ({ hasContent, ...newContent }) => {
    setContent(newContent);
    setHasContent(hasContent);
  };

  const onCancelReply = () => {
    dispatch(ArticleActions.cancelReply());
  };

  const onReplyComment = () => {
    const { commentId } = replyInfo;
    dispatch(ArticleActions.requestPostReply({ ...content, commentId }));
  };

  useEffect(() => {
    return () => {
      onCancelReply();
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.click();
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [inputRef.current]);

  return (
    isTypingReply &&
    (commentId === replyInfo?.commentId || commentId === replyInfo?.parent?.commentId) && (
      <Box width="100%" mb={3} mt={1}>
        <Box display="flex" alignContent="center" flexGrow={1}>
          <Avatar className={classes.avatar} src={getImageById(profile.imageId)} />
          <MentionInput
            ref={inputRef}
            onChangeContent={onChangeContent}
            className={classes.input}
            placeholder={getLabel("P_ARTICLE_WRITE_REPLY")}
            isTopSuggestion
            replyInfo={replyInfo}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={1.5} className={classes.buttonWrapper}>
          <Button
            variant="contained"
            disabled={!hasContent || isPostingComment}
            size="small"
            className={clsx("dark-blue-button", "mr-8")}
            onClick={onReplyComment}
          >
            {getLabel("TXT_ARTICLE_REPLY_BUTTON")}
          </Button>
          <Button variant="contained" size="small" className="light-blue-button" onClick={onCancelReply}>
            {getLabel("TXT_ARTICLE_CANCEL")}
          </Button>
        </Box>
      </Box>
    )
  );
};

PopupReplyInput.propTypes = {
  commentId: PropTypes.number,
};

export default PopupReplyInput;

const useStyles = makeStyles(theme => ({
  input: {
    flexGrow: 1,
    borderRadius: 6,
    border: `1px solid ${theme.palette.grey[100]}`,
    padding: theme.spacing(1.5, 0),
    "& .DraftEditor-root": {
      padding: theme.spacing(0, 2),
      overflow: "auto",
      maxHeight: 88,
      fontSize: 16,
    },
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: theme.spacing(1.5),
  },
  buttonWrapper: {
    "& button": {
      height: 33,
    },
  },
}));
