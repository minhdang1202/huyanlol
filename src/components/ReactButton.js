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

const POP_COUNT_SIZE = 30;
const ANIMATION_TIME = 750;

const ReactButton = ({ articleId, commentId, isDetail, isComment, userRelation }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation();
  const dispatch = useDispatch();
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

  const pressBind = useLongPress(() => setIsLongPress(true), {
    onStart: () => onReact(),
    onFinish: () => setIsLongPress(false),
    threshold: ANIMATION_TIME / 3,
    captureEvent: true,
    detect: LongPressDetectEvents.BOTH,
  });
  const onReact = () => {
    setIsHeart(true);
    setIsPlayingAnimation(true);
    if (userReactCount + baseReactCount < AppConstant.USER_MAX_REACT_COUNT) {
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
        if (userReactCount + baseReactCount < AppConstant.USER_MAX_REACT_COUNT) {
          setUserReactCount(userReactCount => userReactCount + 1);
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
      {userReactCount > 0 && isPlayingAnimation && !isLongPress && (
        <Box className={classes.popCount}>
          {StringFormat(getLabel("FM_REACT_HEART_COUNT"), userReactCount + baseReactCount)}
        </Box>
      )}
      {isLongPress && (
        <Box className={classes.popCount}>
          {StringFormat(getLabel("FM_REACT_HEART_COUNT"), userReactCount + baseReactCount)}
        </Box>
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

      {!isDetail && (
        <Button
          startIcon={<HeartIcon isActive={isHeart} />}
          className={clsx(isHeart && classes.heart, classes.summaryHeart)}
          {...pressBind}
        >
          {getLabel("TXT_LOVE")}
        </Button>
      )}
      {isDetail && (
        <Button
          startIcon={<HeartIcon isActive={isHeart} />}
          className={clsx(isHeart && classes.heart, "grey-text")}
          size={isMobile ? "small" : "large"}
          {...pressBind}
        >
          {getLabel("TXT_LOVE")}
        </Button>
      )}
    </Box>
  );
};

ReactButton.propTypes = {
  articleId: PropTypes.number,
  commentId: PropTypes.number,
  isComment: PropTypes.bool,
  isDetail: PropTypes.bool,
  userRelation: PropTypes.object,
};
ReactButton.defaultProps = {
  isDetail: false,
};
const useStyles = makeStyles(theme => ({
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
