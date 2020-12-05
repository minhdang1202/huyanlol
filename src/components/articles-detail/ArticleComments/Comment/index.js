import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import CommentAuthor from "./CommentAuthor";
import CommentContent from "./CommentContent";
import CommentButtons from "./CommentButtons";
import { convertDistanceDate } from "utils/date";

const Comment = ({ comment, className }) => {
  const { user, lastUpdate, commentToEditions, reactCount, replyCount, content, commentId } = comment;
  const classes = useStyles();
  const { i18n } = useTranslation();
  const date = convertDistanceDate(new Date(lastUpdate), new Date(), i18n.language);

  return (
    <Box className={clsx(classes.root, className)}>
      <CommentAuthor user={user} date={date} />
      <CommentContent commentToEditions={commentToEditions} content={content} />
      <CommentButtons reactCount={reactCount} replyCount={replyCount} commentId={commentId} user={user} />
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
