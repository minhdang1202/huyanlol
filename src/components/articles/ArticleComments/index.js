import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
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

const ArticleComments = ({ articleId, commentCount }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const { getCommonKey } = LangConstant;
  const RADIO_LIST = [
    {
      value: 0,
      label: getLabel(getCommonKey("TXT_POPULAR_COMMENT_RANGE")),
      displayLabel: getLabel(getCommonKey("TXT_POPULAR_COMMENT")),
    },
    {
      value: 1,
      label: getLabel(getCommonKey("TXT_FRIEND_COMMENT_RANGE")),
      displayLabel: getLabel(getCommonKey("TXT_FRIEND_COMMENT")),
    },
  ];

  const dispatch = useDispatch();
  const dispatchGetComments = params => {
    dispatch(ArticleActions.requestGetCommentsList(articleId, params));
  };

  const [comments, totalComments] = useSelector(state => [
    state.articleRedux.commentsList,
    state.articleRedux.totalComments,
  ]);

  const [isOpenSort, setIsOpenSort] = useState(false);
  const [sortValue, setSortValue] = useState(RADIO_LIST[0].value);
  const [displaySort, setDisplaySort] = useState(RADIO_LIST[sortValue].displayLabel);
  const [commentsList, setCommentsList] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChangeSort, setHasChangeSort] = useState(false);

  const onScroll = e => {
    if (isLoading || !commentsList) return;
    if (commentsList.length >= totalComments) {
      setIsLoading(false);
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight <= scrollTop + clientHeight) {
      onFetchMoreData();
      setIsLoading(true);
    }
  };

  const onGetParams = (pageNum, isFriend = false) => ({
    article_id: articleId,
    pageNum: pageNum,
    pageSize: AppConstant.DATA_SIZES.articles,
    isFriend: isFriend,
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

  const onFetchWithSort = pageNum => {
    switch (sortValue) {
      case 1:
        dispatchGetComments(onGetParams(pageNum, true));
        break;
      default:
        dispatchGetComments(onGetParams(pageNum));
    }
  };

  const onFetchMoreData = () => {
    onFetchWithSort(pageNum + 1);
    setPageNum(pageNum + 1);
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
    dispatchGetComments(onGetParams(pageNum));
  }, []);

  useEffect(() => {
    onFetchWithSort(1);
    setHasChangeSort(true);
  }, [sortValue]);

  useEffect(() => {
    if (commentsList && pageNum != 1) {
      setCommentsList(commentsList.concat(comments));
      setIsLoading(false);
      setHasChangeSort(false);
      return;
    }
    if (comments) {
      setCommentsList(comments);
      setIsLoading(false);
      setHasChangeSort(false);
    }
  }, [comments]);

  return (
    <Box width="100%">
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
        {totalComments === 0 ? (
          <Box py={{ xs: 10, sm: 8 }} className="center-root" flexDirection="column">
            <Box className="ic-comment-alt-dots" />
            <Typography variant="body2" className="grey-text">
              {getLabel("TXT_ARTICLE_FIRST_COMMENT")}
            </Typography>
          </Box>
        ) : (
          <Box mb={{ xs: 4, sm: 5 }} mt={3} className={classes.commentWrapper}>
            <Hidden xsDown>
              <Button
                variant="outlined"
                className={clsx("grey-text", classes.commentButton)}
                startIcon={<AvatarIcon />}
              >
                <Typography variant="subtitle1">{getLabel("TXT_ARTICLE_WRITE_COMMENT")}</Typography>
              </Button>
            </Hidden>
            {!hasChangeSort &&
              commentsList &&
              commentsList.map((comment, index) => {
                if (!isMobile && index >= 2) return;
                const { replies, replyCount, commentId } = comment;
                const hasReply = Boolean(replies);
                return (
                  <Box key={index}>
                    <Comment comment={comment} />
                    {hasReply && (
                      <Hidden smUp>
                        <Replies initialReplies={replies} replyCount={replyCount} commentId={commentId} />
                      </Hidden>
                    )}
                  </Box>
                );
              })}
            {(isLoading || hasChangeSort) && <CircularProgress className={classes.loading} />}
            {commentsList && commentsList.length > commentCount && (
              <Hidden xsDown>
                <Button variant="contained" className={clsx("light-blue-button", classes.seeAllButton)}>
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

ArticleComments.propTypes = {
  articleId: PropTypes.number,
  commentCount: PropTypes.number,
};

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
