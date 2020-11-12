import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, CircularProgress, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import Review from "components/ReviewBox";
import EditionActions from "redux/edition.redux";
import { MAIN_LAYOUT_ID } from "layouts/MainLayout";

const BookReviews = ({ editionId }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);

  const dispatch = useDispatch();
  const dispatchGetBookReviews = data => dispatch(EditionActions.requestGetReviews(data));

  const [reviews, totalReviews] = useSelector(state => [
    state.editionRedux.reviewsList,
    state.editionRedux.totalReviews,
  ]);

  const [reviewsList, setReviewsList] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const onGetBodyReq = pageNum => ({
    editionIds: editionId,
    pageNum: pageNum,
    pageSize: AppConstant.DATA_SIZES.articles,
  });

  const onScroll = e => {
    if (isLoading || !totalReviews || !reviewsList) return;
    if (reviewsList.length >= totalReviews) {
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
    dispatchGetBookReviews(onGetBodyReq(pageNum + 1));
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    const mainLayout = document.querySelector(`#${MAIN_LAYOUT_ID}`);
    mainLayout.addEventListener("scroll", onScroll);
    return () => {
      mainLayout.removeEventListener("scroll", onScroll);
    };
  });

  useEffect(() => {
    dispatchGetBookReviews(onGetBodyReq(pageNum));
  }, []);

  useEffect(() => {
    if (reviewsList) {
      setReviewsList(reviewsList.concat(reviews));
      setIsLoading(false);
      return;
    }
    if (reviews) {
      setReviewsList(reviews);
      setIsLoading(false);
    }
  }, [reviews]);

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} variant="h6">
        {getLabel("TXT_EDITION_USER_COMMENTS")}
      </Typography>
      <Box>
        {reviewsList &&
          reviewsList.map((review, index) => {
            return review ? (
              <Review key={index} review={review} className={classes.review} isReviewType={true} isBookDetail={true} />
            ) : null;
          })}
        {isLoading && <CircularProgress className={classes.loading} />}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: "hidden",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(2),
    },
  },
  loading: {
    margin: theme.spacing(3.5, "auto"),
    display: "inherit",
    textAlign: "center",
  },
  review: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(1),
    },
  },
}));

BookReviews.propTypes = {
  editionId: PropTypes.number,
};

export default BookReviews;
