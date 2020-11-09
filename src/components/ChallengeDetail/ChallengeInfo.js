import React from "react";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import { PersonIcon, DateIcon } from "../../icons/index";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
const ChallengeInfo = ({ name, count, from, to }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  return (
    <Paper elevation={1} className={classes.root}>
      <Typography variant="h5" component="h1" className={classes.title}>
        {name}
      </Typography>
      <Typography className={classes.content}>
        <Typography variant="body1" component="span" className={classes.centerText}>
          <PersonIcon />
          <Typography component="span" className={classes.text}>{`${count} ${getLabel("TXT_PEOPLE")}`}</Typography>
        </Typography>
        <Typography variant="body1" component="span" className={classes.centerText}>
          <DateIcon />
          <Typography component="span" className={classes.text}>{`${from} ${getLabel("TXT_To")} ${to}`}</Typography>
        </Typography>
      </Typography>
    </Paper>
  );
};
ChallengeInfo.propTypes = {
  name: PropTypes.string,
  count: PropTypes.number,
  from: PropTypes.string,
  to: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: "24px",
    borderRadius: "10px 10px 0px 0px",
  },
  title: {
    marginBottom: "24px",
  },
  content: {
    display: "flex",
    justifyContent: "flex-start",
    "&>*:nth-child(2)": {
      marginLeft: "40px",
    },
  },
  centerText: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0px 5px 0px",
  },
  text: {
    marginLeft: "8px",
  },
}));
export default ChallengeInfo;
