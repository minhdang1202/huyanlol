import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, makeStyles } from "@material-ui/core";

const TopIconButtons = ({ onOpenDownload }) => {
  const classes = useStyles();
  return (
    <Box ml="auto">
      <IconButton className={classes.iconButton} onClick={(e) => onOpenDownload(e)}>
        <Box className="ic-bookmark-empty" />
      </IconButton>
      <IconButton className={classes.iconButton}>
        <Box className="ic-ellipsis-h" />
      </IconButton>
    </Box>
  );
};

TopIconButtons.propTypes = {
  onOpenDownload: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  iconButton: {
    fontSize: 16,
    color: theme.palette.text.secondary,
    width: 35,
    height: 35,
  },
}));

export default TopIconButtons;
