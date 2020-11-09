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
    <Box>
      <Paper elevation={1} className={classes.logoContainer}>
        <Box className={classes.logoOutline}>
          <LogoIcon width={isMobile ? 30 : 50} height={isMobile ? 15 : 25} />
        </Box>
        {isMobile ? (
          <Typography>
            <Typography variant="body2" component="span">
              {`By `}
            </Typography>
            <Typography variant="subtitle2" component="span">
              GAT
            </Typography>
          </Typography>
        ) : (
          <Typography variant="subtitle1" className={classes.coName}>
            {getLabel("L_COMPANY")}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
const useStyles = makeStyles(theme => ({
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
      flexDirection: "row",
      justifyContent: "flex-start",
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
    [theme.breakpoints.down("xs")]: {
      height: "40px",
      width: "40px",
      margin: theme.spacing(1),
    },
  },
  coName: {
    color: "#2d6291",
  },
}));
export default Company;
