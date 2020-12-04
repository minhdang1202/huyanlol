import React, { useState, useRef } from "react";
import { LangConstant, AppConstant } from "const";
import { useTranslation } from "react-i18next";
import { Box, makeStyles, Typography, useTheme, useMediaQuery, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import ChallengeDetailCard from "./ChallengeListDetailCard";
const ChallengeListAll = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_LIST);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const listRecommend = useSelector(state => state.challengeRedux.listRecommend);
  return (
    <Box className={classes.root}>
      <Typography variant="h6">{getLabel("L_RECOMMENDED_CHALLENGE")}</Typography>
      <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
        {listRecommend.map(item => (
          <Grid item key={item.challengeId} xs={12} sm={6} md={6} lg={4}>
            <ChallengeDetailCard
              title={item.title}
              totalJoined={item.challengeSummary.totalJoiner}
              startDate={item.startDate}
              endDate={item.endDate}
              imageId={item.coverId}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    "&>:first-child": {
      marginBottom: theme.spacing(2),
    },
  },
}));
export default ChallengeListAll;
