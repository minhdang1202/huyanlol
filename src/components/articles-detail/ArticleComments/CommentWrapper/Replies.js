import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import StringFormat from "string-format";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import { Box, Divider, Button, CircularProgress } from "@material-ui/core";
import Comment from "./Comment";
import ArticleActions from "redux/article.redux";
import { uuid } from "utils";

const Replies = ({ commentId }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const dispatch = useDispatch();
  const dispatchGetReplies = () => dispatch(ArticleActions.requestGetReplies(onGetParams()));
  const [repliesRedux, isFetchingReplies] = useSelector(
    ({ articleRedux }) => [articleRedux.replies[commentId], articleRedux.isFetchingReplies],
    shallowEqual,
  );
  const replies = repliesRedux?.pageData;
  const replyCount = repliesRedux?.replyCount;
  const lastReplyId = replies ? replies[0].commentId : null;
  const onGetParams = () => ({
    commentId: commentId,
    lastReplyId: lastReplyId,
    pageSize: AppConstant.DATA_SIZES.replies,
  });

  return (
    replies && (
      <Box display="flex" mt={1} width="100%">
        <Divider orientation="vertical" className="mr-12" flexItem />
        <Box flexGrow={1}>
          {!isFetchingReplies && replies?.length < replyCount && (
            <Button size="small" className={clsx("blue-text", "mb-8", "ml-n8")} onClick={dispatchGetReplies}>
              {StringFormat(getLabel("FM_ARTICLE_SEE_MORE_REPLIES"), replyCount - replies.length)}
            </Button>
          )}
          {isFetchingReplies && <CircularProgress size={20} className={clsx("mt-4", "mb-4", "blue-text")} />}
          {replies.map((reply, index) => (
            <Comment key={uuid()} comment={reply} className={index === replies.length - 1 ? null : "mb-8"} />
          ))}
        </Box>
      </Box>
    )
  );
};

Replies.propTypes = {
  commentId: PropTypes.number,
};

export default memo(Replies);
