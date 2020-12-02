import React from "react";
import MainLayout from "layouts/MainLayout";
import { Box, Grid, makeStyles, Container, Hidden } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { CollectionTitle } from "components";

const CollectionBooks = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  return (
    <MainLayout>
      <Container>
        <Grid container className={classes.root}>
          <Grid item xs={12} md={12} lg={12} className={classes.titleContainer}>
            <CollectionTitle title={getLabel("TXT_MOST_BORROWING_BOOK")} />
          </Grid>
          <Grid item xs={12} sm={12} md={8} className={classes.mainContainer}>
            This is main
          </Grid>
          <Grid item md={4} className={classes.rightContainer}>
            <Hidden smDown>
              <Box className={classes.fixedPosition}>Fix position</Box>
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default CollectionBooks;

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
  },
  titleContainer: {},
  breadcrumbsLink: {
    color: theme.palette.text.secondary,
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  },
  leftContainer: {
    position: "relative",
    paddingRight: 12,
  },
  mainContainer: { paddingRight: 12, paddingLeft: 12 },
  rightContainer: { paddingLeft: 12 },
  fixedPosition: {
    width: "100%",
    position: "sticky",
    top: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      position: "relative",
    },
  },
}));
