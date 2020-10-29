import { AppLink } from "components";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

function Signup(props) {
  const classes = useStyles(props);
  return (
    <div className={`${classes.root} ${classes.center}`}>
      <div className={`${classes.container} ${classes.center}`}>
        <div className={classes.header}>
          <p className={classes.title}>Đăng ký</p>
          <svg
            width="19"
            height="30"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={classes.delIcon}
          >
            <path
              d="M11.4336 9.75L17.4688 3.77344L18.6992 2.54297C18.875 2.36719 18.875 2.07422 18.6992 1.83984L17.4102 0.550781C17.1758 0.375 16.8828 0.375 16.707 0.550781L9.5 7.81641L2.23438 0.550781C2.05859 0.375 1.76562 0.375 1.53125 0.550781L0.242188 1.83984C0.0664062 2.07422 0.0664062 2.36719 0.242188 2.54297L7.50781 9.75L0.242188 17.0156C0.0664062 17.1914 0.0664062 17.4844 0.242188 17.7188L1.53125 19.0078C1.76562 19.1836 2.05859 19.1836 2.23438 19.0078L9.5 11.7422L15.4766 17.7773L16.707 19.0078C16.8828 19.1836 17.1758 19.1836 17.4102 19.0078L18.6992 17.7188C18.875 17.4844 18.875 17.1914 18.6992 17.0156L11.4336 9.75Z"
              fill="#7B93A5"
            />
          </svg>
        </div>
        <div className={classes.didiver}></div>
        <input id="email" placeholder="Email" className={classes.textInput} />
        <input id="password" placeholder="Mật khẩu" className={classes.textInput} />
        <input id="password2" placeholder="Xác nhận mật khẩu" className={classes.textInput} />
        <button className={classes.loginBtn}>Đăng ký</button>
        <p className={classes.sclText}>Đăng nhập bằng mạng xã hội</p>
        <div className={classes.sclBtnConatainer}>
          <button className={`${classes.sclBtn} ${classes.fbBtn}`}>Facebook</button>
          <button className={`${classes.sclBtn} ${classes.ggBtn}`}>Google</button>
        </div>
        <p className={classes.footText}>
          {`Bạn đã có tài khoản? `}

          <AppLink clAppLinkssName={classes.resLink} to="login">
            Đăng nhập
          </AppLink>
        </p>
      </div>
    </div>
  );
}
const useStyles = makeStyles({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  root: {
    backgroundColor: "#b1b1b1",
    height: "100vh",
    width: "100vw",
  },
  container: {
    width: "472px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
    borderRadius: "10px",
    padding: "0 24px 0 24px",
  },
  title: {
    width: "109px",
    height: "content",
    fontSize: "22px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#001a39",
  },
  didiver: {
    width: "100%",
    height: "1px",
    backgroundColor: "#d2d9de",
    margin: 0,
  },
  textInput: {
    width: "424px",
    height: "60px",
    boxShadow: "inset 0 -1px 0 0 #d2d9de;",
    margin: "8px",
    border: "none",
    fontSize: "18px",
    color: "#7b93a5",
    paddingLeft: "12px",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: "#7b93a5",
    },
  },
  loginBtn: {
    width: "424px",
    height: "45px",
    borderRadius: "27px",
    backgroundColor: "#5aa4cc",
    color: "#fff",
    border: "none",
    margin: "34px 24px 0px 24px",
    fontSize: "18px",
    fontWeight: "600",
    "&:focus": {
      outline: "none",
    },
  },
  sclText: {
    fontSize: "16px",
    color: "#7b93a5",
    margin: "32px 138.5px 0px 138.5px",
  },
  sclBtnConatainer: {
    width: "424px",
    flexDirection: "row",
    margin: "24px 24px 0px 24px",
    display: "flex",
    justifyContent: "space-between",
  },
  sclBtn: {
    width: "206px",
    height: "45px",
    borderRadius: "27px",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    "&:focus": {
      outline: "none",
    },
  },
  fbBtn: {
    backgroundColor: "#4b7ccf",
  },
  ggBtn: {
    backgroundColor: "#ec3d34",
  },
  footText: {
    fontSize: "16px",
    color: "#7b93a5",
    margin: "32px 0px 24px 0px",
  },
  resLink: {
    fontSize: "19px",
    fontWeight: "600",
    color: "#5aa4cc",
  },
});
export default Signup;
