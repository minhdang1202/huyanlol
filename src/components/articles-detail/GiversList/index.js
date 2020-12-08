import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, makeStyles, DialogContent, Divider, Box, Hidden, CircularProgress } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import StringFormat from "string-format";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { AppConstant } from "const";
import Dialog from "components/DialogLayout";
import DialogTitle from "components/DialogLayout/DialogTitle";
import DialogActions from "components/DialogLayout/DialogActions";
import Giver from "./Giver";
import ArticleActions from "redux/article.redux";
import { checkIfLastPage } from "utils";

const GiversList = ({ isOpen, onClose, reactCount, commentId, articleId }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const dispatch = useDispatch();
  const dispatchGetGivers = pageNum =>
    commentId
      ? dispatch(ArticleActions.requestGetCommentGivers(onGetParams(pageNum)))
      : dispatch(ArticleActions.requestGetGivers(onGetParams(pageNum)));

  const [currentGivers, isFetchingGivers] = useSelector(({ articleRedux }) => [
    commentId ? articleRedux.commentGivers[commentId] : articleRedux.articleGivers[articleId],
    articleRedux.isFetchingGivers,
  ]);

  const givers = currentGivers?.pageData;
  const pageNo = currentGivers?.pageNo;
  const pageSize = currentGivers?.pageSize;
  const total = currentGivers?.total;

  const onGetParams = pageNum => {
    const params = {
      pageNum: pageNum,
      pageSize: AppConstant.DATA_SIZES.articles,
    };
    if (commentId) params.commentId = commentId;
    if (articleId) params.articleId = articleId;
    return params;
  };

  const onScroll = e => {
    if (isFetchingGivers || !givers.length) return;
    if (checkIfLastPage({ pageNo, pageSize, total })) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight <= scrollTop + clientHeight) {
      dispatchGetGivers(pageNo + 1);
    }
  };

  useEffect(() => {
    if (!givers) {
      // dispatchGetGivers(1);
    }
  }, []);

  return (
    <Dialog open={isOpen} onBackdropClick={onClose}>
      <DialogTitle title={getLabel("TXT_GIVERS")} onClose={onClose} />
      <DialogActions className={classes.action}>
        {!isFetchingGivers ? (
          <Typography variant="subtitle1">{StringFormat(getLabel("FM_GIVERS_BY"), reactCount, total)}</Typography>
        ) : (
          <Skeleton animation="wave" width="40%" height={30} m="auto" />
        )}
      </DialogActions>
      <DialogContent onScroll={onScroll}>
        {reactCount ? (
          <>
            {givers &&
              givers.map((giver, index) => (
                <Box key={index}>
                  <Giver data={giver} />
                  {index !== givers.length - 1 ? <Divider /> : null}
                </Box>
              ))}
            {isFetchingGivers && <CircularProgress size={26} className={classes.loading} />}
          </>
        ) : (
          <Typography className={classes.text}>{getLabel("TXT_NO_GIVER")}</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

GiversList.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  reactCount: PropTypes.number,
  articleId: PropTypes.number,
  commentId: PropTypes.number,
};

const useStyles = makeStyles(theme => ({
  action: {
    "& > *": {
      marginRight: "auto",
    },
  },
  loading: {
    margin: theme.spacing(5, "auto"),
    textAlign: "center",
    display: "inherit",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(5, "auto"),
    },
  },
  text: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(3, 0),
  },
}));

export default GiversList;
