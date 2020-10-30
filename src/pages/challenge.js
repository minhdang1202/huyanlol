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
} from "@material-ui/core";
import { ChallengeDetail, InviteFriend, PositiveMember, Activity } from "../../src/components/ChallengeDetail";
const Challenge = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <MainLayout>
      <Container maxWidth="md" className={classes.root}>
        <Breadcrumbs separator={">"} aria-label="breadcrumb" className={classes.breadcrumb}>
          <Link color="inherit">Home</Link>
          <Link color="inherit">Challenge</Link>
          <Typography color="textPrimary">Challenge.name</Typography>
        </Breadcrumbs>
        <Grid container style={{ display: "flex", alignItem: "center" }}>
          <Grid item xs={12} sm={4}>
            {/* <ChallengeDetail className={classes.item} /> */}
            <Box className={classes.item}>ChallengeDetail</Box>
            <Box className={classes.item}>
              <InviteFriend />
            </Box>
          </Grid>

          <Grid item xs={12} sm={7} className={classes.item}>
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
    background: "tomato",
  },
  breadcrumb: {
    margin: "18px 0px 24px 0px",
    width: "100%",
  },
  item: {
    backgroundColor: "cyan",
    margin: "20px",
  },
}));
export default Challenge;
