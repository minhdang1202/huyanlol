import React, { memo } from "react";
import PropTypes from "prop-types";
import { Box, Card, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import AppLink from "components/AppLink";

const QuickActionItem = props => {
  const { title, cover, icon } = props;
  const classes = useStyles();

  return (
    <AppLink>
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={cover} title={title} />
        <CardContent className={classes.content}>
          <Box className={classes.icon}>{icon}</Box>
          <Typography variant="subtitle1" component="p">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </AppLink>
  );
};

QuickActionItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  cover: PropTypes.string,
};
QuickActionItem.defaultProps = {};

export default memo(QuickActionItem);
const MIN_HEIGHT = 110;
const MIN_HEIGHT_MB = 70;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    padding: 0,
    borderRadius: 10,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
  },
  cover: {
    height: "50%",
    minHeight: MIN_HEIGHT,
    [theme.breakpoints.down("sm")]: {
      minHeight: MIN_HEIGHT_MB,
    },
  },
  content: {
    position: "relative",
    paddingTop: theme.spacing(3),
    minHeight: MIN_HEIGHT,
    [theme.breakpoints.down("sm")]: {
      minHeight: MIN_HEIGHT_MB,
    },
  },
  icon: {
    position: "absolute",
    top: -24,
    left: 12,
  },
}));
