import React, { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import Comment from "./CommentWrapper/Comment";
import { uuid } from "utils";
import NoCommentWrapper from "./NoCommentWrapper";

const DesktopCommentWrapper = ({ onOpenReplyDialog }) => {
  const classes = useStyles();
  const [desktopCommentsRedux, commentCount, articleId] = useSelector(
    ({ articleRedux }) => [
      articleRedux.desktopComments,
      articleRedux.article.commentCount,
      articleRedux.article.articleId,
    ],
    shallowEqual,
  );
  const desktopComments = desktopCommentsRedux[articleId];

  return (
    <Box mt={2} className={classes.root}>
      {commentCount === 0 ? (
        <NoCommentWrapper />
      ) : (
        desktopComments &&
        desktopComments.map(comment => (
          <Comment
            onOpenReplyDialog={onOpenReplyDialog}
            key={uuid()}
            comment={comment}
            className={classes.comment}
            isDesktopComment
          />
        ))
      )}
    </Box>
  );
};

DesktopCommentWrapper.propTypes = {
  onOpenReplyDialog: PropTypes.func,
};

export default memo(DesktopCommentWrapper);

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
  comment: {
    padding: theme.spacing(2),
    borderRadius: 6,
    border: `1px solid ${theme.palette.grey[100]}`,
    background: theme.palette.white,
  },
}));
