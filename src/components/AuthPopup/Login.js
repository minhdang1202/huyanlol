import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import PropTypes from "prop-types";
import { CloseIcon, FbIcon, GgIcon } from "../../../public/images/svg";
import { useTranslation } from "react-i18next";
import vi from "../../language/translations/vi.lang";
const { L_EMAIL, L_PASSWORD, TXT_LOGIN, TXT_SIGNUP, TXT_LOGIN_SOCIAL_MEDIA, TXT_NO_ACC } = vi.auth;
Login.propTypes = {
  changeForm: PropTypes.func,
  close: PropTypes.func,
};
function Login(props) {
  const classes = useStyles();
  const { t: getText } = useTranslation();
  const { changeForm, close } = props;
  return (
    <div className={`${classes.container} ${classes.center}`}>
      <div className={classes.header}>
        <p className={classes.title}>{getText(TXT_LOGIN)}</p>
        <CloseIcon width="19" height="30" onClick={close} fill="#7B93A5" />
      </div>
      <div className={classes.divider}></div>
      <input id="email" placeholder={getText(L_EMAIL)} className={classes.textInput} />
      <input id="password" placeholder={getText(L_PASSWORD)} className={classes.textInput} />

      <button className={classes.loginBtn}>{getText(TXT_LOGIN)}</button>
      <p className={classes.sclText}>{getText(TXT_LOGIN_SOCIAL_MEDIA)}</p>
      <div className={classes.sclBtnContainer}>
        <button className={`${classes.sclBtn} ${classes.fbBtn} ${classes.center}`}>
          <div className={classes.fsclBtnText}>
            <FbIcon width="9" height="18" />
            {` Facebook`}
          </div>
        </button>
        <button className={`${classes.sclBtn} ${classes.ggBtn} ${classes.center}`}>
          <div className={classes.gsclBtnText}>
            <GgIcon width="16" height="16" />
            {` Google`}
          </div>
        </button>
      </div>
      <p className={classes.footText}>
        {getText(TXT_NO_ACC)}
        <span className={classes.resLink} onClick={changeForm}>
          {getText(TXT_SIGNUP)}
        </span>
      </p>
    </div>
  );
}
const useStyles = makeStyles(styles);
export default Login;
