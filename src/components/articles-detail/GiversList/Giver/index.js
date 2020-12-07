import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import StringFormat from "string-format";
import { useTranslation } from "react-i18next";
import { Box, Badge, Avatar, IconButton, Typography, makeStyles } from "@material-ui/core";
import FollowButton from "../../FollowButton";
import { AppLink } from "components";
import { getImageById } from "utils";
import HeartBadge from "./HeartBadge";

const Giver = ({ data }) => {
  const { userId, name, imageId, followRelation } = data.user;
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  return (
    <Box className={classes.root}>
      <Box display="flex" alignItems="center">
        <AppLink to="#">
          <IconButton>
            <Badge
              badgeContent={<HeartBadge />}
              classes={{ badge: classes.badge }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Avatar className={classes.avatar} src={getImageById(imageId)} />
            </Badge>
          </IconButton>
        </AppLink>
        <Box ml={1}>
          <AppLink to="#">
            <Typography component="div" className={clsx("eclipse", classes.name)}>
              {name}
            </Typography>
          </AppLink>
          <Typography variant="body2" className={clsx("eclipse", "grey-text")}>
            {StringFormat(getLabel("FM_GIVERS"), data.reactCount)}
          </Typography>
        </Box>
      </Box>
      <FollowButton isFollowing={followRelation?.followed} className="ml-8" />
    </Box>
  );
};

Giver.propTypes = {
  data: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: theme.spacing(2, 0),
    justifyContent: "space-between",
    alignItems: "center",
    "& a": {
      color: theme.palette.text.primary,
    },
  },
  avatar: {
    width: 60,
    height: 60,
    [theme.breakpoints.down("xs")]: {
      width: 39,
      height: 39,
    },
  },
  badge: {
    width: "fit-content",
    height: "fit-content",
    minWidth: "fit-content",
    padding: 0,
    right: 8,
    bottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
  },
}));

export default Giver;
