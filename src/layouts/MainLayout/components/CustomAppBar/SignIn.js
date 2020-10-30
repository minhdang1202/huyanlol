import React, { useState, useRef } from "react";
import { Box, Button, Menu, MenuItem, IconButton, Avatar, Divider, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { AvatarIcon, DownloadIcon } from "icons";
import { HEIGHT_APP_BAR } from "./index";
import AuthDialog from "../../../../components/AuthDialog";
const SignIn = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [isAuth, setIsAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const usernameBtn = useRef();

  const onOpenMenu = event => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const onTriggerNameBtn = () => {
    usernameBtn.current.click();
  };

  const onTriggerAuthDialog = () => {
    setOpenAuth(true);
  };
  const onCloseAuthDialog = () => {
    setOpenAuth(false);
  };
  return (
    <>
      {isAuth ? (
        <Box className={classes.root}>
          <Button ref={usernameBtn} variant="text" className={classes.textPrimary} onClick={onOpenMenu}>
            Trần Việt Phú
          </Button>
          <IconButton onClick={onTriggerNameBtn}>
            <Avatar src="images/img-demo-avatar.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
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
          <Button variant="text" disableRipple onClick={onTriggerAuthDialog}>
            {getLabel("TXT_LOGIN")}
          </Button>
          <IconButton>
            <AvatarIcon />
          </IconButton>
        </Box>
      )}
      <AuthDialog onClose={onCloseAuthDialog} isOpen={openAuth} />
    </>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    position: "relative",
    "&>*:nth-child(1)": {
      marginRight: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    "&>*:nth-child(2)": {
      padding: 0,
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
