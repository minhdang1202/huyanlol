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
        <button className={`${classes.sclBtn} ${classes.fbBtn} ${classes.center}`}>
          <div className={classes.fsclBtnText}>
            <svg xmlns="http://www.w3.org/2000/svg" width="9px" height="18px" fill="none" viewBox="0 0 9 16">
              <path
                fill="#fff"
                d="M7.094 2.656h1.531V.125C8.344.094 7.469 0 6.406 0 4.25 0 2.75 1.344 2.75 3.781V6H.375v2.844H2.75V16h2.938V8.844H8L8.375 6H5.687V4.062c0-.843.25-1.406 1.407-1.406z"
              />
            </svg>
            <span style={{ marginleft: "6px" }}>Facebook</span>
          </div>
        </button>
        <button className={`${classes.sclBtn} ${classes.ggBtn} ${classes.center}`}>
          <div className={classes.gsclBtnText}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="18px" fill="none" viewBox="0 0 16 16">
              <path
                fill="#fff"
                d="M15.625 8.188c0-.5-.063-.876-.125-1.282H8.125v2.657H12.5c-.156 1.156-1.313 3.343-4.375 3.343-2.656 0-4.813-2.187-4.813-4.906 0-4.344 5.126-6.344 7.876-3.688l2.124-2.03C11.97 1.031 10.188.25 8.125.25 3.812.25.375 3.719.375 8c0 4.313 3.438 7.75 7.75 7.75 4.469 0 7.5-3.125 7.5-7.563z"
              />
            </svg>
            {` Google`}
          </div>
        </button>
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
