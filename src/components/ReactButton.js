import React, { memo, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { HeartIcon } from "icons";
import { AppConstant } from "const";
import StringFormat from "string-format";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import Lottie from "react-lottie";
import heartAnimation from "../../public/animations/heartAnimation.json";

const POP_COUNT_SIZE = 30;
const ANIMATION_TIME = 750;

const ReactButton = ({ articleId, commentId, isDetail, article }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [isHeart, setIsHeart] = useState(false);
  const [userReactCount, setUserReactCount] = useState(0);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const animationOptions = {
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    animationData: heartAnimation,
    autoplay: true,
    loop: false,
  };
  const pressBind = useLongPress(() => setIsLongPress(true), {
    onStart: () => onReact(),
    onFinish: () => setIsLongPress(false),
    threshold: ANIMATION_TIME,
    captureEvent: true,
    detect: LongPressDetectEvents.BOTH,
  });

  const onReact = () => {
    setIsHeart(true);
    setIsPlayingAnimation(true);
    if (userReactCount < AppConstant.USER_MAX_REACT_COUNT) {
      setUserReactCount(userReactCount + 1);
    }
  };
  const stopAnimation = () => {
    setIsPlayingAnimation(false);
  };
  useEffect(() => {
    if (isLongPress) {
      const interval = setInterval(() => {
        setIsPlayingAnimation(true);
        if (userReactCount < AppConstant.USER_MAX_REACT_COUNT) {
          setUserReactCount(userReactCount => userReactCount + 1);
        }
      }, ANIMATION_TIME);
      return () => clearInterval(interval);
    }
  }, [isLongPress]);

  useEffect(() => {
    if (userReactCount >= AppConstant.USER_MAX_REACT_COUNT) {
      setUserReactCount(AppConstant.USER_MAX_REACT_COUNT);
    }
  }, [isPlayingAnimation]);

  return (
    <Box className={classes.root}>
      {userReactCount > 0 && isPlayingAnimation && !isLongPress && (
        <Box className={classes.popCount}>{StringFormat(getLabel("FM_REACT_HEART_COUNT"), userReactCount)}</Box>
      )}
      {isLongPress && (
        <Box className={classes.popCount}>{StringFormat(getLabel("FM_REACT_HEART_COUNT"), userReactCount)}</Box>
      )}

      {userReactCount > 0 && isPlayingAnimation && (
        <Box className={classes.animationContainer}>
          <Lottie
            options={animationOptions}
            height={2 * POP_COUNT_SIZE}
            width={POP_COUNT_SIZE}
            eventListeners={[
              {
                eventName: "complete",
                callback: () => stopAnimation(),
              },
            ]}
            isStopped={!isPlayingAnimation}
          />
        </Box>
      )}

      <Button startIcon={<HeartIcon isActive={isHeart} />} className={clsx(isHeart && classes.heart)} {...pressBind}>
        {getLabel("TXT_LOVE")}
      </Button>
    </Box>
  );
};

ReactButton.propTypes = {
  articleId: PropTypes.string,
  commentId: PropTypes.string,
  isDetail: PropTypes.bool,
  article: PropTypes.any,
};
ReactButton.defaultProps = {
  isDetail: false,
};
const useStyles = makeStyles(theme => ({
  heart: {
    "&, & *": {
      color: theme.palette.error.main,
    },
    marginLeft: "-6px !important",
  },
  popCount: {
    color: theme.palette.white,
    background: theme.palette.error.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: -POP_COUNT_SIZE,
    width: POP_COUNT_SIZE,
    height: POP_COUNT_SIZE,
    borderRadius: POP_COUNT_SIZE / 2,
    marginLeft: POP_COUNT_SIZE,
    fontSize: "12px",
  },
  animationContainer: {
    position: "relative",
    marginLeft: -80,
    zIndex: 10,
    marginTop: -60,
  },
}));

export default memo(ReactButton);
