import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { HeartIcon } from "icons";
import { AppConstant } from "const";
import StringFormat from "string-format";
const ReactButton = ({ articleId, commentId, isDetail, article }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const [isHeart, setIsHeart] = useState(false);
  const [userReactCount, setUserReactCount] = useState(0);

  const onReact = e => {
    e.stopPropagation();
    setIsHeart(true);
    if (userReactCount < AppConstant.USER_MAX_REACT_COUNT) {
      setUserReactCount(userReactCount + 1);
    }
  };

  useEffect(() => {
    console.log(userReactCount);
  }, [userReactCount]);

  return (
    <Box>
      {userReactCount > 0 && <Box className={classes.popCount}>{`+${userReactCount}`}</Box>}
      <Button
        startIcon={<HeartIcon isActive={isHeart} />}
        className={clsx(isHeart && classes.heartColor)}
        onClick={onReact}
      >
        {getLabel("TXT_LOVE")}
      </Button>
    </Box>
  );
};
const POP_COUNT_SIZE = 30;
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
  heartColor: {
    "&, & *": {
      color: theme.palette.error.main,
    },
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
    marginLeft: 1.5 * POP_COUNT_SIZE,
  },
}));

export default memo(ReactButton);
