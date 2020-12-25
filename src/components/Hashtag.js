import React, { memo } from "react";
import PropTypes from "prop-types";

import { makeStyles, Typography, Box } from "@material-ui/core";

const Hashtag = ({ content, ...otherProps }) => {
  const classes = useStyles();

  const primaryContent = content.type ? (
    content
  ) : (
    <Typography variant="body2" component="span">
      {`#${content}`}
    </Typography>
  );

  return (
    <Box className={classes.root} {...otherProps}>
      {primaryContent}
    </Box>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    display: "inline-block",
    marginRight: theme.spacing(0.5),
  },
}));

Hashtag.propTypes = { content: PropTypes.string };
Hashtag.defaultProps = { content: "" };

export default memo(Hashtag);
