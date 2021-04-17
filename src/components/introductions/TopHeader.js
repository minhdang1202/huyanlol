import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Box, makeStyles, Typography, Hidden, Button, useTheme } from "@material-ui/core";
import { MessageIcon } from "icons";
import { LangConstant } from "const";

const TopHeader = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);

  return (
    <Hidden xsDown>
      <Box className={classes.root}>
        <Box className={clsx(classes.rootContainer, "space-between-root")}>
          <Typography className="medium-xl-txt">{getLabel("TXT_INTRODUCTION_HELP")}</Typography>
          <Button
            variant="contained"
            className={clsx("light-blue-button pl-24 pr-24", classes.button)}
            startIcon={<MessageIcon color={theme.palette.primary.main} />}
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
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2, 3),
    },
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      padding: 0,
    }
  },
  button: {
    minHeight: 38,
    "& svg": {
      marginTop: "2px"
    }
  }
}));
