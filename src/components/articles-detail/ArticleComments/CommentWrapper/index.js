import React, { memo } from "react";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import Comment from "./Comment";
import Replies from "./Replies";
import NoCommentWrapper from "../NoCommentWrapper";
import { uuid } from "utils";

const CommentWrapper = ({ hasSortChange }) => {
  const classes = useStyles();
  const [comments, commentCount, isFetchingComments] = useSelector(({ articleRedux }) => [
    articleRedux.comments.pageData,
    articleRedux.article.commentCount,
    articleRedux.isFetchingComments,
  ]);

  return commentCount === 0 ? (
    <NoCommentWrapper />
  ) : (
    <Box mb={{ xs: 4, sm: 2 }} mt={{ xs: 3, sm: 2 }} className={classes.commentWrapper}>
      {comments &&
        !hasSortChange &&
        comments.map(comment => {
          const { replyCount, commentId } = comment;
          return (
            <Box key={uuid()}>
              <Comment comment={comment} />
              {replyCount > 0 && <Replies replyCount={replyCount} commentId={commentId} />}
            </Box>
          );
        })}
      {(isFetchingComments || hasSortChange) && <CircularProgress size={26} className={classes.loading} />}
    </Box>
  );
};

CommentWrapper.propTypes = {
  hasSortChange: PropTypes.bool,
};

export default memo(CommentWrapper);

const useStyles = makeStyles(theme => ({
  commentWrapper: {
    "&>*:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  loading: {
    margin: theme.spacing(5, "auto"),
    textAlign: "center",
    display: "inherit",
    color: theme.palette.primary.main,
  },
}));
