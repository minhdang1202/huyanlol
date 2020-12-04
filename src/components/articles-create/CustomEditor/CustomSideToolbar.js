import React, { useState } from "react";
import clsx from "clsx";
import { Box, Popper, IconButton, makeStyles } from "@material-ui/core";
import SidebarMenu from "./SidebarMenu";

const CustomSideToolbar = props => {
  const classes = useStyles();
  const [anchorSidebar, setAnchorSidebar] = useState(null);
  const isOpenSidebar = Boolean(anchorSidebar);

  const onOpenSidebar = e => {
    setAnchorSidebar(e.currentTarget);
  };

  const onCloseSidebar = () => {
    setAnchorSidebar(null);
  };

  return (
    <>
      <Popper placement="left-start" className={classes.root} {...props}>
        <IconButton className={clsx(classes.sideButton, isOpenSidebar && classes.open)} onClick={onOpenSidebar}>
          <Box className="ic-plus" fontSize={18} />
        </IconButton>
      </Popper>
      <SidebarMenu
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={isOpenSidebar}
        anchorEl={anchorSidebar}
        onClose={onCloseSidebar}
        className={classes.sidebar}
      />
    </>
  );
};

export default CustomSideToolbar;

const WIDTH_SIDEBAR_BUTTON = "40px";
const HEIGHT_SIDEBAR = "124px";

const useStyles = makeStyles(theme => ({
  root: {
    width: "fit-content",
    height: "fit-content",
    left: `${theme.spacing(-3)}px !important`,
    top: `${theme.spacing(-1)}px !important`,
  },
  sideButton: {
    width: WIDTH_SIDEBAR_BUTTON,
    height: WIDTH_SIDEBAR_BUTTON,
    background: theme.palette.white,
    border: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.grey[300],
  },
  sidebar: {
    "& .MuiPaper-root": {
      marginLeft: `calc(${WIDTH_SIDEBAR_BUTTON} + ${theme.spacing(4)}px)`,
      marginTop: `calc((${WIDTH_SIDEBAR_BUTTON} + ${HEIGHT_SIDEBAR}) / -4 + ${theme.spacing(0.5)}px)`,
    },
  },
  open: {
    transform: "rotate(45deg)",
  },
}));
