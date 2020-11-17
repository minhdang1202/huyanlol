import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Typography, Link, Box, makeStyles } from "@material-ui/core/";
import clsx from "clsx";
import { GoogleIcon, FacebookIcon } from "icons";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import AuthAction from "redux/auth.redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { AppConstant } from "const/index";
const FIXED_UUID = "f4e25588-e48f-4dd5-b7c5-812f68204be4";

const AuthSocial = ({ isLogin, onChangeForm }) => {
  const { t: getText } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const onFacebookResponse = response => {
    console.log(response);
    const { email, name, id } = response;
    dispatch(AuthAction.requestLoginBySocial({ email, name, socialID: id, socialType: 1, uuid: FIXED_UUID }));
  };

  const onGoogleResponse = response => {
    console.log(response);
  };

  return (
    <Box className={classes.bottom}>
      <Typography className={classes.sclText} variant="body1">
        {getText("TXT_LOGIN_SOCIAL_MEDIA")}
      </Typography>
      <Box className={classes.sclBtnContainer}>
        <FacebookLogin
          appId={AppConstant.APP_FACEBOOK}
          autoLoad={false}
          fields="name,email"
          callback={onFacebookResponse}
          render={renderProps => (
            <Button
              className={clsx(classes.sclBtn, classes.fbBtn)}
              variant="contained"
              color="primary"
              startIcon={<FacebookIcon />}
              onClick={renderProps.onClick}
            >
              <Typography className={classes.sclBtnText} variant="subtitle1">
                Facebook
              </Typography>
            </Button>
          )}
        />
        <GoogleLogin
          clientId={AppConstant.APP_GOOGLE}
          onSuccess={onGoogleResponse}
          cookiePolicy={"single_host_origin"}
          render={renderProps => (
            <Button
              className={clsx(classes.sclBtn, classes.ggBtn)}
              onClick={renderProps.onClick}
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
            >
              <Typography className={classes.sclBtnText} variant="subtitle1">
                Google
              </Typography>
            </Button>
          )}
        />
      </Box>
      <Typography className={classes.footText} variant="body1">
        {isLogin ? getText("TXT_NO_ACC") : getText("TXT_HAVE_ACC")}
        <Link className={classes.resLink} onClick={onChangeForm}>
          {isLogin ? getText("TXT_SIGNUP") : getText("TXT_LOGIN")}
        </Link>
      </Typography>
    </Box>
  );
};

AuthSocial.propTypes = {
  onChangeForm: PropTypes.func,
  isLogin: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  bottom: {
    margin: "24px",
    width: "100%",
    height: "140px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sclText: {
    fontSize: "16px",
    color: theme.palette.text.secondary,
  },
  sclBtnContainer: {
    flexDirection: "row",
    margin: "24px 24px 0px 24px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  sclBtn: {
    width: "48%",
    height: "45px",
    borderRadius: "27px",
    border: "none",
    "&:focus": {
      outline: "none",
    },
  },
  sclBtnText: {
    color: theme.palette.white,
  },

  fbBtn: {
    backgroundColor: "#4b7ccf",
  },
  ggBtn: {
    backgroundColor: "#ec3d34",
  },
  footText: {
    fontSize: "16px",
    color: theme.palette.text.secondary,
    margin: "32px 0px 24px 0px",
  },
  resLink: {
    fontWeight: "600",
    color: theme.palette.primary.main,
  },
}));
export default AuthSocial;
