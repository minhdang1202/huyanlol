import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles, useTheme, useMediaQuery, Hidden, Avatar, Typography, Box } from "@material-ui/core";
import { DownloadButtons, MobileDownloadButton } from "components";
import { HEIGHT_IMAGE_MEDIUM, HEIGHT_IMAGE_SMALL } from "./AppDownloadImage";

const AppDownloadContent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation();
  const title = isMobile ? getLabel("TXT_APPDOWNLOAD_TITLE_MOBILE") : getLabel("TXT_APPDOWNLOAD_TITLE");

  return (
    <Box className={classes.root}>
      <Hidden smUp>
        <Avatar className={classes.logo} variant="square" src="/images/logo-app-download.png">
          Logo
        </Avatar>
      </Hidden>
      <Box className={classes.typography}>
        <Typography variant="h5" color="inherit" align="center">
          {title}
        </Typography>
        <Typography color="inherit" align="center">
          {getLabel("TXT_APPDOWNLOAD_SUGGEST")}
        </Typography>
      </Box>
      <Hidden xsDown>
        <DownloadButtons className={classes.downloadButtons} />
      </Hidden>
      <Hidden smUp>
        <MobileDownloadButton size="large" title={getLabel("TXT_APPDOWNLOAD_SUGGEST_BUTTON")} />
      </Hidden>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: `calc(${HEIGHT_IMAGE_MEDIUM} / 2 - 60px)`,
    color: theme.palette.white,
    "& button a:hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: `calc(${HEIGHT_IMAGE_SMALL} / 2 - 55px)`,
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%",
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 0,
    },
  },
  logo: {
    width: "40vw",
    height: "auto",
    marginBottom: theme.spacing(1),
  },
  downloadButtons: {
    padding: theme.spacing(0, 15, 5, 15),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 15, 7, 15),
    },
  },
  typography: {
    "&>*:nth-child(2)": {
      width: "40%",
      margin: "0 auto",
      padding: theme.spacing(1, 0, 2, 0),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2, 0, 3, 0),
      },
      [theme.breakpoints.down("xs")]: {
        width: "60%",
        padding: theme.spacing(2, 0, 7, 0),
      },
      lineHeight: "normal",
    },
  },
}));

export default AppDownloadContent;
