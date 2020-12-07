import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import CommentAuthor from "./CommentAuthor";
import CommentContent from "./CommentContent";
import CommentButtons from "./CommentButtons";
import { convertDistanceDate } from "utils/date";

const Comment = ({ comment, onOpenReplyDialog, isDesktopComment, ...otherProps }) => {
  const { user, lastUpdate, commentToEditions, reactCount, replyCount, content, commentId } = comment;
  const { i18n } = useTranslation();
  const date = convertDistanceDate(new Date(lastUpdate), new Date(), i18n.language);

  return (
    <Box {...otherProps}>
      <CommentAuthor user={user} date={date} />
      <CommentContent commentToEditions={commentToEditions} content={content} isDesktopComment={isDesktopComment} />
      <CommentButtons
        onOpenReplyDialog={onOpenReplyDialog}
        reactCount={reactCount}
        replyCount={replyCount}
        commentId={commentId}
        user={user}
        isDesktopComment={isDesktopComment}
      />
    </Box>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  className: PropTypes.string,
  onOpenReplyDialog: PropTypes.func,
  isDesktopComment: PropTypes.bool,
};

export default Comment;
