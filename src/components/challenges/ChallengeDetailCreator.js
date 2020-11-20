import React from "react";
import { makeStyles, Typography, Paper, Avatar } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import StringFormat from "string-format";
import { getImageById } from "utils";
import { useSelector } from "react-redux";

const ChallengeDetailCreator = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const { coverImageId, name } = useSelector(state => state.challengeRedux.detail.creator);
  return (
    <Paper elevation={1} className={classes.logoContainer}>
      <Avatar className={classes.avatar} src={getImageById(coverImageId)} />
      <Typography
        variant="body2"
        color="textSecondary"
        dangerouslySetInnerHTML={{
          __html: StringFormat(getLabel("FM_CREATOR"), name),
        }}
      />
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  logoContainer: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    borderRadius: "0px",
    flexDirection: "row",
    justifyContent: "flex-start",
    "&>:nth-child(2)": {
      marginLeft: theme.spacing(1),
    },
  },
  avatar: {
    height: "40px",
    width: "40px",
  },
}));

export default ChallengeDetailCreator;
