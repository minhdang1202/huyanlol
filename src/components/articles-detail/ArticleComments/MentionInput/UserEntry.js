import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box, Avatar, makeStyles } from "@material-ui/core";
import { getImageById } from "utils";

const UserEntry = ({ mention, isFocused, id, onMouseUp, onMouseDown, onMouseEnter }) => {
  const entryUserRef = useRef(null);
  const classes = useStyles();
  const { imageId, name } = mention;

  useEffect(() => {
    if (isFocused) {
      if ("scrollIntoViewIfNeeded" in document.body) {
        entryUserRef.current.scrollIntoViewIfNeeded(false);
      } else {
        entryUserRef.current.scrollIntoView(false);
      }
    }
  }, [isFocused]);

  return (
    <Box
      ref={entryUserRef}
      className={clsx(classes.root, isFocused && classes.isFocused)}
      role="option"
      aria-selected={isFocused}
      id={id}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
    >
      <Avatar src={getImageById(imageId)} />
      <Box fontSize={16} fontWeight={600} ml={2}>
        {name}
      </Box>
    </Box>
  );
};

UserEntry.propTypes = {
  mention: PropTypes.object,
  isFocused: PropTypes.bool,
  id: PropTypes.string,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
};

export default UserEntry;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1.5),
    display: "flex",
    width: 248,
    height: 65,
    alignItems: "center",
    "&>:first-child": {
      width: 42,
      height: 42,
    },
  },
  isFocused: {
    background: theme.palette.primary[100],
  },
}));
