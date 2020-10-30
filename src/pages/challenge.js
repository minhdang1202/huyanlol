import React from "react";
import MainLayout from "../layouts/MainLayout";
import {
  makeStyles,
  Container,
  Breadcrumbs,
  Link,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
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
} from "../../src/components/ChallengeDetail";
const Challenge = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <MainLayout>
      <Container maxWidth="md" className={classes.root}>
        {!isMobile && (
          <Breadcrumbs separator={">"} aria-label="breadcrumb" className={classes.breadcrumb}>
            <Link color="inherit">Home</Link>
            <Link color="inherit">Challenge</Link>
            <Typography color="textPrimary">Challenge.name</Typography>
          </Breadcrumbs>
        )}
        <Grid container justify="space-between" spacing={0}>
          <Grid container alignItems="center" item xs={12} sm={4} direction="column">
            <Box className={classes.item}>
              <ChallengeCover />
            </Box>
            <Box className={classes.item}>
              <InviteFriend />
            </Box>
            {!isMobile && (
              <Box className={classes.item}>
                <Paper elevation={1} className={classes.logoContainer}>
                  logo
                </Paper>
              </Box>
            )}
          </Grid>

          <Grid container item xs={12} sm={8} direction="column" className={classes.rightContainer}>
            {!isMobile && (
              <Box className={classes.item}>
                <ChallengeInfo />
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
  },
  rightContainer: {
    padding: "0px 20px 0px 20px",
  },
  logoContainer: {
    height: "157px",
  },
}));
export default Challenge;
