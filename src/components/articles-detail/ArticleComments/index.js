import React, { useState, useEffect, memo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import StringFormat from "string-format";
import { Typography, Box, Hidden, Button, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import ArticleActions from "redux/article.redux";
import MobileCommentInput from "./MobileCommentInput";
import SortPopup from "./SortPopup";
import CommentWrapper from "./CommentWrapper";
import { MAIN_LAYOUT_ID } from "layouts/MainLayout";
import { scrollToCenterEl } from "utils";
import { getLabel } from "language";
import { AuthDialog } from "components";
import SortSelect from "./ArticleReplyDialog/SortSelect";
import AddingReply from "./ArticleReplyDialog/AddingReply";

const ArticleComments = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const { getCommonKey } = LangConstant;
  const { isAuth } = useSelector(({ authRedux }) => authRedux);
  const { comments, article, isFetchingComments, newComment, isPostReplySuccess } = useSelector(
    ({ articleRedux }) => articleRedux,
    shallowEqual,
  );
  const { commentCount, articleId } = article;
  const dispatch = useDispatch();
  const dispatchGetComments = () => {
    dispatch(ArticleActions.requestGetComments(onGetParams()));
  };

  const [isOpenSort, setIsOpenSort] = useState(false);
  const [sortValue, setSortValue] = useState(RADIO_LIST[0].value);
  const [displaySort, setDisplaySort] = useState(RADIO_LIST[sortValue].displayLabel);
  const [isOpenAuthDialog, setIsOpenAuthDialog] = useState(false);
  const [hasSortChange, setHasSortChange] = useState(false);
  const [isOpenComment, setIsOpenComment] = useState(false);

  const onCloseAuthDialog = () => {
    setIsOpenAuthDialog(false);
  };
  const onOpenComment = () => {
    if (!isOpenComment) setIsOpenComment(true);
  };

  const onScroll = e => {
    if (scrollTimeoutEvent) {
      clearTimeout(scrollTimeoutEvent);
      scrollTimeoutEvent = null;
    }
    if (isFetchingComments || !commentCount) return;
    const { isLastPage } = comments;
    if (isLastPage) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight > scrollTop + clientHeight) return;
    scrollTimeoutEvent = setTimeout(() => {
      dispatchGetComments();
    }, TIMEOUT_SCROLL);
  };

  const onGetParams = () => {
    const commentList = comments?.pageData;
    const lastCommentId = commentList && !hasSortChange ? commentList[commentList.length - 1]?.commentId : null;
    return {
      articleId: articleId,
      lastCommentId,
      pageSize: AppConstant.DATA_SIZES.comments,
      isFriend: sortValue === AppConstant.SORT_COMMENT.byFriend,
    };
  };

  const onOpenSort = () => {
    setIsOpenSort(true);
  };
  const onCloseSort = () => {
    setIsOpenSort(false);
  };
  const onChangeSort = value => {
    setSortValue(value);
    setHasSortChange(true);
    setDisplaySort(RADIO_LIST[value].displayLabel);
  };

  useEffect(() => {
    const mainLayout = document.getElementById(MAIN_LAYOUT_ID);
    if (isMobile) {
      mainLayout.addEventListener("scroll", onScroll, true);
    }
  });

  useEffect(() => {
    //Remove event scroll
    return () => {
      if (isMobile) {
        const mainLayout = document.getElementById(MAIN_LAYOUT_ID);
        mainLayout.removeEventListener("scroll", onScroll, true);
        clearTimeout(scrollTimeoutEvent);
      }
    };
  }, []);

  useEffect(() => {
    dispatchGetComments();
  }, [sortValue]);

  useEffect(() => {
    if (hasSortChange) setHasSortChange(false);
  }, [comments]);

  useEffect(() => {
    if (newComment.commentId) {
      if (isMobile) {
        scrollToCenterEl(newComment.commentId);
        return;
      }
      if (isPostReplySuccess) return;
    }
  }, [newComment, isPostReplySuccess]);

  return (
    <Box width="100%" id={ARTICLE_COMMENT_CONTAINER_ID}>
      {isOpenAuthDialog && <AuthDialog isOpen={true} onClose={onCloseAuthDialog} />}
      {isOpenSort && (
        <SortPopup
          sortValue={sortValue}
          radioList={RADIO_LIST}
          open={true}
          onClose={onCloseSort}
          onChangeSort={onChangeSort}
        />
      )}
      {!isMobile && <AddingReply />}
      {isMobile ? (
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={2}>
          <Typography variant="h5">{getLabel(getCommonKey("TXT_COMMENT"))}</Typography>
          <Button endIcon={<Box className="ic-chevron-down" fontSize={14} />} onClick={onOpenSort}>
            <Typography variant="body2">{displaySort}</Typography>
          </Button>
        </Box>
      ) : (
        <Box className="space-between-root">
          <Typography variant="subtitle1" className={classes.listComments}>
            {getLabel("TXT_ARTICLE_LIST_COMMENTS")}
          </Typography>
          <SortSelect value={sortValue} onChange={e => onChangeSort(e.target.value)} />
        </Box>
      )}

      <Box position="relative">
        <CommentWrapper hasSortChange={hasSortChange} isOpenComment={isOpenComment} />
        {commentCount > 2 && (
          <Hidden xsDown>
            <Button
              variant="contained"
              className={clsx("light-blue-button", classes.seeAllButton)}
              onClick={onOpenComment}
            >
              {isOpenComment
                ? getLabel("TXT_ARTICLE_SEE_ALL_COMMENTS")
                : StringFormat(getLabel("FM_ARTICLE_SEE_ALL_COMMENTS"), commentCount)}
            </Button>
          </Hidden>
        )}
        {isAuth && isMobile && <MobileCommentInput />}
      </Box>
    </Box>
  );
};

export const RADIO_LIST = [
  {
    value: AppConstant.SORT_COMMENT.byPopular,
    label: getLabel("TXT_POPULAR_COMMENT_RANGE"),
    displayLabel: getLabel("TXT_POPULAR_COMMENT"),
    title: getLabel("TXT_POPULAR_COMMENT"),
  },
  {
    value: AppConstant.SORT_COMMENT.byFriend,
    label: getLabel("TXT_FRIEND_COMMENT_RANGE"),
    displayLabel: getLabel("TXT_FRIEND_COMMENT"),
    title: getLabel("TXT_FRIEND_COMMENT"),
  },
];
export const ARTICLE_COMMENT_CONTAINER_ID = "article_comment_container";
export default memo(ArticleComments);

var scrollTimeoutEvent;
var TIMEOUT_SCROLL = 600;

const useStyles = makeStyles(theme => ({
  seeAllButton: {
    width: "100%",
    marginBottom: theme.spacing(5),
  },
  commentButton: {
    borderRadius: "6px !important",
    width: "100%",
    justifyContent: "flex-start",
    padding: theme.spacing(2),
    borderColor: `${theme.palette.grey[100]} !important`,
  },
}));
