import React, { memo } from "react";
import { makeStyles, AppBar, Toolbar, Avatar, Container } from "@material-ui/core";
import AppLink from "../../../components/AppLink";
import { PathConstant } from "../../../const";

const CustomAppBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} elevation={0}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <AppLink to={PathConstant.ROOT}>
            <Avatar variant="square" src="/images/logo.png" alt="logo" className={classes.logo} />
          </AppLink>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

CustomAppBar.propTypes = {};
CustomAppBar.defaultProps = {};

export const HEIGHT_APP_BAR = "80px";

const useStyles = makeStyles({
  root: {
    position: "sticky",
  },
  toolbar: {
    height: HEIGHT_APP_BAR,
    minHeight: HEIGHT_APP_BAR,
    paddingLeft: 0,
    paddingRight: 0,
  },
  logo: {
    width: 100,
    height: "auto",
    maxHeight: HEIGHT_APP_BAR,
  },
});

export default memo(CustomAppBar);
