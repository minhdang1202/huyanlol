import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography, Box, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import Review from "./Review";
import Processing from "components/Processing";
import EditionCreators from "redux/edition.redux";

const BookReviews = ({ reviewsList, editionId, onGetBookReviews }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    onGetBookReviews(editionId, pageNum);
  }, []);

  return reviewsList ? (
    <Box className={classes.root}>
      <Typography className={classes.title} variant="h6">
        {getLabel("TXT_EDITION_USER_REVIEWS")}
      </Typography>
      {reviewsList.map((review, index) => {
        return <Review key={index} review={review} />;
      })}
    </Box>
  ) : (
    <Processing isShow={true} />
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
}));

const mapStateToProps = state => {
  return {
    reviewsList: state.editionRedux.reviewsList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetBookReviews: (editionId, pageNum) => dispatch(EditionCreators.requestGetReviews({ editionId, pageNum })),
  };
};

BookReviews.propTypes = {
  reviewsList: PropTypes.array,
  editionId: PropTypes.number,
  onGetBookReviews: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookReviews);
