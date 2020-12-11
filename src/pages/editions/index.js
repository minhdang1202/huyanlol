import React from "react";
import MainLayout from "layouts/MainLayout";
import { Box, Grid, makeStyles, useTheme, useMediaQuery, Hidden, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { ListCategory, CustomBreadcrumb } from "components";
import { PopularArticles, CollectionBooks } from "components/editions-collection";

const CollectionBooksPage = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const appBarProps = {
    isDetail: true,
    className: classes.appBar,
    appBarTitle: getLabel("TXT_MOST_BORROWING_BOOK"),
  };
  return (
    <MainLayout appBarProps={appBarProps}>
      <Grid container className={classes.root}>
        {!isMobile && (
          <Grid item xs={12} md={12} lg={12}>
            <CustomBreadcrumb />
            <Typography variant="h4" component="h1">
              {getLabel("TXT_MOST_BORROWING_BOOK")}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={8} className={classes.mainContainer}>
          <CollectionBooks />
        </Grid>
        <Grid item md={4} className={classes.rightContainer}>
          <Hidden smDown>
            <Box className={classes.fixedPosition}>
              <PopularArticles />
              <ListCategory />
            </Box>
          </Hidden>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default CollectionBooksPage;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1022,
    margin: "16px auto",
  },
  mainContainer: {
    marginTop: theme.spacing(2),
    paddingRight: 12,
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
    },
  },
  rightContainer: {
    marginTop: theme.spacing(2),
    paddingLeft: 12,
  },
  fixedPosition: {
    width: "100%",
    position: "sticky",
    top: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      position: "relative",
    },
  },
}));
