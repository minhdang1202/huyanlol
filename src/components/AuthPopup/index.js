import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Login from "./Login";
import SignUp from "./Signup";

function AuthPopup() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

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
      <p onClick={doClickOpen}>Login</p>
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

export default AuthPopup;
