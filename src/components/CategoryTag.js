import React, { memo } from "react";
import PropTypes from "prop-types";

import { Button, makeStyles, Typography } from "@material-ui/core";
import { LocalOfferIcon } from "icons";

const CategoryTag = ({ content, ...otherProps }) => {
  const classes = useStyles();

  const primaryContent = content.type ? (
    content
  ) : (
    <Typography variant="subtitle2" component="span">
      {content}
    </Typography>
  );

  return (
    <Button variant="text" color="primary" className={classes.root} {...otherProps}>
      <LocalOfferIcon />
      {primaryContent}
    </Button>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    "& svg": {
      fontSize: 12,
      marginRight: theme.spacing(0.5),
    },
  },
}));

CategoryTag.propTypes = { content: PropTypes.bool };
CategoryTag.defaultProps = { content: "" };

export default memo(CategoryTag);
