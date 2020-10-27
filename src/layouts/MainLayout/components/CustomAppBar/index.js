import React, { memo } from "react";
import { makeStyles, AppBar, Toolbar, Avatar, Container, Hidden } from "@material-ui/core";
import AppLink from "../../../../components/AppLink";
import { PathConstant } from "../../../../const";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";

const CustomAppBar = () => {
  const classes = useStyles();

  return (
    <Hidden xsDown>
      <AppBar className={classes.root} elevation={0}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <AppLink to={PathConstant.ROOT}>
              <Avatar variant="square" src="/images/logo.png" alt="logo" className={classes.logo} />
            </AppLink>
            <Container className={classes.searchBar}>
              <SearchBar />
            </Container>
            <SignIn />
          </Toolbar>
        </Container>
      </AppBar>
    </Hidden>
  );
};

CustomAppBar.propTypes = {};
CustomAppBar.defaultProps = {};

export const HEIGHT_APP_BAR = "72px";

const useStyles = makeStyles(theme => ({
  root: {
    position: "sticky",
    background: theme.palette.white,
  },
  toolbar: {
    height: HEIGHT_APP_BAR,
    minHeight: HEIGHT_APP_BAR,
    padding: theme.spacing(1.5, 0),
  },
  logo: {
    width: 64,
    height: "auto",
    maxHeight: HEIGHT_APP_BAR,
  },
  searchBar: {
    maxWidth: 612,
    height: "100%",
  },
}));

export default memo(CustomAppBar);
