import React, { useState } from "react";
import { Dialog, useMediaQuery, useTheme, Typography, Box, makeStyles } from "@material-ui/core";
import Login from "./Login";
import SignUp from "./Signup";
import { useTranslation } from "react-i18next";

const AuthPopup = () => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getText } = useTranslation();
  const classes = useStyles();
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChangeForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <Box>
      <Typography onClick={onOpen} className={classes.text}>
        {getText("TXT_LOGIN")}
      </Typography>
      <Dialog onClose={onClose} aria-labelledby="auth-dialog" open={open} fullScreen={isMobile}>
        {isLogin ? (
          <Login close={onClose} changeForm={onChangeForm} />
        ) : (
          <SignUp close={onClose} changeForm={onChangeForm} />
        )}
      </Dialog>
    </Box>
  );
};
const useStyles = makeStyles({
  text: {
    color: "black",
  },
});
export default AuthPopup;
