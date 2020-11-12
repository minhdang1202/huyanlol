import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, makeStyles } from "@material-ui/core";
import CommentAuthor from "./CommentAuthor";
import CommentContent from "./CommentContent";
import CommentButtons from "./CommentButtons";
import { cutString } from "utils";

const Comment = ({ comment, className }) => {
  const { avatar, name, date, reactCount, commentCount, content, hasMentioned, bookMentioned } = comment;
  const classes = useStyles();
  const LIMIT_COMMENT_LENGTH = 100;
  const shortComment = cutString(LIMIT_COMMENT_LENGTH, content);
  const hasSeeMoreBtn = content.length > LIMIT_COMMENT_LENGTH;

  const [isFullComment, setIsFullComment] = useState(false);

  const onShowComment = () => {
    setIsFullComment(!isFullComment);
  };

  return (
    <Box className={clsx(classes.root, className)}>
      <CommentAuthor avatar={avatar} name={name} date={date} />
      <CommentContent
        content={content}
        shortComment={shortComment}
        isFullComment={isFullComment}
        hasSeeMoreBtn={hasSeeMoreBtn}
        onClick={onShowComment}
        hasMentioned={hasMentioned}
        bookMentioned={bookMentioned}
        reactCount={reactCount}
      />
      <CommentButtons reactCount={reactCount} commentCount={commentCount} />
    </Box>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  className: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2),
      borderRadius: 6,
      border: `1px solid ${theme.palette.grey[100]}`,
      background: theme.palette.white,
    },
  },
}));

export default Comment;
