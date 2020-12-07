import React from "react";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Box, Typography, CircularProgress, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import Comment from "./Comment";
import Replies from "./Replies";
import { uuid } from "utils";

const CommentWrapper = ({ onOpenReplyDialog, isPopup, hasSortChange }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const { comments, article, isFetchingComments, desktopComments } = useSelector(({ articleRedux }) => articleRedux);
  const { commentCount } = article;

  return commentCount === 0 ? (
    <Box py={{ xs: 10, sm: 8 }} className="center-root" flexDirection="column">
      <Box className="ic-comment-alt-dots" />
      <Typography variant="body2" className="grey-text">
        {getLabel("TXT_ARTICLE_FIRST_COMMENT")}
      </Typography>
    </Box>
  ) : (
    <Box mb={{ xs: 4, sm: 2 }} mt={{ xs: 3, sm: 2 }} className={classes.commentWrapper}>
      {!isMobile && !isPopup
        ? desktopComments.map(comment => (
            <Comment
              onOpenReplyDialog={onOpenReplyDialog}
              key={uuid()}
              comment={comment}
              className={classes.desktopComment}
              isDesktopComment
            />
          ))
        : comments.pageData &&
          !hasSortChange &&
          comments.pageData.map(comment => {
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
  onOpenReplyDialog: PropTypes.func,
  isPopup: PropTypes.bool,
  hasSortChange: PropTypes.bool,
};

export default CommentWrapper;

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
  desktopComment: {
    padding: theme.spacing(2),
    borderRadius: 6,
    border: `1px solid ${theme.palette.grey[100]}`,
    background: theme.palette.white,
  },
}));
