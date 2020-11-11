import React from "react";
import { makeStyles, Typography, Paper, Box, Button, Avatar } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
const InviteFriend = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  return (
    <Paper className={classes.root}>
      <AvatarGroup spacing={20} className={classes.avatarGroup}>
        <Avatar alt="Trump" src="/images/img-avatar.jpg" className={classes.avatar} />
        <Avatar alt="Trump" src="/images/img-avatar.jpg" className={classes.avatar} />
        <Avatar alt="Trump" src="/images/img-avatar.jpg" className={classes.avatar} />
        <Avatar alt="Trump" src="/images/img-avatar.jpg" className={classes.avatar} />
        <Avatar alt="Trump" src="/images/img-avatar.jpg" className={classes.avatar} />
      </AvatarGroup>
      <Box className={classes.content}>
        <Typography variant="body2" className={classes.text}>
          Nan, Hoa, Xe, Đạp và 122 người khác tham gia thử thách này
        </Typography>
        <Button fullWidth color="primary" variant="contained" className={classes.btn} size="large">
          {getLabel("L_INVITE")}
        </Button>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
      background: theme.palette.white,
    },
  },
  avatarGroup: {
    margin: "0px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: "-27.5px",
    zIndex: "0",
  },
  avatar: {
    width: "55px",
    height: "55px",
  },
  content: {
    margin: "0px",
    width: "100%",
    padding: "27.5px  16px 16px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px 10px 10px 10px",
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
  text: {
    margin: "16px",
  },
  btn: {
    background: "#e9f8ff",
    color: theme.palette.primary.main,
    height: "45px",
  },
}));
export default InviteFriend;
