import React from "react";
import { makeStyles, Box, Avatar, Typography } from "@material-ui/core";
import { AppConstant, LangConstant, PathConstant } from "const";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { AppLink } from "components";

const TopBar = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ABOUT_US);
  const NAV_LIST = [
    { title: getLabel("TXT_HOME"), linkTo: PathConstant.ROOT },
    { title: getLabel("TXT_INTRODUCTION"), linkTo: PathConstant.ABOUT_US },
    { title: getLabel("TXT_FAQ"), linkTo: PathConstant.FAQ },
  ];

  return (
    <Box className={classes.root}>
      <Box className={clsx("space-between-root", classes.containerRoot)}>
        <AppLink target="_self" to={PathConstant.ROOT} className="no-style-link">
          <Avatar variant="square" src="/images/logo-blue.png" className={classes.logo} />
        </AppLink>
        <Box className={classes.navList}>
          {NAV_LIST.map(({ title, linkTo }, index) => (
            <AppLink key={`top-nav-${index}`} target="_self" to={linkTo} className="no-style-link">
              <Typography className={classes.navItem}>{title}</Typography>
            </AppLink>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TopBar;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#DCF1FD",
    height: 72,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 2100,
    padding: theme.spacing(0, 2)
  },
  containerRoot: {
    maxWidth: 1022,
    margin: "16px auto",
    padding: theme.spacing(0.5, 0),
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      padding: 0
    },
  },
  logo: {
    width: 67,
    height: 34,
  },
  navList: {
    display: "flex",
    "& a:first-child p": {
      fontWeight: 600
    }
  },
  navItem: {
    color: "#4196C2",
    marginRight: theme.spacing(4),
  }
}));
