import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  makeStyles,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Avatar,
  Button,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import StringFormat from "string-format";
import clsx from "clsx";
import { getImageById } from "utils";
import { AppConstant, ApiConstant } from "const";
import { CrownIcon } from "icons";
import { UserService } from "services";
import { hasLogged } from "utils/auth";
const ChallengeDetailLeaderBoardPopup = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const isLoggedIn = hasLogged();
  const [isFollowedTab, setIsFollowedTab] = useState(false);
  const [myPlace, setMyPlace] = useState(0);
  const leaderBoard = useSelector(state => state.challengeRedux.detailLeaderBoard);
  const friendLeaderBoard = useSelector(state => state.challengeRedux.detailFriendLeaderBoard);
  const user = useSelector(state => state.userRedux.profile);
  const detailInfo = useSelector(state => state.challengeRedux.detailInfo);
  const { targetTypeId, challengeProgress } = detailInfo;
  const list = isFollowedTab ? friendLeaderBoard : leaderBoard;
  const isRead = Boolean(
    targetTypeId === AppConstant.CHALLENGE_TARGET_TYPE.readBook ||
      targetTypeId === AppConstant.CHALLENGE_TARGET_TYPE.readBookList,
  );
  const userOnLeaderBoard = leaderBoard.filter(each => each.user.userId === user.userId)[0];
  useEffect(() => {
    const getMyPlace = async () => {
      let place = 0;
      await list.forEach((each, index) => {
        if (each.user.userId === user.userId) {
          place = index + 1;
        }
      });
      setMyPlace(place);
    };
    getMyPlace();
  }, [isFollowedTab]);
  return (
    <Dialog open={isOpen} fullScreen={isMobile} fullWidth={true} maxWidth="sm" onClose={onClose}>
      <Box className={classes.root}>
        <Box className={classes.top}>
          <Box className={classes.head}>
            {!isTablet && challengeProgress && user.userId && isLoggedIn && (
              <Box className={classes.topLeft}>
                <Avatar src={getImageById(user.imageId)} className={classes.userAvatar} />
                <Box>
                  <Typography variant="subtitle2">
                    {StringFormat(
                      getLabel(isRead ? "FM_PROGRESS_LEADER_BOARD" : "FM_PROGRESS_REVIEW_LEADER_BOARD"),
                      challengeProgress.progress,
                      challengeProgress.targetNumber,
                    )}
                  </Typography>
                </Box>
              </Box>
            )}
            <IconButton className={classes.closeIcon} onClick={onClose}>
              <CloseIcon fontSize={isMobile ? "small" : "large"} />
            </IconButton>
          </Box>
          <Box className={clsx(classes.stage, list.length < 3 && classes.lessStage)}>
            {list[1] && (
              <Box className={classes.secondStage}>
                <Avatar src={getImageById(list[1].user.imageId)} />
                <Box className={classes.badgeContainerSmall}>
                  <Typography variant="subtitle2">2</Typography>
                  <Box className={clsx(classes.badgeSmall, classes.second, "ic-certificate-small")} />
                </Box>
                <Typography variant="subtitle2" className="eclipse">
                  {list[1].user.name}
                </Typography>
              </Box>
            )}
            {list[0] && (
              <Box className={classes.firstStage}>
                <CrownIcon />
                <Avatar src={getImageById(list[0].user.imageId)} />
                <Box className={classes.badgeContainer}>
                  <Typography variant="subtitle2">1</Typography>
                  <Box className={clsx(classes.badge, classes.first, "ic-certificate")} />
                </Box>
                <Typography variant="h6" className="eclipse">
                  {list[0].user.name}
                </Typography>
              </Box>
            )}
            {list[2] && (
              <Box className={classes.thirdStage}>
                <Avatar src={getImageById(list[2].user.imageId)} />
                <Box className={classes.badgeContainerSmall}>
                  <Typography variant="subtitle2">3</Typography>
                  <Box className={clsx(classes.badgeSmall, classes.third, "ic-certificate-small")} />
                </Box>
                <Typography variant="subtitle2" className="eclipse">
                  {list[2].user.name}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box className={classes.tab}>
          <Typography
            component="div"
            className={!isFollowedTab ? classes.activeTab : null}
            onClick={() => setIsFollowedTab(false)}
            variant={!isFollowedTab ? "subtitle1" : "body1"}
          >
            {getLabel("L_ALL")}
          </Typography>
          <Typography
            component="div"
            className={isFollowedTab ? classes.activeTab : null}
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
      {isTablet && user.userId && challengeProgress && isLoggedIn && (
        <Item className={classes.footer} data={userOnLeaderBoard} isFollowedTab={false} place={myPlace} />
      )}
    </Dialog>
  );
};

const Item = ({ data, isFollowedTab, place, className }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { user, following } = data;
  const targetType = useSelector(state => state.challengeRedux.detailInfo.targetTypeId);
  const challengeProgress = useSelector(state => state.challengeRedux.detailInfo.challengeProgress);
  const fixedTarget = useSelector(state => state.challengeRedux.detailInfo.targetNumber);
  const target = challengeProgress ? challengeProgress.targetNumber : fixedTarget;
  const profile = useSelector(state => state.userRedux.profile);
  const [isFollowing, setIsFollowing] = useState(following);
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
  const onFollow = async targetUserID => {
    const res = await UserService.postFollowUser(targetUserID);
    if (res.status === ApiConstant.STT_OK) {
      setIsFollowing(true);
    }
  };
  const onUnFollow = async targetUserID => {
    const res = await UserService.deleteUnFollowUser(targetUserID);
    if (res.status === ApiConstant.STT_OK) {
      setIsFollowing(false);
    }
  };
  return (
    <Box className={clsx(classes.item, className)}>
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
            <Box className={data.progress >= target ? clsx("ic-check-circle", classes.done) : null}>
              <Typography variant="body2" component="span">
                {StringFormat(
                  getLabel(isRead ? "FM_PROGRESS_LEADER_BOARD" : "FM_PROGRESS_REVIEW_LEADER_BOARD"),
                  data.progress,
                  target,
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
        {!isFollowedTab && !isMobile && user.userId !== profile.userId && profile.userId && (
          <Button
            variant="contained"
            color={isFollowing ? "default" : "primary"}
            size="small"
            className={isFollowing ? classes.followingBtn : null}
            onClick={() => {
              if (isFollowing) {
                return onUnFollow(user.userId);
              }
              return onFollow(user.userId);
            }}
          >
            <Box className={!isFollowing ? "ic-plus-light" : null}>
              <Typography className={classes.btnText}>{getLabel(isFollowing ? "L_FOLLOWED" : "L_FOLLOW")}</Typography>
            </Box>
          </Button>
        )}
      </Box>
    </Box>
  );
};

ChallengeDetailLeaderBoardPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

Item.propTypes = {
  data: PropTypes.object,
  isFollowedTab: PropTypes.bool,
  place: PropTypes.number,
  className: PropTypes.any,
};
const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    "&>*": {
      padding: theme.spacing(2),
    },
    "&>:nth-child(2)": {
      padding: 0,
    },
    "&>:nth-child(3)": {
      height: "300px",
      overflow: "scroll",
      [theme.breakpoints.down("xs")]: {
        height: `${window.innerHeight - 404}px`,
      },
    },
    [theme.breakpoints.down("md")]: {
      paddingBottom: "104px",
    },
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    background: theme.palette.white,
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    paddingLeft: theme.spacing(2),
    zIndex: 10,
  },
  top: {
    backgroundImage: `url("/images/img-leader-board-bg.png")`,
    height: "268px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  head: {
    display: "flex",
    flexDirection: "row",
    height: "54px",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },

  closeIcon: {
    color: "rgba(255, 255, 255, 0.7)",
    width: "40px",
    height: "40px",
  },
  topLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "&>:nth-child(2)": {
      width: "125px",
      height: "54px",
      color: theme.palette.white,
      background: "rgba(255, 255, 255,0.25)",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      position: "relative",
      marginLeft: "-24px",
      "&>:first-child": {
        marginLeft: theme.spacing(2),
      },
    },
  },
  stage: {
    display: "flex",
    flexDirection: "row",
    color: theme.palette.white,
    width: "100%",
    justifyContent: "space-around",
    position: "relative",
    marginTop: "-24px",
    "&>*": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      maxWidth: "75px",
    },
  },
  lessStage: {
    justifyContent: "center",
    "&>*": {
      margin: "0 24px 0 24px",
    },
  },
  firstStage: {
    "&>:first-child": {
      width: "39px",
      height: "33px",
      border: "none",
      marginBottom: theme.spacing(1),
    },
    "&>:nth-child(2)": {
      width: "105px",
      height: "105px",
      border: "3px solid #ffbb00",
    },
    "&>:nth-child(3)": {
      margin: "-12.5px 0 24px 20px ",
    },
    maxWidth: "200px",
  },
  secondStage: {
    marginTop: "68px",
    "&>:first-child": {
      width: "73px",
      height: "73px",
      border: "3px solid #01dacd",
    },
  },
  thirdStage: {
    marginTop: "84px",
    "&>:first-child": {
      width: "73px",
      height: "73px",
      border: "3px solid #c88400",
    },
  },

  userAvatar: {
    width: "42px",
    height: "42px",
    border: "1px solid white",
    zIndex: 3,
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "&>:nth-child(2)": {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: `0 1px 0 0 ${theme.palette.grey[100]}`,
      [theme.breakpoints.down("xs")]: {
        boxShadow: "none",
      },
      "&>:nth-child(2)": {
        height: "43px",
        width: "155px",
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
  badgeContainerSmall: {
    color: theme.palette.white,
    "&>*:nth-child(1)": {
      position: "relative",
      margin: "-8px 0 0 7px ",
      zIndex: 2,
      fontSize: 10,
    },
  },
  badgeSmall: {
    position: "relative",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    margin: "-22.5px 0 0 0 ",
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
  done: {
    color: theme.palette.text.link,
    "&>:first-child": {
      margin: "4px",
    },
  },
  unDone: {
    color: theme.palette.grey[500],
  },
  btnText: {
    fontWeight: 500,
  },
}));
export default ChallengeDetailLeaderBoardPopup;
