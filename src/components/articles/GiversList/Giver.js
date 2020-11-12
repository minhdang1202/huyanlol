import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import StringFormat from "string-format";
import { useTranslation } from "react-i18next";
import { Box, Badge, Avatar, IconButton, Typography, makeStyles } from "@material-ui/core";
import FollowButton from "../FollowButton";
import { AppLink } from "components";

const Giver = ({ name, avatar, userId, followRelation, reactCount }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  return (
    <Box className={classes.root}>
      <Box display="flex" alignItems="center">
        <AppLink to="#">
          <IconButton>
            <Badge
              badgeContent={<Heart />}
              classes={{ badge: classes.badge }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Avatar className={classes.avatar} src={avatar} />
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
            {StringFormat(getLabel("FM_GIVERS"), reactCount)}
          </Typography>
        </Box>
      </Box>
      <FollowButton isFollowing={followRelation} className="ml-8" />
    </Box>
  );
};

const Heart = () => {
  const classes = useStyles();
  return (
    <IconButton disabled className={classes.heartBadge} component="div">
      <Box className="ic-heart" />
    </IconButton>
  );
};

Giver.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  reactCount: PropTypes.number,
  followRelation: PropTypes.bool,
  userId: PropTypes.number,
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: theme.spacing(2, 0),
    justifyContent: "space-between",
    alignItems: "center",
    "& a": {
      color: theme.palette.text.primary,
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.primary.main,
      },
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
  heartBadge: {
    width: 18,
    height: 18,
    border: `1px solid ${theme.palette.white}`,
    background: "radial-gradient(82.39% 62.87% at 50% 0%, #FA9393 0%, #F45A5A 100%)",
    "& .ic-heart": {
      fontSize: 10,
      color: theme.palette.white,
    },
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
  },
}));

export default Giver;
