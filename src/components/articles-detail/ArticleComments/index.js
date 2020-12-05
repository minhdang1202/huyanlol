import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import StringFormat from "string-format";
import {
  Typography,
  Box,
  Hidden,
  Button,
  makeStyles,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import ArticleActions from "redux/article.redux";
import MobileInput from "./MobileInput";
import SortPopup from "./SortPopup";
import Comment from "./Comment";
import Replies from "./Replies";
import { MAIN_LAYOUT_ID } from "layouts/MainLayout";
import { AvatarIcon } from "icons";
import ArticleReplyDialog from "./ArticleReplyDialog";
import { getLabel } from "language";
import { checkIfLastPage } from "utils";

const ArticleComments = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const { getCommonKey } = LangConstant;

  const { comments, article, isFetchingComments } = useSelector(({ articleRedux }) => articleRedux);
  const { articleId, commentCount } = article;
  const dispatch = useDispatch();
  const dispatchGetComments = pageNo => {
    dispatch(ArticleActions.requestGetComments(onGetParams(pageNo)));
  };

  const [isOpenSort, setIsOpenSort] = useState(false);
  const [sortValue, setSortValue] = useState(RADIO_LIST[0].value);
  const [displaySort, setDisplaySort] = useState(RADIO_LIST[sortValue].displayLabel);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenReplyDialog, setIsOpenReplyDialog] = useState(false);

  const onOpenReplyDialog = () => {
    setIsOpenReplyDialog(true);
  };

  const onCloseReplyDialog = () => {
    setIsOpenReplyDialog(false);
  };

  const onScroll = e => {
    if (isLoading || !comments.length) return;
    const { pageNo, pageSize, total } = comments;
    if (checkIfLastPage({ pageNo, pageSize, total })) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight <= scrollTop + clientHeight) {
      setIsLoading(true);
      dispatchGetComments(pageNo + 1);
    }
  };

  const onGetParams = pageNum => ({
    articleId: articleId,
    pageNum: pageNum,
    pageSize: AppConstant.DATA_SIZES.articles,
    isFriend: sortValue === AppConstant.SORT_FRIEND,
  });

  const onOpenSort = () => {
    setIsOpenSort(true);
  };
  const onCloseSort = () => {
    setIsOpenSort(false);
  };
  const onChangeSort = value => {
    setSortValue(value);
    setDisplaySort(RADIO_LIST[value].displayLabel);
  };

  useEffect(() => {
    if (isMobile) {
      const mainLayout = document.getElementById(MAIN_LAYOUT_ID);
      mainLayout.addEventListener("scroll", onScroll);
      return () => {
        mainLayout.removeEventListener("scroll", onScroll);
      };
    }
  });

  useEffect(() => {
    dispatchGetComments(1);
  }, [sortValue]);

  useEffect(() => {
    setIsLoading(isFetchingComments);
  }, [isFetchingComments]);

  return (
    <Box width="100%">
      <ArticleReplyDialog
        sortValue={sortValue}
        open={isOpenReplyDialog}
        onChangeSort={onChangeSort}
        onBackdropClick={onCloseReplyDialog}
      />
      <SortPopup
        sortValue={sortValue}
        radioList={RADIO_LIST}
        open={isOpenSort}
        onClose={onCloseSort}
        onChangeSort={onChangeSort}
      />
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
            className={clsx("grey-text", "mt-24", classes.commentButton)}
            startIcon={<AvatarIcon />}
            onClick={onOpenReplyDialog}
          >
            <Typography variant="subtitle1">{getLabel("TXT_ARTICLE_WRITE_COMMENT")}</Typography>
          </Button>
        </Hidden>
        {commentCount === 0 ? (
          <Box py={{ xs: 10, sm: 8 }} className="center-root" flexDirection="column">
            <Box className="ic-comment-alt-dots" />
            <Typography variant="body2" className="grey-text">
              {getLabel("TXT_ARTICLE_FIRST_COMMENT")}
            </Typography>
          </Box>
        ) : (
          <Box mb={{ xs: 4, sm: 5 }} mt={3} className={classes.commentWrapper}>
            {comments.pageData &&
              comments.pageData.map((comment, index) => {
                if (!isMobile && index >= 2) return;
                const { replies, replyCount, commentId } = comment;
                return (
                  <Box key={index}>
                    <Comment comment={comment} />
                    {replies && (
                      <Hidden smUp>
                        <Replies initialReplies={replies} replyCount={replyCount} commentId={commentId} />
                      </Hidden>
                    )}
                  </Box>
                );
              })}
            {isLoading && <CircularProgress className={classes.loading} />}
            {comments.pageData?.length < commentCount && (
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
          </Box>
        )}
        <Hidden smUp>
          <MobileInput />
        </Hidden>
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

const useStyles = makeStyles(theme => ({
  selectButton: {
    "& .ic-chevron-down": {
      fontSize: 14,
    },
  },
  seeAllButton: {
    width: "100%",
  },
  commentWrapper: {
    "&>*:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  commentButton: {
    borderRadius: "6px !important",
    width: "100%",
    justifyContent: "flex-start",
    padding: theme.spacing(2),
    borderColor: `${theme.palette.grey[100]} !important`,
  },
  userAvatar: {
    width: 48,
    height: 48,
    marginRight: theme.spacing(1),
  },
  loading: {
    margin: theme.spacing(5, "auto"),
    textAlign: "center",
    display: "inherit",
  },
}));

export default ArticleComments;
