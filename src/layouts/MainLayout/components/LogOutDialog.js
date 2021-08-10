import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Dialog, DialogTitle, DialogContent, Button, Typography, makeStyles, Box } from "@material-ui/core";
import { logout } from "utils/auth";
import { borderRadius } from "@material-ui/system";
const LogOutDialog = ({onClose, isOpen}) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const logOutUser = () => {
    logout();
    onClose();
  }

  return (
    <Dialog className={classes.container} onClose={onClose} open={isOpen}>
      <DialogTitle className = {classes.title}>
        <Typography className={classes.titleText} variant="h6" component="div">
          {getLabel("TXT_LOGOUT")}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.boxTextContent}>
          <Typography className={classes.text} component="div">
            {getLabel("TXT_LOGOUT_QUESTION")}
          </Typography>
        </Box>
        <Box className={classes.boxBtnContent}>
          <Button className={classes.btn} size="medium" variant="contained" onClick={onClose}>
            {getLabel("TXT_CANCEL")}
          </Button>
          <Button className={classes.btn} size="medium" variant="contained" color="primary" onClick={()=>logOutUser()}>
            {getLabel("TXT_LOGOUT")}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

LogOutDialog.PropTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
}; 

const useStyles = makeStyles(theme => ({
  container: {
    margin: '10px',
    width: "385px", 
    borderRadius: "11px",
    margin: "auto auto",
  },
  title: {
    boxShadow: `0px 1px 0px ${theme.palette.divider}`,
  },
  titleText: {
    textAlign: 'center',
    fontSize: "20px",
    color: 'black',
    fontWeight: 500,
  },
  boxTextContent: {
    marginTop: '16px',
    marginBottom: '49px',
  },
  text: {
    fontSize: "16px",
    color: theme.palette.text.primary,
    fontWeight: '400',
    textAlign: 'center'
  },
  boxBtnContent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  btn: {
    width: '130px',
    height: '45px',
    padding : '6px',
    borderRadius: '27px',

  },
}));
export default LogOutDialog;
