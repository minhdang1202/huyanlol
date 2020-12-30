import React, { memo, useEffect } from "react";
import { PropTypes } from "prop-types";
import { shallowEqual, useSelector } from "react-redux";
import { Box, CircularProgress, makeStyles, Hidden } from "@material-ui/core";
import Comment from "./Comment";
import Replies from "./Replies";
import NoCommentWrapper from "../NoCommentWrapper";
import { uuid } from "utils";
import PopupReplyInput from "../PopupReplyInput";

import { ARTICLE_COMMENT_CONTAINER_ID } from "../../ArticleComments";
import { ARTICLE_REACT_BUTTON } from "../../ArticleReactButtons";
const CommentWrapper = ({ hasSortChange }) => {
  const classes = useStyles();
  const [comments, commentCount, isFetchingComments] = useSelector(
    ({ articleRedux }) => [
      articleRedux.comments.pageData,
      articleRedux.article.commentCount,
      articleRedux.isFetchingComments,
    ],
    shallowEqual,
  );
  const isOpenCommentDetail = useSelector(state => state.articleRedux.isOpenCommentDetail);

  useEffect(() => {
    if (isOpenCommentDetail) {
      const element = document.getElementById(ARTICLE_REACT_BUTTON);
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpenCommentDetail]);
  return commentCount === 0 ? (
    <NoCommentWrapper />
  ) : (
    <Box mb={{ xs: 4, sm: 2 }} mt={{ xs: 3, sm: 2 }} className={classes.commentWrapper}>
      {comments &&
        !hasSortChange &&
        comments.map(comment => {
          const { commentId } = comment;
          return (
            <Box key={uuid()}>
              <Comment comment={comment} />
              <Replies commentId={commentId} />
              <Hidden xsDown>
                <PopupReplyInput commentId={commentId} />
              </Hidden>
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
