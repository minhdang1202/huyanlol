import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles, Box, useMediaQuery, useTheme } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { HeartIcon } from "icons";
import { AppConstant } from "const";
import StringFormat from "string-format";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import Lottie from "react-lottie";
import heartAnimation from "../../public/animations/heartAnimation.json";
import { useDispatch } from "react-redux";
import ArticleActions from "redux/article.redux";
import { AuthDialog } from "components";
import { hasLogged } from "utils/auth";

const POP_COUNT_SIZE = 30;
const ANIMATION_TIME = 750;

const ReactButton = ({ articleId, commentId, isDetail, userRelation, changeParentTempCount }) => {
  //todo: react in article detail & react to comment
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation();
  const dispatch = useDispatch();
  const isComment = Boolean(commentId);
  const animationOptions = {
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    animationData: heartAnimation,
    autoplay: true,
    loop: false,
  };
  const baseReactCount = userRelation ? userRelation.userReaction.reactCount : 0;
  const [isHeart, setIsHeart] = useState(Boolean(userRelation));
  const [userReactCount, setUserReactCount] = useState(0);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const [isOpenAuthDialog, setIsOpenAuthDialog] = useState(false);

  const pressBind = useLongPress(() => setIsLongPress(true), {
    onStart: () => onReact(),
    onFinish: () => setIsLongPress(false),
    threshold: ANIMATION_TIME / 3,
    captureEvent: true,
    detect: LongPressDetectEvents.BOTH,
  });
  const onReact = () => {
    if (hasLogged()) {
      setIsHeart(true);
      setIsPlayingAnimation(true);
      if (userReactCount + baseReactCount < AppConstant.USER_MAX_REACT_COUNT) {
        setUserReactCount(userReactCount + 1);
        changeParentTempCount();
      }
    } else {
      setIsOpenAuthDialog(true);
    }
  };
  const onStopAnimation = () => {
    setIsPlayingAnimation(false);
  };
  const onCloseAuthDialog = () => setIsOpenAuthDialog(false);
  useEffect(() => {
    if (isLongPress) {
      const interval = setInterval(() => {
        setIsPlayingAnimation(true);
        if (userReactCount + baseReactCount < AppConstant.USER_MAX_REACT_COUNT) {
          setUserReactCount(userReactCount => userReactCount + 1);
          changeParentTempCount();
        }
      }, ANIMATION_TIME);
      return () => clearInterval(interval);
    }
  }, [isLongPress]);

  useEffect(() => {
    if (userReactCount + baseReactCount >= AppConstant.USER_MAX_REACT_COUNT) {
      setUserReactCount(userReactCount);
    }
  }, [isPlayingAnimation]);

  useEffect(() => {
    const sendReact = () => {
      dispatch(
        ArticleActions.requestAddArticleReact({
          articleId,
          bodyReq: {
            reactCount: 1,
            reactionId: 1,
          },
        }),
      );
    };
    if (userReactCount > 0 && userReactCount + baseReactCount <= AppConstant.USER_MAX_REACT_COUNT && articleId) {
      sendReact();
    }
  }, [userReactCount]);

  return (
    <Box className={classes.root}>
      {isPlayingAnimation && (
        <Box className={isDetail ? classes.detailAnimationContainer : classes.animationContainer}>
          <Lottie
            options={animationOptions}
            height={2 * POP_COUNT_SIZE}
            width={POP_COUNT_SIZE}
            eventListeners={[
              {
                eventName: "complete",
                callback: () => onStopAnimation(),
              },
            ]}
            isStopped={!isPlayingAnimation}
          />
        </Box>
      )}
      {isPlayingAnimation && !isLongPress && (
        <Box className={clsx(isDetail ? classes.detailPopCount : classes.popCount, classes.popCountOnePress)}>
          {StringFormat(getLabel("FM_REACT_HEART_COUNT"), userReactCount + baseReactCount)}
        </Box>
      )}
      {isLongPress && (
        <Box className={isDetail ? classes.detailPopCount : classes.popCount}>
          {StringFormat(getLabel("FM_REACT_HEART_COUNT"), userReactCount + baseReactCount)}
        </Box>
      )}
      {isDetail ? (
        <Button
          startIcon={<HeartIcon isActive={isHeart} />}
          className={clsx(isHeart && classes.heart, "grey-text", classes.heartButton)}
          size={isMobile ? "small" : "large"}
          {...pressBind}
        >
          {getLabel("TXT_LOVE")}
        </Button>
      ) : (
        <Button
          startIcon={<HeartIcon isActive={isHeart} />}
          className={clsx(isHeart && classes.heart, classes.summaryHeart, classes.heartButton)}
          {...pressBind}
        >
          {getLabel("TXT_LOVE")}
        </Button>
      )}
      <AuthDialog isOpen={isOpenAuthDialog} onClose={onCloseAuthDialog} />
    </Box>
  );
};

ReactButton.propTypes = {
  articleId: PropTypes.number,
  commentId: PropTypes.number,
  isDetail: PropTypes.bool,
  userRelation: PropTypes.object,
  changeParentTempCount: PropTypes.func,
};
ReactButton.defaultProps = {
  isDetail: false,
};
const useStyles = makeStyles(theme => ({
  root: { position: "relative", maxHeight: "35px !important" },
  heart: {
    "&, & *": {
      color: theme.palette.error.main,
    },
  },
  summaryHeart: {
    marginLeft: "-6px !important",
  },
  popCount: {
    color: theme.palette.white,
    background: theme.palette.error.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: POP_COUNT_SIZE,
    height: POP_COUNT_SIZE,
    borderRadius: POP_COUNT_SIZE / 2,
    bottom: POP_COUNT_SIZE,
    left: -POP_COUNT_SIZE / 4,
  },
  popCountOnePress: {
    animation: "$fadeIn .2s ease-in-out",
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
      transform: "scale(0.8)",
    },
    "50%": {
      opacity: 0.5,
      transform: "scale(1.2)",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1)",
    },
  },
  animationContainer: {
    position: "absolute",
    zIndex: 2,
    width: POP_COUNT_SIZE,
    bottom: 2 * POP_COUNT_SIZE,
    left: -POP_COUNT_SIZE / 4,
  },
  detailPopCount: {
    color: theme.palette.white,
    background: theme.palette.error.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: POP_COUNT_SIZE,
    height: POP_COUNT_SIZE,
    borderRadius: POP_COUNT_SIZE / 2,
    bottom: POP_COUNT_SIZE,
  },
  detailAnimationContainer: {
    position: "absolute",
    zIndex: 2,
    width: POP_COUNT_SIZE,
    bottom: 2 * POP_COUNT_SIZE,
  },
}));

export default memo(ReactButton);
