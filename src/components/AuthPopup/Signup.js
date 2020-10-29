import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { IconButton, Button, Typography, Link } from "@material-ui/core/";
import { CloseIcon, FbIcon, GgIcon } from "../../../public/images/svg";
Signup.propTypes = {
  changeForm: PropTypes.func,
  close: PropTypes.func,
};
function Signup(props) {
  const classes = useStyles();
  const { changeForm, close } = props;
  const { t: getText } = useTranslation();
  return (
    <div className={`${classes.container} ${classes.center}`}>
      <div className={classes.header}>
        <Typography className={classes.title}>{getText("TXT_SIGNUP")}</Typography>
        <IconButton classes={classes.center}>
          <CloseIcon width="19" height="19" onClick={close} fill="#7B93A5" />
        </IconButton>
      </div>
      <div className={classes.divider}></div>
      <input id="email" placeholder={getText("L_EMAIL")} className={classes.textInput} />
      <input id="password" placeholder={getText("L_PASSWORD")} className={classes.textInput} />
      <input id="password2" placeholder={getText("L_PASSWORD2")} className={classes.textInput} />
      <Button className={classes.loginBtn}>{getText("TXT_SIGNUP")}</Button>
      <Typography className={classes.sclText}>{getText("TXT_LOGIN_SOCIAL_MEDIA")}</Typography>
      <div className={classes.sclBtnContainer}>
        <Button className={`${classes.sclBtn} ${classes.fbBtn} ${classes.center}`}>
          <div className={classes.fsclBtnText}>
            <FbIcon width="9" height="18" />
            {` Facebook`}
          </div>
        </Button>
        <Button className={`${classes.sclBtn} ${classes.ggBtn} ${classes.center}`}>
          <div className={classes.gsclBtnText}>
            <GgIcon width="16" height="16" />
            {` Google`}
          </div>
        </Button>
      </div>
      <Typography className={classes.footText}>
        {getText("TXT_HAVE_ACC")}

        <Link className={classes.resLink} onClick={changeForm}>
          {getText("TXT_LOGIN")}
        </Link>
      </Typography>
    </div>
  );
}
const useStyles = makeStyles(styles);
export default Signup;
