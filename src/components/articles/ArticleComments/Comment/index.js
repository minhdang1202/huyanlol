import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import CommentAuthor from "./CommentAuthor";
import CommentContent from "./CommentContent";
import CommentButtons from "./CommentButtons";
import { cutString } from "utils";
import { convertDistanceDate } from "utils/date";

const Comment = ({ comment, className }) => {
  const { avatar, name, userId, lastUpdate, commentToEditions, reactCount, replyCount, content, commentId } = comment;
  const classes = useStyles();
  const { i18n } = useTranslation();
  const date = convertDistanceDate(new Date(lastUpdate), new Date(), i18n.language);
  const LIMIT_COMMENT_LENGTH = 250;
  const shortComment = cutString(LIMIT_COMMENT_LENGTH, content);
  const hasSeeMoreBtn = content.length > LIMIT_COMMENT_LENGTH;
  const hasMentioned = Boolean(commentToEditions.length);
  const bookMentioned = hasMentioned ? commentToEditions[0] : {};

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
      />
      <CommentButtons
        reactCount={reactCount}
        replyCount={replyCount}
        commentId={commentId}
        userId={userId}
        name={name}
      />
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
