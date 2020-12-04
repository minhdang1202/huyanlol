import React from "react";
import { makeStyles, Typography, Box, Avatar } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { DownloadButtons } from "components";
const ChallengeListDownloadApp = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  return (
    <Box className={classes.root}>
      <Box className={classes.left}>
        <Avatar src="/images/logo-square.png" variant="square" className={classes.logo} />
        <Box>
          <Typography variant="h6">{getLabel("TXT_APPDOWNLOAD_CHALLENGE")}</Typography>
          <Typography variant="body1" color="textSecondary">
            {getLabel("TXT_APPDOWNLOAD_STORE")}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.right}>
        <DownloadButtons />
      </Box>
    </Box>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "1020px",
    background: theme.palette.primary[100],
    borderRadius: "10px",
    height: "127px",
    padding: "24px 40px 24px 40px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      width: "720px",
    },
    "-webkit-box-shadow": "0px 22px 50px -15px rgba(0,0,0,0.15)",
    boxShadow: "0px 22px 50px -15px rgba(0,0,0,0.15)",
  },
  logo: {
    width: "81px",
    height: "81px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "&>*:first-child": {
      marginRight: theme.spacing(3),
    },
  },
  right: {
    width: "320px",
    height: "45px",
  },
  store: {
    width: "121px",
    height: "35px",
  },
}));
export default ChallengeListDownloadApp;
