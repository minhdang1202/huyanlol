import React from "react";
import { makeStyles, Hidden, Box, Typography } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import { LogoBox } from "components"

const TopBar = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ABOUT_US);

  return (
    <Box className={classes.root}>
      <Hidden xsDown>
        <LogoBox width="100%" imgSrc="/images/img-about-us-story.png" className={classes.logoBox} />
      </Hidden>
      <Box>
        <Typography variant="h4">{getLabel("TXT_I_SAY_ABOUT_GAT")}</Typography>
        <Typography className={classes.subTitle}>{getLabel("TXT_GAT_TELL_STORY")}</Typography>
        <Typography>{getLabel("TXT_GAT_TELL_STORY_BODY")}</Typography>
      </Box>
    </Box>
  );
}

export default TopBar;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 2, 3),
    maxWidth: 1022,
    margin: "16px auto",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3, 2, 3),
    },
  },
  logoBox: {
    width: 299,
    height: 286,
    minWidth: 0,
    border: "none",
    marginRight: theme.spacing(2.5)
  },
  subTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
      paddingLeft: theme.spacing(1),
      marginBottom: theme.spacing(3),
    }
  }
}));