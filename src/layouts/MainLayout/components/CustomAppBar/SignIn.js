import React, { useState } from "react";
import {
  Box,
  Button,
  Menu as MuiMenu,
  MenuItem,
  IconButton,
  Avatar,
  Divider,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { AvatarIcon, DownloadIcon } from "../../../../icons";
import { HEIGHT_APP_BAR } from "./index";

const SignIn = () => {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const onOpenMenu = event => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const onTriggerNameBtn = () => {
    const NameBtn = document.getElementById("name-button");
    NameBtn.click();
  };

  return (
    <>
      {auth ? (
        <Box className={classes.root}>
          <Button id="name-button" variant="text" className={classes.textPrimary} onClick={onOpenMenu}>
            Trần Việt Phú
          </Button>
          <IconButton onClick={onTriggerNameBtn}>
            <Avatar src="images/img-demo-avatar.jpg" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={onCloseMenu}>
            <MenuItem>
              <Button disableRipple>Thông tin cá nhân</Button>
            </MenuItem>
            <Divider className={classes.divider} />
            <MenuItem>
              <Button disableRipple className={classes.textBlue} startIcon={<DownloadIcon />}>
                Tải ứng dụng GAT
              </Button>
            </MenuItem>
            <MenuItem>
              <Button disableRipple>Câu hỏi thường gặp</Button>
            </MenuItem>
            <MenuItem>
              <Button disableRipple>Đăng xuất</Button>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box className={classes.root}>
          <Button variant="text">Đăng nhập</Button>
          <IconButton>
            <AvatarIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    position: "relative",
    "&>*:nth-child(1)": {
      marginRight: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    "&>*:nth-child(2)": {
      padding: 0,
    },
  },
  textPrimary: {
    color: `${theme.palette.text.primary} !important`,
  },
  textBlue: {
    color: theme.palette.primary.main,
  },
  divider: {
    background: "#D2D9DE",
  },
}));

const Menu = withStyles(() => ({
  paper: {
    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    top: `calc(${HEIGHT_APP_BAR} + 5px) !important`,
  },
  list: {
    "& button:hover": {
      background: "none",
    },
  },
}))(MuiMenu);

export default SignIn;
