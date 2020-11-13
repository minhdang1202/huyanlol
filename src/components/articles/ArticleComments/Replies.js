import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StringFormat from "string-format";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import { Box, Divider, Button, CircularProgress } from "@material-ui/core";
import Comment from "./Comment";
import ArticleActions from "redux/article.redux";

const Replies = ({ initialReplies, replyCount, commentId }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const dispatch = useDispatch();

  const dispatchGetReplies = params => dispatch(ArticleActions.requestGetRepliesList(commentId, params));
  const replies = useSelector(state => state.articleRedux.repliesList);

  const [repliesList, setRepliesList] = useState(initialReplies);
  const [isLoading, setIsLoading] = useState(false);

  const onGetParams = lastReplyId => ({
    comment_id: commentId,
    lastReplyId: lastReplyId,
    pageSize: AppConstant.DATA_SIZES.articles,
  });

  const onFetchMoreData = () => {
    if (isLoading || !repliesList) return;
    if (repliesList.length >= replyCount) return;
    setIsLoading(true);
    dispatchGetReplies(onGetParams(repliesList[0].commentId));
  };

  useEffect(() => {
    if (replies) {
      setRepliesList([...replies, ...repliesList]);
      setIsLoading(false);
      return;
    }
  }, [replies]);

  return (
    <Box display="flex" mt={1} width="100%">
      <Divider orientation="vertical" className="mr-12" flexItem />
      <Box flexGrow={1}>
        {!isLoading && replyCount > repliesList.length && (
          <Button size="small" className={clsx("blue-text", "mb-8", "ml-n8")} onClick={onFetchMoreData}>
            {StringFormat(getLabel("FM_ARTICLE_SEE_MORE_REPLIES"), replyCount - repliesList.length)}
          </Button>
        )}
        {isLoading && <CircularProgress size={30} className={clsx("mt-4", "mb-4")} />}
        {repliesList.map((reply, index) => (
          <Comment key={index} comment={reply} className={index === repliesList.length - 1 ? null : "mb-8"} />
        ))}
      </Box>
    </Box>
  );
};

Replies.propTypes = {
  initialReplies: PropTypes.array,
  replyCount: PropTypes.number,
  commentId: PropTypes.number,
};

export default Replies;
