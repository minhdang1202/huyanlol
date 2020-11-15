import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, Box, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const FollowButton = ({ isFollowing, className }) => {
  const { t: getLabel } = useTranslation();
  const classes = useStyles();
  return (
    <Button
      size="small"
      variant="contained"
      className={clsx(classes.root, isFollowing ? "light-blue-button" : "dark-blue-button", className)}
      startIcon={isFollowing ? null : <Box className="ic-plus" />}
    >
      {isFollowing ? getLabel("TXT_FOLLOWED") : getLabel("TXT_FOLLOW")}
    </Button>
  );
};

FollowButton.propTypes = {
  isFollowing: PropTypes.bool,
  className: PropTypes.string,
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
