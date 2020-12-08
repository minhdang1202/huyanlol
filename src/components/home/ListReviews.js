import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { Section, ReviewSummary } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { uuid } from "utils";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ArticleAction from "redux/article.redux";

const ListReviews = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);
  const dispatch = useDispatch();
  const listReviewsRedux = useSelector(({ articleRedux }) => articleRedux.homeReviews.pageData, shallowEqual);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (listReviewsRedux && listReviewsRedux != list) {
      setList(listReviewsRedux);
    }
  }, [listReviewsRedux]);

  useEffect(() => {
    dispatch(ArticleAction.requestHomeReviews(DEFAULT_PARAMS));
  }, []);

  return (
    <Section title={getLabel("TXT_LIST_REVIEWS")}>
      <Box className={classes.root}>
        {list.map(review => (
          <Box key={uuid()} className={classes.item}>
            <ReviewSummary data={review} />
          </Box>
        ))}
      </Box>
    </Section>
  );
};

ListReviews.propTypes = {
  data: PropTypes.array,
};
ListReviews.defaultProps = {};

export default memo(ListReviews);

const DEFAULT_PARAMS = {
  categoryIds: [0],
  pageNum: 1,
  pageSize: 2,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    "& > $item:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  item: {},
}));
