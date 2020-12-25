import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles, Box, IconButton } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { HeartIcon } from "icons";
import { AppConstant } from "const";
import StringFormat from "string-format";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import Lottie from "react-lottie";
import heartAnimation from "../../../../../../public/animations/heartAnimation.json";
import { useDispatch } from "react-redux";
import ArticleActions from "redux/article.redux";
import { AuthDialog } from "components";
import { hasLogged } from "utils/auth";

const POP_COUNT_SIZE = 24;
const ANIMATION_TIME = 750;

const CommentReact = ({ commentId, isSide, baseReactCount, totalReactCount }) => {
  const classes = useStyles();
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
  const [isHeart, setIsHeart] = useState(baseReactCount);
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
        ArticleActions.requestAddCommentReact({
          commentId,
          bodyReq: {
            reactCount: 1,
            reactionId: 1,
          },
        }),
      );
    };
    if (userReactCount > 0 && userReactCount + baseReactCount <= AppConstant.USER_MAX_REACT_COUNT && commentId) {
      sendReact();
    }
  }, [userReactCount]);

  return (
    <Box className={classes.root}>
      {isPlayingAnimation && (
        <Box className={classes.detailAnimationContainer}>
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
        <Box className={clsx(classes.detailPopCount, classes.popCountOnePress)}>
          {StringFormat(getLabel("FM_REACT_HEART_COUNT"), userReactCount + baseReactCount)}
        </Box>
      )}
      {isLongPress && (
        <Box className={classes.detailPopCount}>
          {StringFormat(getLabel("FM_REACT_HEART_COUNT"), userReactCount + baseReactCount)}
        </Box>
      )}
      {isSide ? (
        <IconButton className={clsx(classes.heartButtonSmall)} {...pressBind}>
          <Box className="ic-heart" />
        </IconButton>
      ) : (
        <Button
          startIcon={<HeartIcon isActive={isHeart} />}
          className={clsx(isHeart && classes.heart, "grey-text", classes.heartButton)}
          {...pressBind}
        >
          {StringFormat(getLabel("FM_LOVE"), totalReactCount + userReactCount)}
        </Button>
      )}
      <AuthDialog isOpen={isOpenAuthDialog} onClose={onCloseAuthDialog} />
    </Box>
  );
};

CommentReact.propTypes = {
  commentId: PropTypes.string,
  isSide: PropTypes.bool,
  baseReactCount: PropTypes.number,
  totalReactCount: PropTypes.number,
};
CommentReact.defaultProps = {
  isSide: false,
};
const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    height: "40px !important",
    marginBottom: `- ${theme.spacing(1)}px`,
  },
  heart: {
    "&, & *": {
      color: theme.palette.error.main,
    },
  },
  heartButton: { height: "100%" },
  heartButtonSmall: {
    marginTop: theme.spacing(-1),
    "& .ic-heart": {
      WebkitTextStroke: `2px ${theme.palette.grey[500]}`,
      color: theme.palette.white,
      fontSize: 20,
    },
    "&:hover .ic-heart": {
      color: theme.palette.error.main,
      WebkitTextStroke: "0px",
    },
    "&:hover": {
      background: "none",
      color: theme.palette.error.main,
    },
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
  detailPopCount: {
    color: theme.palette.white,
    background: theme.palette.error.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 1.2 * POP_COUNT_SIZE,
    height: 1.2 * POP_COUNT_SIZE,
    borderRadius: POP_COUNT_SIZE,
    bottom: 1.2 * POP_COUNT_SIZE,
  },
  detailAnimationContainer: {
    position: "absolute",
    zIndex: 2,
    width: POP_COUNT_SIZE,
    bottom: 2.4 * POP_COUNT_SIZE,
  },
}));

export default memo(CommentReact);
