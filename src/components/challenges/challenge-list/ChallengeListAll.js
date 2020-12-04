import React, { useState, useRef } from "react";
import { LangConstant, AppConstant } from "const";
import { useTranslation } from "react-i18next";
import { Box, makeStyles, Typography, useTheme, useMediaQuery, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector } from "react-redux";
import ChallengeDetailCard from "./ChallengeListDetailCard";
const ChallengeListAll = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_LIST);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const listRecommendData = useSelector(state => state.challengeRedux.listRecommend);
  const { pageData, total } = listRecommendData;
  const getTotalPage = (total, pageSize) => {
    return Math.floor(total / pageSize) + (total % pageSize === 0 ? 0 : 1);
  };
  return (
    <Box className={classes.root}>
      <Typography variant="h6">{getLabel("L_RECOMMENDED_CHALLENGE")}</Typography>
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
      <Pagination
        count={getTotalPage(total, AppConstant.DATA_SIZES.challenges)}
        shape="rounded"
        siblingCount={0}
        hidePrevButton
        hideNextButton
        variant="outlined"
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
    "&>:nth-child(3)": {
      marginTop: theme.spacing(4),

      "& .MuiPaginationItem-root": {
        color: theme.palette.grey[500],
        margin: "0px 8px 0px 0px",
      },
      "& .MuiPaginationItem-page.Mui-selected": {
        background: theme.palette.text.link,
        color: theme.palette.white,
        border: "none",
      },
      "& .MuiPaginationItem-outlined ": {
        border: `1px solid ${theme.palette.grey[300]}`,
      },
    },
  },
}));
export default ChallengeListAll;
