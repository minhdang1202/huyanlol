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
} from "@material-ui/core/";
import clsx from "clsx";
import { CloseIcon, GgIcon, FbIcon } from "../icons";
import { useTranslation } from "react-i18next";
const AuthDialog = ({ onClose, isOpen }) => {
  const [isLogin, setIsLogin] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getText } = useTranslation();
  const classes = useStyles();

  const changeForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <Dialog aria-labelledby="auth-dialog" open={isOpen} fullScreen={isMobile} onClose={onClose}>
      <Box className={clsx(classes.container, classes.center, isMobile ? classes.mcontainer : classes.dcontainer)}>
        {isMobile ? (
          <Box className={classes.mheader}>
            <IconButton onClick={onClose}>
              <CloseIcon fill="#001a39" style={{ fontSize: "12px" }} />
            </IconButton>
            <Typography className={clsx(classes.title, classes.mtitle)}>
              {isLogin ? getText("TXT_LOGIN") : getText("TXT_SIGNUP")}
            </Typography>
          </Box>
        ) : (
          <Box className={classes.header}>
            <Typography variant="h5" className={classes.title}>
              {getText("TXT_LOGIN")}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <Divider className={classes.divider} />
        <Box className={isMobile ? classes.mcontent : classes.content}>
          <Box className={classes.form}>
            <TextField
              id="email"
              label={
                <Typography variant="h5" className={classes.inputLabel}>
                  {getText("L_EMAIL")}
                </Typography>
              }
              className={clsx(classes.textInput, classes.textOfInput, isMobile && classes.mtextInput)}
              // inputProps={{ style: styles.textOfInput }}
              InputProps={{ disableUnderline: true }}
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
              className={clsx(classes.textInput, classes.textOfInput, isMobile && classes.mtextInput)}
              // inputProps={{ style: styles.textOfInput }}
              InputProps={{ disableUnderline: true }}
              type="password"
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
                className={clsx(classes.textInput, classes.textOfInput, isMobile && classes.mtextInput)}
                // inputProps={{ style: styles.textOfInput }}
                InputProps={{ disableUnderline: true }}
                type="password"
                fullWidth
              />
            )}
            <Button className={classes.loginBtn} fullWidth>
              {isLogin ? getText("TXT_LOGIN") : getText("TXT_SIGNUP")}
            </Button>
          </Box>
          <Box className={classes.bottom}>
            <Typography className={classes.sclText}>{getText("TXT_LOGIN_SOCIAL_MEDIA")}</Typography>
            <Box className={classes.sclBtnContainer}>
              <Button className={clsx(classes.sclBtn, classes.fbBtn, classes.center)}>
                <Box className={classes.fsclBtnText}>
                  <FbIcon />
                  {` Facebook`}
                </Box>
              </Button>
              <Button className={clsx(classes.sclBtn, classes.ggBtn, classes.center)}>
                <Box className={classes.gsclBtnText}>
                  <GgIcon />
                  {` Google`}
                </Box>
              </Button>
            </Box>
            <Typography className={classes.footText}>
              {isLogin ? getText("TXT_NO_ACC") : getText("TXT_HAVE_ACC")}
              <Link className={classes.resLink} onClick={changeForm}>
                {isLogin ? getText("TXT_SIGNUP") : getText("TXT_LOGIN")}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

AuthDialog.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};
const useStyles = makeStyles(theme => ({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  container: {
    backgroundColor: theme.palette.white,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  dcontainer: {
    width: "472px",
    borderRadius: "10px",
  },
  mcontainer: {
    width: "100vw",
    height: "100vh",
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
  },
  mheader: {
    width: "100%",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-start",
    paddingLeft: "16px",
    fontSize: "12px",
  },
  title: {
    fontSize: "22px",
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  mtitle: {
    fontSize: "18px",
    margin: "6px",
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
  },
  mcontent: {
    width: "100%",
    height: "100%",
    padding: " 0px 16px 0px 16px",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
  },
  mtextInput: { margin: "20px 0px 20px 0px" },
  textOfInput: {
    fontSize: "18px",
    color: theme.palette.black,
  },
  inputLabel: {
    paddingLeft: "12px",
    color: theme.palette.text.secondary,
  },
  loginBtn: {
    height: "45px",
    borderRadius: "27px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    border: "none",
    margin: "34px 24px 0px 24px",
    fontSize: "18px",
    fontWeight: "600",

    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      backgroundColor: theme.palette.text.disabled,
    },
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
    color: theme.palette.white,
    fontSize: "16px",
    fontWeight: 600,
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      backgroundColor: theme.palette.text.disabled,
    },
  },
  fsclBtnText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "88px",
  },
  gsclBtnText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "75px",
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
