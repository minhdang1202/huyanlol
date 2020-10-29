import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Login from "./Login";
import SignUp from "./Signup";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

function AuthPopup() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { t: getText } = useTranslation();
  const classes = useStyles();
  const doClickOpen = () => {
    setOpen(true);
  };
  const doClose = () => {
    setOpen(false);
  };
  const doChangeForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div>
      <p onClick={doClickOpen} className={classes.text}>
        {getText("TXT_LOGIN")}
      </p>
      <Dialog onClose={doClose} aria-labelledby="auth-dialog" open={open}>
        {isLogin ? (
          <Login close={doClose} changeForm={doChangeForm} />
        ) : (
          <SignUp close={doClose} changeForm={doChangeForm} />
        )}
      </Dialog>
    </div>
  );
}
const useStyles = makeStyles({
  text: {
    color: "black",
  },
});
export default AuthPopup;
