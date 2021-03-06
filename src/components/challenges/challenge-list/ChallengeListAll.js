import React, { useState, useEffect, useRef } from "react";
import { LangConstant, AppConstant } from "const";
import { useTranslation } from "react-i18next";
import { Box, makeStyles, Typography, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector, useDispatch } from "react-redux";
import ChallengeDetailCard from "./ChallengeListDetailCard";
import ChallengeAction from "redux/challenge.redux";
import { CommonPagination } from "components";
const ChallengeListAll = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_LIST);
  const dispatch = useDispatch();
  const listRecommendData = useSelector(state => state.challengeRedux.listRecommend);
  const { pageData, total } = listRecommendData;
  const [pageNum, setPageNum] = useState(1);
  const titleRef = useRef();

  useEffect(() => {
    dispatch(
      ChallengeAction.requestGetChallengeListRecommend({
        joinStatusFilter: AppConstant.CHALLENGE_LIST_TYPE.notJoined,
        pageNum: pageNum,
      }),
    );
  }, [pageNum]);

  const onChangePage = (event, value) => {
    setPageNum(value);
    titleRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const getTotalPage = (total, pageSize) => {
    return Math.floor(total / pageSize) + (total % pageSize === 0 ? 0 : 1);
  };
  return (
    <Box className={classes.root}>
      <Typography variant="h6" ref={titleRef}>
        {getLabel("L_RECOMMENDED_CHALLENGE")}
      </Typography>
      <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
        {pageData.map(item => (
          <Grid item key={item.challengeId} xs={12} sm={6} md={6} lg={4}>
            <ChallengeDetailCard
              title={item.title}
              totalJoined={item.challengeSummary.totalJoiner}
              startDate={item.startDate}
              endDate={item.endDate}
              imageId={item.coverId}
              challengeId={item.challengeId}
            />
          </Grid>
        ))}
      </Grid>
      <CommonPagination
        count={getTotalPage(total, AppConstant.DATA_SIZES.challenges)}
        shape="rounded"
        siblingCount={1}
        hidePrevButton
        hideNextButton
        variant="outlined"
        onChange={onChangePage}
      />
    </Box>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    "&>:first-child": {
      marginBottom: theme.spacing(2),
    },
    "& a, a:visited, a:hover, a:active, a:focus": {
      color: `${theme.palette.text.primary} !important`,
      textDecoration: "none !important",
      outline: "none !important",
    },
  },
}));
export default ChallengeListAll;
