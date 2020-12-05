import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, Box, IconButton, makeStyles } from "@material-ui/core";

const BookmarkButton = ({ children, isBookmarked, className, ...otherProps }) => {
  const classes = useStyles({ isBookmarked });

  return children ? (
    <Button
      startIcon={<Box className={isBookmarked ? "ic-bookmark" : "ic-bookmark-empty"} />}
      className={clsx(classes.root, className)}
      {...otherProps}
    >
      {children}
    </Button>
  ) : (
    <IconButton className={clsx(classes.root, className)} {...otherProps}>
      <Box className={isBookmarked ? "ic-bookmark" : "ic-bookmark-empty"} />
    </IconButton>
  );
};

BookmarkButton.propTypes = {
  isBookmarked: PropTypes.bool,
  className: PropTypes.string,
};

export default BookmarkButton;

const useStyles = makeStyles(theme => ({
  root: {
    "&, & *": {
      color: ({ isBookmarked }) => (isBookmarked ? theme.palette.primary.main : theme.palette.grey[500]),
    },
  },
}));
