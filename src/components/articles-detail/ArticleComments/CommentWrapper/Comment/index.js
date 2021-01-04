import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import CommentAuthor from "./CommentAuthor";
import CommentContent from "./CommentContent";
import CommentButtons from "./CommentButtons";

const Comment = ({ comment, isDesktopComment, ...otherProps }) => {
  const { commentId } = comment;
  const [tempReactCount, setTempReactCount] = useState(0);
  const addTempReactCount = () => {
    setTempReactCount(tempReactCount + 1);
  };
  return (
    <Box id={commentId} {...otherProps}>
      <CommentAuthor comment={comment} />
      <CommentContent
        comment={comment}
        isDesktopComment={isDesktopComment}
        changeParentReactCount={addTempReactCount}
      />
      <CommentButtons comment={comment} isDesktopComment={isDesktopComment} tempReactCount={tempReactCount} />
    </Box>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  className: PropTypes.string,
  isDesktopComment: PropTypes.bool,
};

export default memo(Comment);
