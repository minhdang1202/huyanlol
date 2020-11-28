import React from "react";
import MainLayout from "layouts/MainLayout";
import { DownloadApp } from "components/challenges";
import { Box, Grid, makeStyles, Avatar, Typography } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
const Challenge = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_LIST);
  return (
    <MainLayout>
      <Box className={classes.root}>
        <Box>
          <Typography>{getLabel("L_CHALLENGE")}</Typography>
          <Typography variant="h5">{getLabel("L_WITH_GAT")}</Typography>
        </Box>
        <Box>
          <DownloadApp />
        </Box>
      </Box>
    </MainLayout>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "&>*:first-child": {
      height: "570px",
      width: "auto",
      backgroundImage: `url("images/img-challenge-bg.png")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      display: "flex",
      alignItem: "center",
      flexDirection: "column",
      borderRadius: "0 0 20px 20px",
      [theme.breakpoints.down("md")]: {
        height: "443px",
      },
      [theme.breakpoints.down("sm")]: {
        height: "311px",
      },
      "&>*:first-child": {
        fontSize: "60px",
        fontWeight: 500,
      },
    },
    "&>*:nth-child(2)": {
      position: "relative",
      marginTop: "-64px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  },
}));
export default Challenge;
