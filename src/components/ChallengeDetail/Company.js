import React from "react";
import { makeStyles, Typography, useTheme, useMediaQuery, Box, Paper } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import LogoIcon from "../../../src/icons/LogoIcon";
function Company() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  return (
    <Box className={classes.item}>
      <Paper elevation={1} className={classes.logoContainer}>
        <Box className={classes.logoOutline}>
          <LogoIcon />
        </Box>
        <Typography variant="h5" className={classes.coName}>
          {getLabel("L_COMPANY")}
        </Typography>
      </Paper>
    </Box>
  );
}
const useStyles = makeStyles(theme => ({
  logoContainer: {
    height: "157px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  logoOutline: {
    height: "72px",
    width: "72px",
    borderRadius: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `solid 1px ${theme.palette.text.link}`,
  },
  coName: {
    fontSize: "18px",
    color: "#2d6291",
  },
}));
export default Company;
