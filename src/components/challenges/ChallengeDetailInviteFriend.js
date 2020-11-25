import React from "react";
import { makeStyles, Typography, Box, Button } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getImageById } from "utils";
import { StringFormat } from "string-format";
import { Avatar } from "components";
import clsx from "clsx";
const InviteFriend = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const friendLeaderBoard = useSelector(state => state.challengeRedux.detail.detailFriendLeaderBoard);
  const leaderBoard = useSelector(state => state.challengeRedux.detail.detailLeaderBoard);
  return (
    <Box className={clsx(classes.root, friendLeaderBoard && friendLeaderBoard.length > 0 && classes.rootNoAvatar)}>
      {friendLeaderBoard && friendLeaderBoard.length > 0 && (
        <AvatarGroup spacing={20} className={classes.avatarGroup}>
          {friendLeaderBoard.map((each, index) =>
            index < 5 ? (
              <Avatar src={getImageById(each.user.imageId)} key={each.user.userId} className={classes.avatar} />
            ) : null,
          )}
        </AvatarGroup>
      )}
      <Box className={friendLeaderBoard && friendLeaderBoard.length > 0 ? classes.content : classes.contentNoAvatar}>
        <Typography
          variant="body2"
          className={clsx(friendLeaderBoard && friendLeaderBoard.length > 0 ? classes.text : classes.textNoAvatar)}
        >
          {friendLeaderBoard && friendLeaderBoard.length > 0
            ? StringFormat(
                getLabel(friendLeaderBoard.length == 1 ? "FM_INVITE_FRIEND_ONE" : "FM_INVITE_FRIEND"),
                friendLeaderBoard[0].user.name,
                leaderBoard.length > friendLeaderBoard && leaderBoard.length - friendLeaderBoard.length - 1,
              )
            : getLabel("TXT_NO_FRIEND_JOINED")}
        </Typography>
        <Button fullWidth color="secondary" variant="contained" className={classes.btn} size="large">
          {getLabel("L_INVITE")}
        </Button>
      </Box>
    </Box>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
      background: theme.palette.white,
      paddingTop: theme.spacing(2),
    },
  },
  rootNoAvatar: {
    paddingTop: 0,
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
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
      background: theme.palette.white,
    },
  },
  avatar: {
    width: "55px",
    height: "55px",
  },
  content: {
    margin: "0px",
    width: "100%",
    padding: `27.5px  24px 24px 24px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px 10px 10px 10px",
    color: theme.palette.text.secondary,
    textAlign: "center",
    background: theme.palette.white,
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
      padding: `16px`,
    },
  },
  contentNoAvatar: {
    width: "100%",
    padding: `24px !important`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px 10px 10px 10px",
    color: theme.palette.text.secondary,
    textAlign: "center",
    background: theme.palette.white,
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
      padding: `0px 16px 16px 16px`,
    },
  },
  text: {
    margin: "16px",
  },
  textNoAvatar: {
    margin: "0px 0px 16px 0px",
  },
  btn: {
    background: "#e9f8ff",
    color: theme.palette.primary.main,
    height: "45px",
    "&:hover": {
      background: "#e9f8ff",
    },
  },
}));
export default InviteFriend;
