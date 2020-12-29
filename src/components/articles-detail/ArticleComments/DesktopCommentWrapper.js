import React, { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography, CircularProgress } from "@material-ui/core";
import Comment from "./CommentWrapper/Comment";
import { uuid } from "utils";
import NoCommentWrapper from "./NoCommentWrapper";
import AddingReply from "./ArticleReplyDialog/AddingReply";
import SortSelect from "./ArticleReplyDialog/SortSelect";
import Replies from "../ArticleComments/CommentWrapper/Replies";
import PopupReplyInput from "../ArticleComments/PopupReplyInput";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";

const DesktopCommentWrapper = ({ sortValue, onChangeSort, hasSortChange }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const [comments, commentCount, isFetchingComments] = useSelector(
    ({ articleRedux }) => [
      articleRedux.comments.pageData,
      articleRedux.article.commentCount,
      articleRedux.isFetchingComments,
    ],
    shallowEqual,
  );

  return (
    <Box mt={2} className={classes.root}>
      {commentCount === 0 ? (
        <NoCommentWrapper />
      ) : (
        <Box>
          <AddingReply />
          <Box className="space-between-root">
            <Typography variant="subtitle1" className={classes.listComments}>
              {getLabel("TXT_ARTICLE_LIST_COMMENTS")}
            </Typography>
            <SortSelect value={sortValue} onChange={e => onChangeSort(e.target.value)} />
          </Box>
          <Box mb={{ xs: 4, sm: 2 }} mt={{ xs: 3, sm: 2 }} className={classes.commentWrapper}>
            {comments &&
              !hasSortChange &&
              comments.map(comment => {
                const { commentId } = comment;
                return (
                  <Box key={uuid()}>
                    <Comment comment={comment} />
                    <Replies commentId={commentId} />
                    <PopupReplyInput commentId={commentId} />
                  </Box>
                );
              })}
            {(isFetchingComments || hasSortChange) && <CircularProgress size={26} className={classes.loading} />}
          </Box>
        </Box>
      )}
    </Box>
  );
};

DesktopCommentWrapper.propTypes = {
  sortValue: PropTypes.number,
  hasSortChange: PropTypes.bool,
  onChangeSort: PropTypes.func,
};

export default memo(DesktopCommentWrapper);

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
  commentWrapper: {
    "&>*": {
      marginBottom: theme.spacing(5),
    },
  },
}));
