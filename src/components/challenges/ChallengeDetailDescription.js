import React, { useState } from "react";
import { makeStyles, Typography, Paper, useTheme, useMediaQuery, Box } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
const Description = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [isFull, setIsFull] = useState(false);

  const onChangeContent = () => {
    setIsFull(!isFull);
  };

  return (
    <Paper className={classes.root}>
      <Box className={classes.content}>
        {!isMobile && <Typography variant="h6">{getLabel("L_DESCRIPTION")}</Typography>}
        {isMobile && <Box className="ic-chat" />}
        <Typography variant={isMobile ? "body2" : "body1"} className={`${!isFull && "eclipse-3"}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
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
}));

export default Description;
