import React, { useState } from "react";
import { makeStyles, Box, Avatar, Drawer } from "@material-ui/core";
import { AppConstant } from "const";
import clsx from "clsx";
import { AppLink } from "components";
import MobileDrawer from "./MobileDrawer";

const MobileTopBar = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <Box className={clsx("center-root", classes.root)}>
        <AppLink target="_self" to={AppConstant.WEBSITE_URL} className="no-style-link">
          <Avatar variant="square" src="/images/logo-blue.png" className={classes.logo} />
        </AppLink>
        <Avatar
          onClick={toggleDrawer("left", true)}
          variant="square"
          src="/images/ic-menu.png"
          className={classes.icon}
        />
      </Box>

      <Box>
        <Box key="left">
          <Drawer
            classes={{
              root: classes.drawerRoot,
              paperAnchorLeft: classes.paperAnchorLeft,
            }}
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <MobileDrawer anchor="left" toggleDrawer={toggleDrawer} />
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default MobileTopBar;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#DCF1FD",
    height: 72,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 2100,
    padding: theme.spacing(0, 2),
  },
  drawerRoot: {
    zIndex: "3100 !important",
  },
  paperAnchorLeft: {
    backgroundColor: "#4196c2",
    padding: theme.spacing(2),
    width: "100vw",
  },
  logo: {
    width: 67,
    height: 34,
  },
  icon: {
    width: 34,
    height: 24,
    position: "absolute",
    left: 16,
  },
}));
