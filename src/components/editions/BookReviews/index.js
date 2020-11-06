import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography, Box, CircularProgress, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import Review from "./Review";
import EditionAction from "redux/edition.redux";
import { MAIN_LAYOUT_ID } from "layouts/MainLayout";

const BookReviews = ({ editionId, ...reduxProps }) => {
  const { onGetBookReviews, totalReviews } = reduxProps;
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const [reviewsList, setReviewsList] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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
    onGetBookReviews(editionId, pageNum + 1);
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
    onGetBookReviews(editionId, pageNum);
  }, []);

  useEffect(() => {
    if (reviewsList) {
      setReviewsList(reviewsList.concat(reduxProps.reviewsList));
      setIsLoading(false);
      return;
    }
    if (reduxProps.reviewsList) {
      setReviewsList(reduxProps.reviewsList);
      setIsLoading(false);
    }
  }, [reduxProps.reviewsList]);

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} variant="h6">
        {getLabel("TXT_EDITION_USER_REVIEWS")}
      </Typography>
      <Box>
        {reviewsList &&
          reviewsList.map((review, index) => {
            return review ? <Review key={index} review={review} /> : null;
          })}
        {isLoading && <CircularProgress className={classes.loading} />}
      </Box>
    </Box>
  );
};

export const PAGE_SIZE_REVIEWS = 2;

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
}));

const mapStateToProps = state => {
  const { reviewsList, totalReviews } = state.editionRedux;
  return {
    reviewsList,
    totalReviews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetBookReviews: (editionId, pageNum) => dispatch(EditionAction.requestGetReviews({ editionId, pageNum })),
  };
};

BookReviews.propTypes = {
  editionId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookReviews);
