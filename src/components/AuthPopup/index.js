import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Login from "./Login";
import SignUp from "./Signup";

function AuthPopup() {
  const [open, setOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const changeForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div>
      <p onClick={handleClickOpen}>Login</p>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        {isLogin ? (
          <Login close={handleClose} changeForm={changeForm} />
        ) : (
          <SignUp close={handleClose} changeForm={changeForm} />
        )}
      </Dialog>
    </div>
  );
}

export default AuthPopup;
