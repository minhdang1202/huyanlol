import React, { memo } from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import CommentAuthor from "./CommentAuthor";
import CommentContent from "./CommentContent";
import CommentButtons from "./CommentButtons";

const Comment = ({ comment, onOpenReplyDialog, isDesktopComment, ...otherProps }) => {
  const { commentId } = comment;

  return (
    <Box id={commentId} {...otherProps}>
      <CommentAuthor comment={comment} />
      <CommentContent comment={comment} isDesktopComment={isDesktopComment} />
      <CommentButtons onOpenReplyDialog={onOpenReplyDialog} comment={comment} isDesktopComment={isDesktopComment} />
    </Box>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  className: PropTypes.string,
  onOpenReplyDialog: PropTypes.func,
  isDesktopComment: PropTypes.bool,
};

export default memo(Comment);
