import React, { useState } from "react";
import { Button, Typography, TextField, Box, makeStyles, InputAdornment } from "@material-ui/core/";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import AuthAction from "redux/auth.redux";
const FIXED_UUID = "f4e25588-e48f-4dd5-b7c5-812f68204be4";

const SignInForm = () => {
  const { t: getText } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const errors = useSelector(state => state.authRedux.errors);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    if (email !== "" && password !== "") {
      dispatch(
        AuthAction.requestLogin({ email, password, uuid: FIXED_UUID, name: null, socialID: null, socialType: null }),
      );
    } else {
      dispatch(AuthAction.authFailure({ errors: [{ details: getText("ERR_INVALID_INPUT") }] }));
    }
  };

  const onShowPassword = () => setShowPassword(!showPassword);
  const onChangeEmail = e => setEmail(e.target.value);
  const onChangePass = e => setPassword(e.target.value);

  return (
    <Box className={classes.form}>
      <TextField
        name="email"
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
        name="password"
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
          errors && (
            <Typography variant="body1" className={classes.errMessage} component="span">
              {errors[0].details}
            </Typography>
          )
        }
        type={showPassword ? "text" : "password"}
        fullWidth
      />
      <Button className={classes.loginBtn} fullWidth variant="contained" color="primary" onClick={onLogin}>
        <Typography variant="h5" className={classes.loginBtnText}>
          {getText("TXT_LOGIN")}
        </Typography>
      </Button>
    </Box>
  );
};

SignInForm.propTypes = {};
export default SignInForm;

const useStyles = makeStyles(theme => ({
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
}));
