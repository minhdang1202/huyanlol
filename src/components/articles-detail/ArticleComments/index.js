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
import { AvatarIcon } from "icons";
import { scrollToEl } from "utils";
import ArticleReplyDialog from "./ArticleReplyDialog";
import { getLabel } from "language";
import { AuthDialog } from "components";
import DesktopCommentWrapper from "./DesktopCommentWrapper";

const ArticleComments = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const { getCommonKey } = LangConstant;
  const { isAuth } = useSelector(({ authRedux }) => authRedux);
  const [comments, article, isFetchingComments, newComment] = useSelector(
    ({ articleRedux }) => [
      articleRedux.comments,
      articleRedux.article,
      articleRedux.isFetchingComments,
      articleRedux.newComment,
    ],
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
  const [isOpenReplyDialog, setIsOpenReplyDialog] = useState(false);
  const [isOpenAuthDialog, setIsOpenAuthDialog] = useState(false);
  const [hasSortChange, setHasSortChange] = useState(false);

  const onOpenReplyDialog = () => {
    setIsOpenReplyDialog(true);
  };

  const onCloseReplyDialog = () => {
    setIsOpenReplyDialog(false);
  };

  const onOpenAuthDialog = () => {
    setIsOpenAuthDialog(true);
  };

  const onCloseAuthDialog = () => {
    setIsOpenAuthDialog(false);
  };

  const onScroll = e => {
    // console.log("scroll");
    // console.log(isFetchingComments)
    if (isFetchingComments || !commentCount) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight > scrollTop + clientHeight) return;
    const { isLastPage } = comments;
    if (isLastPage) return;
    dispatchGetComments();
  };

  const onGetParams = () => {
    const commentList = comments?.pageData;
    const lastCommentId = commentList && !hasSortChange ? commentList[commentList.length - 1]?.commentId : null;
    return {
      articleId: articleId,
      lastCommentId,
      pageSize: AppConstant.DATA_SIZES.comments,
      isFriend: sortValue === AppConstant.SORT_FRIEND,
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
    //TODO: Fix scroll in Mobile
    const mainLayout = document.getElementById(MAIN_LAYOUT_ID);
    if (isMobile) {
      mainLayout.addEventListener("scroll", onScroll, true);
      return;
    }
    mainLayout.removeEventListener("scroll", onScroll, true);
  }, [isMobile]);

  useEffect(() => {
    dispatchGetComments();
  }, [sortValue]);

  useEffect(() => {
    if (hasSortChange) setHasSortChange(false);
  }, [comments]);

  useEffect(() => {
    if (newComment.commentId && isMobile) {
      scrollToEl(newComment.commentId);
    }
  }, [newComment]);

  return (
    <Box width="100%">
      {isOpenAuthDialog && <AuthDialog isOpen={true} onClose={onCloseAuthDialog} />}
      {isOpenReplyDialog && (
        <ArticleReplyDialog
          open={true}
          onBackdropClick={onCloseReplyDialog}
          sortValue={sortValue}
          onChangeSort={onChangeSort}
          hasSortChange={hasSortChange}
          onScroll={onScroll}
        />
      )}
      {isOpenSort && (
        <SortPopup
          sortValue={sortValue}
          radioList={RADIO_LIST}
          open={true}
          onClose={onCloseSort}
          onChangeSort={onChangeSort}
        />
      )}
      <Hidden smUp>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={2}>
          <Typography variant="h5">{getLabel(getCommonKey("TXT_COMMENT"))}</Typography>
          <Button endIcon={<Box className="ic-chevron-down" />} className={classes.selectButton} onClick={onOpenSort}>
            <Typography variant="body2">{displaySort}</Typography>
          </Button>
        </Box>
      </Hidden>
      <Box position="relative">
        <Hidden xsDown>
          <Button
            variant="outlined"
            className={clsx("grey-text", "mt-16", classes.commentButton)}
            startIcon={<AvatarIcon />}
            onClick={isAuth ? onOpenReplyDialog : onOpenAuthDialog}
          >
            <Typography variant="subtitle1">{getLabel("TXT_ARTICLE_WRITE_COMMENT")}</Typography>
          </Button>
        </Hidden>
        {!isMobile ? (
          <DesktopCommentWrapper onOpenReplyDialog={onOpenReplyDialog} />
        ) : (
          <CommentWrapper hasSortChange={hasSortChange} />
        )}
        {commentCount > 2 && (
          <Hidden xsDown>
            <Button
              variant="contained"
              className={clsx("light-blue-button", classes.seeAllButton)}
              onClick={onOpenReplyDialog}
            >
              {StringFormat(getLabel("FM_ARTICLE_SEE_ALL_COMMENTS"), commentCount)}
            </Button>
          </Hidden>
        )}
        {isAuth && (
          <Hidden smUp>
            <MobileCommentInput />
          </Hidden>
        )}
      </Box>
    </Box>
  );
};

export const RADIO_LIST = [
  {
    value: AppConstant.SORT_POPULAR,
    label: getLabel("TXT_POPULAR_COMMENT_RANGE"),
    displayLabel: getLabel("TXT_POPULAR_COMMENT"),
    title: getLabel("TXT_POPULAR_COMMENT"),
  },
  {
    value: AppConstant.SORT_FRIEND,
    label: getLabel("TXT_FRIEND_COMMENT_RANGE"),
    displayLabel: getLabel("TXT_FRIEND_COMMENT"),
    title: getLabel("TXT_FRIEND_COMMENT"),
  },
];

export default memo(ArticleComments);

const useStyles = makeStyles(theme => ({
  selectButton: {
    "& .ic-chevron-down": {
      fontSize: 14,
    },
  },
  seeAllButton: {
    width: "100%",
  },
  commentButton: {
    borderRadius: "6px !important",
    width: "100%",
    justifyContent: "flex-start",
    padding: theme.spacing(2),
    borderColor: `${theme.palette.grey[100]} !important`,
  },
}));
