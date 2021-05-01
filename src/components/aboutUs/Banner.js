import React from "react";
import { makeStyles, Typography, Box, Avatar } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const Banner = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ABOUT_US);

  return (
    <Box className={clsx("center-root", classes.root)}>
      <Avatar variant="square" src="/images/logo-white.png" className={classes.logo} />
      <Typography variant="h5" className={classes.title}>{getLabel("TXT_GIVE_AND_TAKE")}</Typography>
    </Box>
  );
};

export default Banner;

const useStyles = makeStyles(theme => ({
  root: {
    height: 248,
    flexDirection: "column",
    background: `url("./images/img-about-us-banner.png") no-repeat center`,
    backgroundSize: "cover",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      marginBottom: 0
    }
  },
  logo: {
    width: 155,
    height: 80,
  },
  title: {
    color: theme.palette.white,
    fontSize: 45,
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      fontSize: 40,
      marginTop: theme.spacing(4),
    }
  }
}));
