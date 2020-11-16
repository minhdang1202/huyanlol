import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Button,
  Typography,
  Link,
  Divider,
  TextField,
  useTheme,
  useMediaQuery,
  Box,
  Dialog,
  makeStyles,
  InputAdornment,
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Processing } from "./index";
import clsx from "clsx";
import { GoogleIcon, FacebookIcon } from "icons";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import AuthAction from "../redux/auth.redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { AppConstant } from "../const/index";
const FIXED_UUID = "f4e25588-e48f-4dd5-b7c5-812f68204be4";

const AuthDialog = ({ onClose, isOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getText } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const isFetching = useSelector(state => state.authRedux.isFetching);
  const errors = useSelector(state => state.authRedux.errors);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onLogin = () => {
    if (email !== "" && password !== "") {
      dispatch(
        AuthAction.requestLogin({ email, password, uuid: FIXED_UUID, name: null, socialID: null, socialType: null }),
      );
    } else {
      dispatch(AuthAction.authFailure({ errors: [{ details: getText("ERR_INVALID_INPUT") }] }));
    }
  };
  const onRegister = () => {
    if (password !== "" && password === password2) {
      dispatch(AuthAction.requestRegister({ email, password }));
    } else {
      dispatch(AuthAction.authFailure({ errors: [{ details: getText("ERR_MISSING_INPUT") }] }));
    }
    setIsLogin(true);
  };

  const onFacebookResponse = response => {
    console.log(response);
    const { email, name, id } = response;
    dispatch(AuthAction.requestLogin({ email, name, socialID: id, socialType: 1, uuid: FIXED_UUID }));
  };

  const onGoogleResponse = response => {
    console.log(response);
  };

  const onChangeForm = () => {
    setIsLogin(!isLogin);
  };
  const onShowPassword = () => setShowPassword(!showPassword);
  const onChangeEmail = e => setEmail(e.target.value);
  const onChangePass = e => setPassword(e.target.value);
  const onChangePass2 = e => setPassword2(e.target.value);

  return (
    <Dialog aria-labelledby="auth-dialog" open={isOpen} fullScreen={isMobile} onClose={onClose}>
      <Box className={classes.container}>
        <Box className={classes.header}>
          <Typography variant="h5" className={classes.title}>
            {isLogin ? getText("TXT_LOGIN") : getText("TXT_SIGNUP")}
          </Typography>
          <IconButton onClick={onClose} className={classes.closeIcon}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.content}>
          <Box className={classes.form}>
            <TextField
              id="email"
              label={
                <Typography variant="h5" className={classes.inputLabel}>
                  {getText("L_EMAIL")}
                </Typography>
              }
              className={classes.textInput}
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.textOfInput,
                },
                autoComplete: "off",
              }}
              value={email}
              onChange={onChangeEmail}
              type="email"
              fullWidth
            />
            <TextField
              id="password"
              label={
                <Typography variant="h5" className={classes.inputLabel}>
                  {getText("L_PASSWORD")}
                </Typography>
              }
              className={classes.textInput}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end" className={classes.inputIcon} onClick={onShowPassword}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </InputAdornment>
                ),
                classes: {
                  input: classes.textOfInput,
                },
              }}
              value={password}
              onChange={onChangePass}
              helperText={
                errors ? (
                  <Typography variant="body1" className={classes.errMessage} component="span">
                    {errors[0].details}
                  </Typography>
                ) : null
              }
              type={showPassword ? "text" : "password"}
              fullWidth
            />
            {!isLogin && (
              <TextField
                id="password2"
                label={
                  <Typography variant="h5" className={classes.inputLabel}>
                    {getText("L_PASSWORD2")}
                  </Typography>
                }
                className={classes.textInput}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end" className={classes.inputIcon} onClick={onShowPassword}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </InputAdornment>
                  ),
                  classes: {
                    input: classes.textOfInput,
                  },
                }}
                value={password2}
                onChange={onChangePass2}
                type={showPassword ? "text" : "password"}
                fullWidth
              />
            )}

            <Button
              className={classes.loginBtn}
              fullWidth
              variant="contained"
              color="primary"
              onClick={isLogin ? onLogin : onRegister}
            >
              <Typography variant={"h5"} className={classes.loginBtnText}>
                {isLogin ? getText("TXT_LOGIN") : getText("TXT_SIGNUP")}
              </Typography>
            </Button>
          </Box>
          <Box className={classes.bottom}>
            <Typography className={classes.sclText} variant="body1">
              {getText("TXT_LOGIN_SOCIAL_MEDIA")}
            </Typography>
            <Box className={classes.sclBtnContainer}>
              <FacebookLogin
                appId={AppConstant.APP_FACEBOOK}
                autoLoad={false}
                fields="name,email,picture"
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
        </Box>
      </Box>
      <Processing isShow={isFetching} />
    </Dialog>
  );
};

AuthDialog.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.white,
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "472px",
    borderRadius: "10px",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  header: {
    width: "100%",
    height: "74px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
    borderRadius: "10px",
    padding: "0 18px 0 24px",
    [theme.breakpoints.down("xs")]: {
      height: "64px",
      flexDirection: "row-reverse",
      justifyContent: "flex-end",
      padding: "0px 0px 0px 16px",
    },
  },
  closeIcon: {
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("xs")]: {
      color: theme.palette.text.primary,
    },
  },
  title: {
    fontSize: "22px",
    fontWeight: 600,
    color: theme.palette.text.primary,
    [theme.breakpoints.down("xs")]: {
      fontSize: "18px",
      margin: "6px",
    },
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: theme.palette.text.disabled,
    margin: 0,
  },
  content: {
    width: "100%",
    padding: " 0px 24px 0px 24px",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      padding: " 0px 16px 0px 16px",
    },
  },
  form: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },

  textInput: {
    height: "60px",
    boxShadow: `inset 0 -1px 0 0 ${theme.palette.text.disabled}`,
    margin: "8px 0px 8px 0px",
    border: "none",
    fontSize: "18px",
    color: theme.palette.text.secondary,
    paddingLeft: "12px",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
      fontWeight: "600",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "20px 0px 20px 0px",
    },
  },
  textOfInput: {
    fontSize: "18px",
    color: theme.palette.black,
    height: "30px",
  },
  inputLabel: {
    fontSize: "18px",
    paddingLeft: "12px",
    color: theme.palette.text.secondary,
  },
  inputIcon: {
    color: theme.palette.text.secondary,
    cursor: "pointer",
  },
  errMessage: {
    fontSize: "14px",
    color: theme.palette.error.main,
  },
  loginBtn: {
    height: "45px",
    borderRadius: "27px",
    backgroundColor: theme.palette.primary.main,

    border: "none",
    margin: "34px 24px 0px 24px",
    "&:focus": {
      outline: "none",
    },
  },
  loginBtnText: {
    fontSize: "18px",
    color: theme.palette.white,
  },
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
export default AuthDialog;
