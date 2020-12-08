import React, { useState, useEffect, memo } from "react";
import { DialogLayout } from "components";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
  Hidden,
  Divider,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import AddingReply from "./AddingReply";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import SortSelect from "./SortSelect";
import CommentWrapper from "../CommentWrapper";
import { RADIO_LIST } from "../index";
import ArticleActions from "redux/article.redux";
import { checkIfLastPage } from "utils";

const ArticleReplyDialog = props => {
  const classes = useStyles();
  const theme = useTheme();
  const isNotMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const [sortValue, setSortValue] = useState(RADIO_LIST[0].value);
  const [hasSortChange, setHasSortChange] = useState(false);
  const [comments, article, isFetchingComments] = useSelector(({ articleRedux }) => [
    articleRedux.comments,
    articleRedux.article,
    articleRedux.isFetchingComments,
  ]);

  const dispatch = useDispatch();
  const dispatchGetComments = pageNum => {
    dispatch(ArticleActions.requestGetComments(onGetParams(pageNum)));
  };

  const onChangeSort = e => {
    setSortValue(e.target.value);
    setHasSortChange(true);
  };

  const onScroll = e => {
    if (isFetchingComments || !comments.length) return;
    const { pageNo, pageSize, total } = comments;
    if (checkIfLastPage({ pageNo, pageSize, total })) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight <= scrollTop + clientHeight) {
      dispatchGetComments(pageNo + 1);
    }
  };

  const onGetParams = pageNum => ({
    articleId: article.articleId,
    pageNum: pageNum,
    pageSize: AppConstant.DATA_SIZES.comments,
    isFriend: sortValue === AppConstant.SORT_FRIEND,
  });

  useEffect(() => {
    if (isNotMobile) dispatchGetComments(1);
  }, [sortValue, isNotMobile]);

  useEffect(() => {
    if (hasSortChange) setHasSortChange(false);
  }, [comments]);

  return (
    <Hidden xsDown>
      <DialogLayout className={classes.root} maxWidth="md" {...props}>
        <DialogTitle disableTypography>
          <AddingReply />
        </DialogTitle>
        <Divider className={classes.divider} />
        <Box className="space-between-root" mb={2} mx={3}>
          <Typography variant="subtitle1" className={classes.listComments}>
            {getLabel("TXT_ARTICLE_LIST_COMMENTS")}
          </Typography>
          <SortSelect value={sortValue} onChange={onChangeSort} />
        </Box>
        <DialogContent onScroll={onScroll}>
          <CommentWrapper sortValue={sortValue} isPopup hasSortChange={hasSortChange} />
        </DialogContent>
      </DialogLayout>
    </Hidden>
  );
};

export default memo(ArticleReplyDialog);

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 670,
  },
  divider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(-1),
  },
}));
