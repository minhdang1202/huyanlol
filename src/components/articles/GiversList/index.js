import React, { useState, useEffect } from "react";
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

const GiversList = ({ isOpen, onClose, reactCount, articleId }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const dispatch = useDispatch();
  const dispatchGetGiversList = params => dispatch(ArticleActions.requestGetGiversList(articleId, params));

  const [givers, total] = useSelector(state => [state.articleRedux.giversList, state.articleRedux.totalGivers]);
  const [totalGivers, setTotalGivers] = useState();
  const [giversList, setGiversList] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const onGetParams = pageNum => ({
    id: articleId,
    pageNum: pageNum,
    pageSize: AppConstant.DATA_SIZES.articles,
  });

  const onScroll = e => {
    if (isLoading || !giversList) return;
    if (giversList.length >= totalGivers) {
      setIsLoading(false);
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight <= scrollTop + clientHeight) {
      onFetchMoreData();
      setIsLoading(true);
    }
  };

  const onFetchMoreData = () => {
    dispatchGetGiversList(onGetParams(pageNum + 1));
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    if (isOpen) {
      dispatchGetGiversList(onGetParams(pageNum));
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (giversList && pageNum != 1) {
      setGiversList(giversList.concat(givers));
      setIsLoading(false);
      return;
    }
    if (givers) {
      setGiversList(givers);
      setIsLoading(false);
    }
    if (!totalGivers) {
      setTotalGivers(total);
    }
  }, [givers]);

  return (
    <Dialog open={isOpen} onBackdropClick={() => onClose()}>
      <DialogTitle title={getLabel("TXT_GIVERS")} onClose={() => onClose()} />
      <DialogActions className={classes.action}>
        {totalGivers || totalGivers === 0 ? (
          <Typography variant="subtitle1">{StringFormat(getLabel("FM_GIVERS_BY"), reactCount, totalGivers)}</Typography>
        ) : (
          <Hidden xsDown>
            <Skeleton animation="wave" width="40%" height={30} m="auto" />
          </Hidden>
        )}
      </DialogActions>
      {totalGivers != 0 ? (
        <DialogContent onScroll={onScroll}>
          {giversList &&
            giversList.map((giver, index) => (
              <Box key={index}>
                <Giver {...giver} />
                {index !== totalGivers - 1 ? <Divider /> : null}
              </Box>
            ))}
          {isLoading && <CircularProgress className={classes.loading} />}
        </DialogContent>
      ) : (
        <DialogContent>
          <Typography className={classes.text}>{getLabel("TXT_NO_GIVER")}</Typography>
        </DialogContent>
      )}
    </Dialog>
  );
};

GiversList.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  reactCount: PropTypes.number,
  articleId: PropTypes.number,
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
