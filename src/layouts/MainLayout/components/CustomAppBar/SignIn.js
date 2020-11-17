import React, { useState, useRef } from "react";
import { Box, Button, Menu, MenuItem, IconButton, Avatar, Divider, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { AvatarIcon } from "icons";
import { HEIGHT_APP_BAR } from "./index";
import AuthDialog from "components/AuthDialog/AuthDialog";

const SignIn = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [isAuth, setIsAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenAuth, setIsOpenAuth] = useState(false);

  const usernameBtn = useRef();

  const onOpenMenu = event => {
    setIsOpenMenu(true);
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setIsOpenMenu(false);
    setAnchorEl(null);
  };

  const onTriggerNameBtn = () => {
    usernameBtn.current.click();
  };

  const onTriggerAuthDialog = () => {
    setIsOpenAuth(true);
  };
  const onCloseAuthDialog = () => {
    setIsOpenAuth(false);
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
            open={isOpenMenu}
            onClose={onCloseMenu}
            classes={{ paper: classes.menuPaper, list: classes.menuList }}
          >
            <MenuItem>{getLabel("TXT_APPBAR_PROFILE")}</MenuItem>
            <Divider className={classes.divider} />
            <MenuItem>
              <Button disableRipple className={classes.textBlue} startIcon={<Box className="ic-cloud-download" />}>
                {getLabel("TXT_APPBAR_DOWNLOAD")}
              </Button>
            </MenuItem>
            <MenuItem>{getLabel("TXT_APPBAR_COMMON_QUESTIONS")}</MenuItem>
            <MenuItem>{getLabel("TXT_APPBAR_SIGNOUT")}</MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box className={classes.root}>
          <Button size="large" onClick={onTriggerAuthDialog}>
            {getLabel("TXT_APPBAR_SIGNIN")}
          </Button>
          <IconButton onClick={onTriggerAuthDialog}>
            <AvatarIcon />
          </IconButton>
        </Box>
      )}
      <AuthDialog onClose={onCloseAuthDialog} isOpen={isOpenAuth} />
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
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
    "& li:nth-child(1)": {
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
    },
    "& button:hover": {
      background: "none",
    },
  },
}));

export default SignIn;
