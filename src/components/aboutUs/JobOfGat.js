import React from "react";
import { makeStyles, Divider, Avatar, Box, Typography, Grid } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import JobItem from "./JobItem";

const JobOfGat = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ABOUT_US);
  const JOB_LIST = [
    {
      title: getLabel("TXT_BORROW_BOOK_FREE"),
      body: getLabel("TXT_BORROW_BOOK_FREE_BODY")
    },
    {
      title: getLabel("TXT_ONLINE_BOOKCASE"),
      body: getLabel("TXT_ONLINE_BOOKCASE_BODY")
    },
    {
      title: getLabel("TXT_COMPARE_BOOKSHELVES"),
      body: getLabel("TXT_COMPARE_BOOKSHELVES_BODY")
    },
    {
      title: getLabel("TXT_REVIEW_BOOK"),
      body: getLabel("TXT_REVIEW_BOOK_BODY")
    },
    {
      title: getLabel("TXT_DISCOVER_BOOKSTOP"),
      body: getLabel("TXT_DISCOVER_BOOKSTOP_BODY")
    },
    {
      title: getLabel("TXT_GROUP_SOCIAL_GAT_ON_FB"),
      body: getLabel("TXT_GROUP_SOCIAL_GAT_ON_FB_BODY")
    },
  ]

  return (
    <Box>
      <Box className={classes.triangle}>
        <Avatar variant="square" src="/images/logo-blue.png" className={classes.logo} />
      </Box>
      <Box className={classes.rectangle}>
        <Box className={classes.containerRoot}>
          <Typography className={classes.subtitle}>
            {getLabel("TXT_GAT_BOOK_CONNECT")}
          </Typography>

          <Divider className={classes.dividerRoot} />

          <Typography variant="h5" className={classes.title}> {getLabel("TXT_GAT_JOB")}</Typography>

          <Grid container spacing={2}>
            {JOB_LIST.map(({title, body}, index) => 
              <Grid key={`job-${index}`} item xs={12} sm={6}>
                <JobItem title={title} body={body}/>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default JobOfGat;

const useStyles = makeStyles(theme => ({
  triangle: {
    position: "relative",
    width: 0,
    height: 0,
    borderLeft: "50vw solid transparent",
    borderRight: "50vw solid transparent",
    borderBottom: "65px solid #DCF1FD",
  },
  rectangle: {
    backgroundColor: "#DCF1FD",
    padding: theme.spacing(0, 2)
  },
  containerRoot: {
    maxWidth: 1022,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    paddingBottom: theme.spacing(5.5),
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      padding: theme.spacing(0, 0, 5)
    },
  },
  dividerRoot: {
    height: 2,
    width: "100%",
    backgroundColor: "#E7ECF1",
    margin: theme.spacing(3, 0, 5),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2.5, 0, 3),
    },
  },
  logo: {
    width: 70,
    height: 35,
    position: "absolute",
    top: -25,
    left: -35,
  },
  subtitle: {
    fontWeight: 700,
    textAlign: "center",
    maxWidth: "530px",
    [theme.breakpoints.up("sm")]: {
      fontSize: 18,
    },
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(3.75),
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(2),
    }
  }
}));
