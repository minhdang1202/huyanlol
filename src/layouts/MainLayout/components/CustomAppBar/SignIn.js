import React, { useState, useRef } from "react";
import { Box, Button, Menu, MenuItem, IconButton, Avatar, Divider, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { AvatarIcon, DownloadIcon } from "icons";
import { HEIGHT_APP_BAR } from "./index";

const SignIn = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [isAuth, setIsAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const usernameBtn = useRef();

  const onOpenMenu = event => {
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  const onTriggerNameBtn = () => {
    usernameBtn.current.click();
  };

  return (
    <>
      {isAuth ? (
        <Box className={classes.root}>
          <Button size="large" ref={usernameBtn} variant="text" className={classes.textPrimary} onClick={onOpenMenu}>
            Trần Việt Phú
          </Button>
          <IconButton onClick={onTriggerNameBtn}>
            <Avatar src="/images/img-demo-avatar.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={onCloseMenu}
            classes={{ paper: classes.menuPaper, list: classes.menuList }}
          >
            <MenuItem>
              <Button disableRipple>{getLabel("TXT_APPBAR_PROFILE")}</Button>
            </MenuItem>
            <Divider className={classes.divider} />
            <MenuItem>
              <Button disableRipple className={classes.textBlue} startIcon={<DownloadIcon />}>
                {getLabel("TXT_APPBAR_DOWNLOAD")}
              </Button>
            </MenuItem>
            <MenuItem>
              <Button disableRipple>{getLabel("TXT_APPBAR_COMMON_QUESTIONS")}</Button>
            </MenuItem>
            <MenuItem>
              <Button disableRipple>{getLabel("TXT_APPBAR_SIGNOUT")}</Button>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box className={classes.root}>
          <Button size="large">{getLabel("TXT_APPBAR_SIGNIN")}</Button>
          <IconButton>
            <AvatarIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    "&>*:nth-child(1)": {
      marginRight: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    "&>*:nth-child(2)": {
      padding: 0,
      height: "fit-content",
    },
  },
  textPrimary: {
    color: `${theme.palette.text.primary} !important`,
  },
  textBlue: {
    color: theme.palette.primary.main,
  },
  divider: {
    background: "#D2D9DE",
  },
  menuPaper: {
    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    top: `calc(${HEIGHT_APP_BAR} + 5px) !important`,
  },
  menuList: {
    "& button:hover": {
      background: "none",
    },
  },
}));

export default SignIn;
