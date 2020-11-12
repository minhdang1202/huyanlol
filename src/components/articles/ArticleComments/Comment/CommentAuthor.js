import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Avatar, Typography, makeStyles } from "@material-ui/core";
import AppLink from "components/AppLink";

const CommentAuthor = ({ avatar, name, date }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <AppLink to="#">
        <IconButton className={classes.avatarButton}>
          <Avatar className={classes.avatar} src={avatar} />
        </IconButton>
      </AppLink>
      <Box ml={1}>
        <AppLink to="#">
          <Typography variant="subtitle2" component="div" className="eclipse">
            {name}
          </Typography>
        </AppLink>
        <Typography variant="caption" className="eclipse">
          {date}
        </Typography>
      </Box>
    </Box>
  );
};

CommentAuthor.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    "& a": {
      color: theme.palette.text.primary,
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.primary.main,
      },
    },
  },
  avatarButton: {
    padding: "0 !important",
    minWidth: "fit-content",
    width: "fit-content",
  },
  avatar: {
    width: 43,
    height: 43,
    [theme.breakpoints.down("xs")]: {
      width: 32,
      height: 32,
    },
  },
}));

export default CommentAuthor;
