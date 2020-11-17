import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Menu, MenuItem, IconButton, Avatar, Divider, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { AvatarIcon } from "icons";
import { HEIGHT_APP_BAR } from "./index";
import AuthDialog from "components/AuthDialog";
import { hasLogged } from "utils/auth";
import CookieUtil from "utils/cookie";
import { getImageById } from "utils";
import { useDispatch, useSelector } from "react-redux";
import UserAction from "redux/user.redux";

const SignIn = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const dispatch = useDispatch();
  const cookieData = CookieUtil.getCookieData();
  const profileRedux = useSelector(({ userRedux }) => userRedux.profile);
  const isLogin = hasLogged();

  const [isAuth, setIsAuth] = useState(isLogin);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenAuth, setIsOpenAuth] = useState(false);
  const [profile, setProfile] = useState(profileRedux || cookieData);

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

  useEffect(() => {
    if (profileRedux && profileRedux != profile) {
      setProfile(profileRedux);
    }
  }, [profileRedux]);

  useEffect(() => {
    if (isAuth && !Boolean(profileRedux && profileRedux.userId)) {
      dispatch(UserAction.requestProfile());
    }
  }, [isAuth]);

  useEffect(() => {
    setIsAuth(isLogin);
  }, [isLogin]);

  return (
    <>
      {isAuth ? (
        <Box className={classes.root}>
          <Button size="large" ref={usernameBtn} variant="text" className={classes.textPrimary} onClick={onOpenMenu}>
            {profile.name}
          </Button>
          <IconButton onClick={onTriggerNameBtn}>
            {profile.imageId ? <Avatar src={getImageById(profile.imageId)} /> : <AvatarIcon />}
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
        <Box className={classes.root} onClick={() => setIsOpenAuth(true)}>
          <Button size="large">{getLabel("TXT_APPBAR_SIGNIN")}</Button>
          <IconButton>
            <AvatarIcon />
          </IconButton>
        </Box>
      )}
      <AuthDialog onClose={() => setIsOpenAuth(false)} isOpen={isOpenAuth} />
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
