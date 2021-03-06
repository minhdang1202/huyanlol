import React from "react";
import { makeStyles, Typography, useTheme, useMediaQuery, Box, Paper } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import LogoIcon from "icons/LogoIcon";
const Company = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  return (
    <Paper elevation={1} className={classes.logoContainer}>
      <Box className={classes.logoOutline}>
        {isMobile ? <LogoIcon width={30} height={15} /> : <LogoIcon width={50} height={25} />}
      </Box>

      <Typography variant="subtitle1" className={classes.coName}>
        {getLabel("L_COMPANY")}
      </Typography>
    </Paper>
  );
};
const useStyles = makeStyles(theme => ({
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
      flexDirection: "row",
      justifyContent: "flex-start",
      padding: theme.spacing(1),
    },
  },
  logoOutline: {
    height: "72px",
    width: "72px",
    borderRadius: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `solid 1px ${theme.palette.text.link}`,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      height: "40px",
      width: "40px",
      margin: theme.spacing(1),
    },
  },
  coName: {
    color: "#2d6291",
    textAlign: "center",
  },
}));
export default Company;
