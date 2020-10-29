import { AppLink } from "components";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
function Login(props) {
  const classes = useStyles(props);
  const { changeForm, close } = props;
  return (
    <div className={`${classes.container} ${classes.center}`}>
      <div className={classes.header}>
        <p className={classes.title}>Đăng Nhập</p>
        <svg
          width="19"
          height="30"
          viewBox="0 0 19 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classes.delIcon}
          onClick={close}
        >
          <path
            d="M11.4336 9.75L17.4688 3.77344L18.6992 2.54297C18.875 2.36719 18.875 2.07422 18.6992 1.83984L17.4102 0.550781C17.1758 0.375 16.8828 0.375 16.707 0.550781L9.5 7.81641L2.23438 0.550781C2.05859 0.375 1.76562 0.375 1.53125 0.550781L0.242188 1.83984C0.0664062 2.07422 0.0664062 2.36719 0.242188 2.54297L7.50781 9.75L0.242188 17.0156C0.0664062 17.1914 0.0664062 17.4844 0.242188 17.7188L1.53125 19.0078C1.76562 19.1836 2.05859 19.1836 2.23438 19.0078L9.5 11.7422L15.4766 17.7773L16.707 19.0078C16.8828 19.1836 17.1758 19.1836 17.4102 19.0078L18.6992 17.7188C18.875 17.4844 18.875 17.1914 18.6992 17.0156L11.4336 9.75Z"
            fill="#7B93A5"
          />
        </svg>
      </div>
      <div className={classes.didiver}></div>
      <input id="email" placeholder="Email" className={classes.textInput} />
      <input id="password" placeholder="Password" className={classes.textInput} />

      <button className={classes.loginBtn}>Đăng nhập</button>
      <p className={classes.sclText}>Đăng nhập bằng mạng xã hội</p>
      <div className={classes.sclBtnConatainer}>
        <button className={`${classes.sclBtn} ${classes.fbBtn}`}>Facebook</button>
        <button className={`${classes.sclBtn} ${classes.ggBtn}`}>Google</button>
      </div>
      <p className={classes.footText}>
        {`Bạn chưa có tài khoản? `}
        <span clAppLinkssName={classes.resLink} onClick={changeForm} style={{ fontWeight: "600", color: "#5aa4cc" }}>
          Đăng ký
        </span>
      </p>
    </div>
  );
}
const useStyles = makeStyles(styles);
export default Login;
