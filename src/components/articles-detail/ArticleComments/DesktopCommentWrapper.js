import React, { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Comment from "./CommentWrapper/Comment";
import { uuid } from "utils";
import NoCommentWrapper from "./NoCommentWrapper";
import AddingReply from "./ArticleReplyDialog/AddingReply";
import SortSelect from "./ArticleReplyDialog/SortSelect";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";

const DesktopCommentWrapper = ({ onOpenReplyDialog, sortValue, onChangeSort }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const [comments, commentCount] = useSelector(
    ({ articleRedux }) => [articleRedux.comments.pageData, articleRedux.article.commentCount],
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
        </Box>
      )}
    </Box>
  );
};

DesktopCommentWrapper.propTypes = {
  onOpenReplyDialog: PropTypes.func,
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
  comment: {
    padding: theme.spacing(2),
    borderRadius: 6,
    border: `1px solid ${theme.palette.grey[100]}`,
    background: theme.palette.white,
  },
}));
