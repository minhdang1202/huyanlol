import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import PropTypes from "prop-types";
import { CloseIcon, FbIcon, GgIcon } from "../../../public/images/svg";
import { IconButton, Button, Typography, Link, Divider, TextField, useTheme, useMediaQuery } from "@material-ui/core/";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

Login.propTypes = {
  changeForm: PropTypes.func,
  close: PropTypes.func,
};
function Login(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getText } = useTranslation();
  const { changeForm, close } = props;
  return (
    <div className={clsx(classes.container, classes.center, isMobile ? classes.mcontainer : classes.dcontainer)}>
      {isMobile ? (
        <div className={classes.mheader}>
          <IconButton>
            <CloseIcon width="12" height="12" onClick={close} fill="#001a39" />
          </IconButton>
          <Typography className={clsx(classes.title, classes.mtitle)}>{getText("TXT_LOGIN")}</Typography>
        </div>
      ) : (
        <div className={classes.header}>
          <Typography className={classes.title}>{getText("TXT_LOGIN")}</Typography>
          <IconButton classes={classes.center}>
            <CloseIcon width="19" height="19" onClick={close} fill="#7B93A5" />
          </IconButton>
        </div>
      )}
      <Divider className={classes.divider} />
      <div className={isMobile ? classes.mcontent : classes.content}>
        <div className={classes.form}>
          <TextField
            id="email"
            label={<Typography className={classes.inputLabel}>{getText("L_EMAIL")}</Typography>}
            className={clsx(classes.textInput, isMobile && classes.mtextInput)}
            inputProps={{ style: styles.textOfInput }}
            InputProps={{ disableUnderline: true }}
            type="email"
            fullWidth
          />
          <TextField
            id="password"
            label={<Typography className={classes.inputLabel}>{getText("L_PASSWORD")}</Typography>}
            className={clsx(classes.textInput, isMobile && classes.mtextInput)}
            inputProps={{ style: styles.textOfInput }}
            InputProps={{ disableUnderline: true }}
            type="password"
            fullWidth
          />
          <Button className={classes.loginBtn} fullWidth>
            {getText("TXT_LOGIN")}
          </Button>
        </div>
        <div className={classes.bottom}>
          <Typography className={classes.sclText}>{getText("TXT_LOGIN_SOCIAL_MEDIA")}</Typography>
          <div className={classes.sclBtnContainer}>
            <Button className={clsx(classes.sclBtn, classes.fbBtn, classes.center)}>
              <div className={classes.fsclBtnText}>
                <FbIcon width="9" height="18" />
                {` Facebook`}
              </div>
            </Button>
            <Button className={clsx(classes.sclBtn, classes.ggBtn, classes.center)}>
              <div className={classes.gsclBtnText}>
                <GgIcon width="16" height="16" />
                {` Google`}
              </div>
            </Button>
          </div>
          <Typography className={classes.footText}>
            {getText("TXT_NO_ACC")}
            <Link className={classes.resLink} onClick={changeForm}>
              {getText("TXT_SIGNUP")}
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
}
const useStyles = makeStyles(styles);
export default Login;
