import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, makeStyles, Typography, Box, useTheme, useMediaQuery, Avatar, Button } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import StringFormat from "string-format";
import clsx from "clsx";
import { getImageById } from "utils";
import { getLabel } from "language";
import { AppConstant } from "const";
const ChallengeDetailLeaderBoardPopup = ({ isOpen }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const [isFollowedTab, setIsFollowedTab] = useState(false);
  const leaderBoard = useSelector(state => state.challengeRedux.detailLeaderBoard);
  const friendLeaderBoard = useSelector(state => state.challengeRedux.detailFriendLeaderBoard);
  const list = isFollowedTab ? friendLeaderBoard : leaderBoard;
  return (
    <Dialog open={isOpen} fullWidth={true} maxWidth="sm">
      <Box className={classes.root}>
        <Box>top part</Box>
        <Box className={classes.tab}>
          <Typography
            component="div"
            className={!isFollowedTab && classes.activeTab}
            onClick={() => setIsFollowedTab(false)}
            variant={!isFollowedTab ? "subtitle1" : "body1"}
          >
            {getLabel("L_ALL")}
          </Typography>
          <Typography
            component="div"
            className={isFollowedTab && classes.activeTab}
            onClick={() => setIsFollowedTab(true)}
            variant={isFollowedTab ? "subtitle1" : "body1"}
          >
            {getLabel("L_FOLLOWED")}
          </Typography>
        </Box>
        <Box>
          {list.map((each, index) => (
            <Item key={each.user.userId} data={each} isFollowedTab={isFollowedTab} place={index + 1} />
          ))}
        </Box>
      </Box>
    </Dialog>
  );
};

const Item = ({ data, isFollowedTab, place }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const classes = useStyles();
  const { user } = data;
  const detailInfo = useSelector(state => state.challengeRedux.detailInfo);
  const target = useSelector(state => state.challengeRedux.detailInfo.challengeProgress.targetNumber);
  const { targetType, following } = detailInfo;

  const isRead = Boolean(
    targetType === AppConstant.CHALLENGE_TARGET_TYPE.readBook ||
      targetType === AppConstant.CHALLENGE_TARGET_TYPE.readBookList,
  );
  const certificate = place => {
    switch (place) {
      case 1:
        return classes.first;
      case 2:
        return classes.second;
      case 3:
        return classes.third;
      default:
        return classes.fourth;
    }
  };
  return (
    <Box className={classes.item}>
      {place < 10 ? (
        <Box className={classes.badgeContainer}>
          <Typography variant="subtitle2">{place}</Typography>
          <Box className={clsx(classes.badge, certificate(place), "ic-certificate")} />
        </Box>
      ) : (
        <Typography variant="subtitle2" className={classes.placeText}>
          {place < 1000 ? place : "1k+"}
        </Typography>
      )}
      <Box>
        <Box className={classes.infoGroup}>
          <Avatar src={getImageById(user.imageId)} className={classes.avatar} />
          <Box>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2">
              {StringFormat(
                getLabel(isRead ? "FM_PROGRESS_LEADER_BOARD" : "FM_PROGRESS_REVIEW_LEADER_BOARD"),
                data.progress,
                target,
              )}
            </Typography>
          </Box>
        </Box>
        {!isFollowedTab && (
          <Button variant="contained" color="primary" size="small" className={following ? classes.followingBtn : null}>
            {getLabel(following ? "L_FOLLOWED" : "L_FOLLOW")}
          </Button>
        )}
      </Box>
    </Box>
  );
};

ChallengeDetailLeaderBoardPopup.propTypes = {
  isOpen: PropTypes.bool,
};
ChallengeDetailLeaderBoardPopup.defaultProps = {
  isOpen: true,
};

Item.propTypes = {
  data: PropTypes.object,
  isFollowedTab: PropTypes.bool,
  place: PropTypes.number,
};
const useStyles = makeStyles(theme => ({
  root: {
    "&>*": {
      padding: theme.spacing(2),
    },
    "&>:nth-child(2)": {
      padding: 0,
    },
    "&>:nth-child(3)": {
      height: 380,
      overflow: "scroll",
    },
  },
  tab: {
    "&>*": {
      width: "50%",
      height: "45px",
      textAlign: "center",
      cursor: "pointer",
      padding: "12px 0 12px 0",
      boxShadow: `0 1px 0 0 ${theme.palette.grey[100]}`,
    },
    display: "flex",
    color: theme.palette.text.secondary,
  },
  activeTab: {
    color: theme.palette.text.link,
    borderBottom: `2px solid ${theme.palette.text.link}`,
  },
  avatar: {
    width: "56px",
    height: "56px",
    margin: "24px 16px 24px 0px",
  },
  infoGroup: {
    display: "flex",
    alignItems: "center",
  },
  item: {
    boxShadow: `0 1px 0 0 ${theme.palette.grey[100]}`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "&>:nth-child(2)": {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      "&>:nth-child(2)": {
        height: "43px",
        width: "150px",
      },
    },
  },
  followingBtn: {
    color: theme.palette.text.link,
    background: theme.palette.primary[100],
  },
  badgeContainer: {
    color: theme.palette.white,
    margin: "0px 16px 0px 24px",
    "&>*:nth-child(1)": {
      position: "relative",
      margin: "0 0 -33.5px -8.5px",
      zIndex: 2,
    },
  },
  badge: {
    position: "relative",
    margin: "0 0 -20px -20px",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  first: {
    backgroundImage: "linear-gradient(to top, #ffdf00, #ffbb00)",
  },
  second: {
    backgroundImage: "linear-gradient(to top, #00ffe0, #01dacd)",
  },
  third: {
    backgroundImage: "linear-gradient(to top, #ffb800, #c88400)",
  },
  fourth: {
    backgroundImage: "linear-gradient(to top, #d4d4d4, #767676)",
  },
  placeText: {
    color: theme.palette.grey[600],
    margin: "0px 16px 0px 8px",
    width: "32px",
    textAlign: "start",
  },
}));
export default ChallengeDetailLeaderBoardPopup;
