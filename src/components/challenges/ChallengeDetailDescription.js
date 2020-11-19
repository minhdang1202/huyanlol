import React, { useState } from "react";
import { makeStyles, Typography, Paper, useTheme, useMediaQuery, Box } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useSelector } from "react-redux";
const Description = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [isFull, setIsFull] = useState(false);
  const description = useSelector(state => state.challengeRedux.description);
  const onChangeContent = () => {
    setIsFull(!isFull);
  };

  return (
    <Paper className={classes.root}>
      <Box className={classes.content}>
        {!isMobile && <Typography variant="h6">{getLabel("L_DESCRIPTION")}</Typography>}
        {isMobile && <Box className={clsx("ic-chat", classes.gray)} />}
        <Typography variant={isMobile ? "body2" : "body1"} className={`${!isFull && "eclipse-3"}`}>
          {description}
        </Typography>
      </Box>
      <Typography variant="subtitle2" className={classes.btn} onClick={onChangeContent}>
        {isFull ? getLabel("L_LESS") : getLabel("L_MORE")}
      </Typography>
    </Paper>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    "&>:nth-child(2)": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
      padding: theme.spacing(2),
    },
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
      flexDirection: "row",
      justifyContent: "space-around",
      "&>:nth-child(2)": {
        marginLeft: theme.spacing(1),
      },
    },
  },
  btn: {
    width: "100px",
    color: theme.palette.text.link,
    padding: "0px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "22px",
    },
  },
  gray: {
    color: theme.palette.text.secondary,
  },
}));

export default Description;
