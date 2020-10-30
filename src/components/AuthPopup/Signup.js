import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import PropTypes from "prop-types";
import { CloseIcon, GgIcon, FbIcon } from "../../icons";
import {
  IconButton,
  Button,
  Typography,
  Link,
  Divider,
  TextField,
  useTheme,
  useMediaQuery,
  Box,
} from "@material-ui/core/";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
Signup.propTypes = {
  changeForm: PropTypes.func,
  close: PropTypes.func,
};
function Signup(props) {
  const { changeForm, close } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getText } = useTranslation();
  return (
    <Box className={clsx(classes.container, classes.center, isMobile ? classes.mcontainer : classes.dcontainer)}>
      {isMobile ? (
        <Box className={classes.mheader}>
          <IconButton onClick={close}>
            <CloseIcon fill="#001a39" style={{ fontSize: "12px" }} />
          </IconButton>
          <Typography className={clsx(classes.title, classes.mtitle)}>{getText("TXT_SIGNUP")}</Typography>
        </Box>
      ) : (
        <Box className={classes.header}>
          <Typography className={classes.title}>{getText("TXT_SIGNUP")}</Typography>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <Divider className={classes.divider} />
      <Box className={isMobile ? classes.mcontent : classes.content}>
        <Box className={classes.form}>
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
          <TextField
            id="password2"
            label={<Typography className={classes.inputLabel}>{getText("L_PASSWORD2")}</Typography>}
            className={clsx(classes.textInput, isMobile && classes.mtextInput)}
            inputProps={{ style: styles.textOfInput }}
            InputProps={{ disableUnderline: true }}
            type="password"
            fullWidth
          />
          <Button className={classes.loginBtn} fullWidth>
            {getText("TXT_SIGNUP")}
          </Button>
        </Box>
        <Box className={classes.bottom}>
          <Typography className={classes.sclText}>{getText("TXT_LOGIN_SOCIAL_MEDIA")}</Typography>
          <Box className={classes.sclBtnContainer}>
            <Button className={clsx(classes.sclBtn, classes.fbBtn, classes.center)}>
              <Box className={classes.fsclBtnText}>
                <FbIcon width="9" height="18" />
                {` Facebook`}
              </Box>
            </Button>
            <Button className={clsx(classes.sclBtn, classes.ggBtn, classes.center)}>
              <Box className={classes.gsclBtnText}>
                <GgIcon width="16" height="16" />
                {` Google`}
              </Box>
            </Button>
          </Box>
          <Typography className={classes.footText}>
            {getText("TXT_HAVE_ACC")}
            <Link className={classes.resLink} onClick={changeForm}>
              {getText("TXT_LOGIN")}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
const useStyles = makeStyles(styles);
export default Signup;
