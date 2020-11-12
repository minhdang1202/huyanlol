import React from "react";
import { makeStyles, Typography, Paper, Box, useTheme, useMediaQuery } from "@material-ui/core";
import PropTypes from "prop-types";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
const ChallengeInfo = ({ name, count, from, to }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  return (
    <Paper elevation={1} className={classes.root}>
      <Typography variant="h5" component="h1" className={classes.title}>
        {name}
      </Typography>
      <Box className={classes.content}>
        <Box className={"ic-person"}>
          <Typography variant={isMobile ? "body2" : "body1"} component="span">{`${count} ${getLabel(
            "TXT_PEOPLE",
          )}`}</Typography>
        </Box>
        <Box className={"ic-date"}>
          <Typography variant={isMobile ? "body2" : "body1"} component="span">{`${from} ${getLabel(
            "TXT_To",
          )} ${to}`}</Typography>
        </Box>
      </Box>
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
    [theme.breakpoints.down("xs")]: {
      borderRadius: "10px 10px 0px 0px ",
      position: "relative",
      marginTop: "-50px",
      zIndex: 10,
    },
  },
  title: {
    marginBottom: "24px",
  },
  content: {
    display: "flex",
    justifyContent: "flex-start",
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
      },
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "18px",
    },
  },
}));
export default ChallengeInfo;
