import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, Box, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import UserAction from "redux/user.redux";
import { useDispatch, useSelector } from "react-redux";
import { ApiConstant } from "const";
import { UserService } from "services";

const FollowButton = ({ className, authorUsername, authorId }) => {
  const { t: getLabel } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const followed = useSelector(state => state.userRedux.requestProfileVisitor?.followRelation?.followed);
  const [isFollowing, setIsFollowing] = useState(followed);

  useEffect(() => {
    dispatch(UserAction.requestProfileVisitor(authorUsername));
  }, []);

  useEffect(() => {
    setIsFollowing(followed);
  }, [followed]);

  const onFollow = async () => {
    const res = await UserService.postFollowUser(authorId);
    if (res.status === ApiConstant.STT_OK) {
      setIsFollowing(true);
    }
  };
  const onUnFollow = async () => {
    const res = await UserService.deleteUnFollowUser(authorId);
    if (res.status === ApiConstant.STT_OK) {
      setIsFollowing(false);
    }
  };

  return (
    <Button
      size="small"
      variant="contained"
      className={clsx(classes.root, isFollowing ? "light-blue-button" : "dark-blue-button", className)}
      startIcon={isFollowing ? null : <Box className="ic-plus" />}
      onClick={isFollowing ? onUnFollow : onFollow}
    >
      {isFollowing ? getLabel("TXT_FOLLOWED") : getLabel("TXT_FOLLOW")}
    </Button>
  );
};

FollowButton.propTypes = {
  className: PropTypes.string,
  authorUsername: PropTypes.string,
  authorId: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    height: 33,
    padding: theme.spacing(0, 1.5),
    "& .ic-plus": {
      fontSize: 12,
    },
  },
}));

export default FollowButton;
