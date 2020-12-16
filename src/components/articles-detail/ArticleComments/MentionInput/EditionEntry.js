import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box, Avatar, Typography, makeStyles } from "@material-ui/core";
import { getImageById } from "utils";

const EditionEntry = ({ mention, isFocused, id, onMouseUp, onMouseDown, onMouseEnter }) => {
  const entryRef = useRef();
  const classes = useStyles();
  const { imageId, title, authorName } = mention;

  useEffect(() => {
    if (isFocused) {
      if ("scrollIntoViewIfNeeded" in document.body) {
        entryRef.current.scrollIntoViewIfNeeded(false);
      } else {
        entryRef.current.scrollIntoView(false);
      }
    }
  }, [isFocused]);

  return (
    <Box
      ref={entryRef}
      className={clsx(classes.root, isFocused && classes.isFocused)}
      role="option"
      aria-selected={isFocused}
      id={id}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
    >
      <Avatar variant="square" src={getImageById(imageId)} />
      <Box ml={1.5} mt={1}>
        <Typography variant="subtitle2" className="eclipse-2" component="div">
          {title}
        </Typography>
        <Typography variant="body2" className={clsx("grey-text", "eclipse")} component="div">
          {authorName}
        </Typography>
      </Box>
    </Box>
  );
};

EditionEntry.propTypes = {
  mention: PropTypes.object,
  isFocused: PropTypes.bool,
  id: PropTypes.string,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
};

export default EditionEntry;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1.5),
    display: "flex",
    "&>:first-child": {
      width: 60,
      height: 97,
      borderRadius: 2,
    },
  },
  isFocused: {
    background: theme.palette.primary[100],
  },
}));
