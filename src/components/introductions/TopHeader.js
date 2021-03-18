import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Box, makeStyles, Typography, Hidden, Button } from "@material-ui/core";
import { MessageIcon } from "icons";
import { LangConstant } from "const";

const TopHeader = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);

  return (
    <Hidden xsDown>
      <Box className={classes.root}>
        <Box className={classes.rootContainer}>
          <Typography className={classes.title}>{getLabel("TXT_INTRODUCTION_HELP")}</Typography>
          <Button
            variant="contained"
            className={clsx("light-blue-button", classes.button)}
            startIcon={<MessageIcon color="#5AA4CC"/>}
          >
            {getLabel("TXT_MESSAGE_WITH_GAT")}
          </Button>
        </Box>
      </Box>
    </Hidden>
  );
};

export default TopHeader;

export const HEIGHT_TOP_HEADER = "56px";

const useStyles = makeStyles(theme => ({
  root: {
    height: HEIGHT_TOP_HEADER,
    backgroundColor: theme.palette.white,
  },
  rootContainer: {
    maxWidth: 1022,
    height: "100%",
    margin: "0px auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2, 3),
    },
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      padding: 0,
    }
  },
  title: {
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.15px",
    color: theme.palette.text.primary
  },
  button: {
    padding: theme.spacing(0, 3),
    minHeight: 38,
    "& svg": {
      marginTop: "2px"
    }
  }
}));
