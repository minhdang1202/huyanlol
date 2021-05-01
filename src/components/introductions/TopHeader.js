import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Box, makeStyles, Typography, Hidden, Button } from "@material-ui/core";
import { AppConstant, LangConstant } from "const";
import { AppLink } from "components";

const TopHeader = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);

  return (
    <Hidden xsDown>
      <Box className={classes.root}>
        <Box className={clsx(classes.rootContainer, "space-between-root")}>
          <Typography className="medium-xl-txt">{getLabel("TXT_INTRODUCTION_HELP")}</Typography>
          <AppLink target="_blank" to={AppConstant.GAT_FB_MESSENGER} className="no-style-link">
            <Button
              variant="contained"
              className={clsx("light-blue-button", classes.button)}
              startIcon={<Box className="ic-comment-alt" fontWeight={400} />}
            >
              {getLabel("TXT_MESSAGE_WITH_GAT")}
            </Button>
          </AppLink>
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
    },
  },
  button: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    minHeight: 38,
    "& svg": {
      marginTop: "2px",
    },
  },
}));
