import React, { memo } from "react";
import PropTypes from "prop-types";

import { makeStyles, Typography } from "@material-ui/core";
import { AppLink } from "components";

const Hashtag = ({ content, ...otherProps }) => {
  const classes = useStyles();

  const primaryContent = content.type ? (
    content
  ) : (
    <Typography variant="body2" component="span">
      {content}
    </Typography>
  );

  return (
    <AppLink className={classes.root} {...otherProps}>
      {primaryContent}
    </AppLink>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    display: "inline-block",
    marginRight: theme.spacing(0.5),
  },
}));

Hashtag.propTypes = { content: PropTypes.bool };
Hashtag.defaultProps = { content: "" };

export default memo(Hashtag);
