import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import {
  makeStyles,
  Container,
  Breadcrumbs,
  Link,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
  Grid,
  Paper,
} from "@material-ui/core";
import {
  ChallengeCover,
  InviteFriend,
  PositiveMember,
  Activity,
  ChallengeInfo,
  Goal,
} from "../../../src/components/ChallengeDetail";
import { LogoIcon } from "../../icons/index";
const Challenge = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  return (
    <MainLayout>
      <Container maxWidth="md" className={classes.root}>
        {!isMobile && (
          <Breadcrumbs separator={">"} aria-label="breadcrumb" className={classes.breadcrumb}>
            <Link>{getLabel("L_HOME")}</Link>
            <Link>{getLabel("L_CHALLENGE")}</Link>
            <Typography>Challenge.name</Typography>
          </Breadcrumbs>
        )}
        <Grid container justify="space-between" spacing={0}>
          <Grid container alignItems="center" item xs={12} sm={4} direction="column">
            <Box className={classes.item}>
              <ChallengeCover />
            </Box>
            {isMobile && (
              <Box className={classes.item}>
                <ChallengeInfo />
                <Goal goal="personal goal" />
              </Box>
            )}
            <Box className={classes.item}>
              <InviteFriend />
            </Box>
            {!isMobile && (
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
            )}
          </Grid>

          <Grid container item xs={12} sm={8} direction="column" className={classes.rightContainer}>
            {!isMobile && (
              <Box className={classes.item}>
                <ChallengeInfo name="asdasdasda" count={6969} from="00/00/0000" to="00/00/0000" />
                <Goal goal="personal goal" />
              </Box>
            )}
            <Box className={classes.item}>
              <PositiveMember />
            </Box>
            <Box className={classes.item}>
              <Activity />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  breadcrumb: {
    margin: "18px 0px 24px 0px",
    width: "100%",
  },
  item: {
    width: "100%",
    margin: "10px 0px 10px 0px",
    [theme.breakpoints.down("xs")]: {
      margin: "4px",
    },
  },
  rightContainer: {
    padding: "0px 20px 0px 20px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },
  },
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
export default Challenge;
