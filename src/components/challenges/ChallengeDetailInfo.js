import React from "react";
import { makeStyles, Typography, Paper, Box, useTheme, useMediaQuery } from "@material-ui/core";
import { LangConstant, AppConstant } from "const";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import StringFormat from "string-format";
import { convertFormat } from "utils/date";
const ChallengeInfo = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const info = useSelector(state => state.challengeRedux.detail);
  const { title, startDate, endDate, challengeSummary } = info;
  return (
    <Paper elevation={1} className={classes.root}>
      <Typography variant="h5" component="h1" className={classes.title}>
        {title}
      </Typography>
      <Box className={classes.content}>
        <Box className="ic-person">
          <Typography variant={isMobile ? "body2" : "body1"} component="span">
            {StringFormat(getLabel("FM_JOINED"), challengeSummary.totalJoiner)}
          </Typography>
        </Box>
        <Box className="ic-date">
          <Typography variant={isMobile ? "body2" : "body1"} component="span">
            {StringFormat(
              getLabel("FM_DUE_TIME"),
              convertFormat(new Date(startDate), AppConstant.FM_DD_MM_YYYY),
              convertFormat(new Date(endDate), AppConstant.FM_DD_MM_YYYY),
            )}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: "24px",
    borderRadius: "10px 10px 0px 0px",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "10px 10px 0px 0px ",
      position: "relative",
      marginTop: "-50px",
      zIndex: 10,
      padding: theme.spacing(2),
    },
  },
  title: {
    marginBottom: "24px",
  },
  content: {
    display: "flex",
    justifyContent: "flex-start",
    color: theme.palette.text.secondary,
    fontSize: "20px",
    "&>*:nth-child(2)": {
      marginLeft: "40px",
    },
    "&>*": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      "&>*:nth-child(1)": {
        marginLeft: "8px",

        color: theme.palette.text.primary,
      },
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "18px",
    },
  },
}));
export default ChallengeInfo;
