import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import { Avatar } from "components";
import AppLink from "components/AppLink";
import { getImageById } from "utils";
import { useTranslation } from "react-i18next";
import { convertDistanceDate } from "utils/date";

const CommentAuthor = ({ comment }) => {
  const classes = useStyles();
  const { user, lastUpdate } = comment;
  const { name, imageId } = user;
  const { i18n } = useTranslation();
  const date = convertDistanceDate(new Date(lastUpdate), new Date(), i18n.language);

  return (
    <Box className={classes.root}>
      <AppLink to="#">
        <IconButton className={classes.avatarButton}>
          <Avatar className={classes.avatar} src={getImageById(imageId)} />
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
  comment: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    "& a": {
      color: theme.palette.text.primary,
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
