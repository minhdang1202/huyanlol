import React from "react";
import { makeStyles, Typography, Paper, Box, useTheme, useMediaQuery } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import StringFormat from "string-format";
import { AppLink, Avatar } from "components";
import { useSelector } from "react-redux";
import { getImageById } from "utils";
import { getCreatedTime } from "utils/date";
import { AppConstant, PathConstant } from "const";
import PropTypes from "prop-types";
import clsx from "clsx";
const Activity = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const activity = useSelector(state => state.challengeRedux.detail.detailActivity);
  return (
    <Box className={classes.root}>
      <Typography variant={"h6"} className={classes.title}>
        {getLabel("L_ACTIVITY")}
      </Typography>
      {activity.map((each, index) =>
        index < AppConstant.CHALLENGE_ACTIVITY_SIZE ? (
          <Item
            activityData={each}
            className={classes.item}
            key={clsx(each.user.userId, each.edition && each.edition.editionId, each.activityTypeId)}
          />
        ) : null,
      )}
    </Box>
  );
};

const Item = ({ activityData }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const { user, createDate, edition, activityTypeId } = activityData;
  const { WEBSITE_URL, CHALLENGE_ACTIVITY_TYPE } = AppConstant;
  const bookLink = edition ? WEBSITE_URL + StringFormat(PathConstant.FM_BOOK_DETAIL_ID, edition.editionId) : "#";
  const getFormatByTypeId = typeId => {
    switch (typeId) {
      case CHALLENGE_ACTIVITY_TYPE.join:
        return "FM_ACTIVITY_JOIN";
      case CHALLENGE_ACTIVITY_TYPE.read:
        return "FM_ACTIVITY_READ";
      case CHALLENGE_ACTIVITY_TYPE.share:
        return "FM_ACTIVITY_SHARE";
      case CHALLENGE_ACTIVITY_TYPE.write:
        return "FM_ACTIVITY_WRITE";
      default:
        return "";
    }
  };
  return (
    <Paper className={classes.item}>
      <Box className={classes.itemTop}>
        <AppLink>
          <Avatar src={getImageById(user.imageId)} className={classes.avatar} />
        </AppLink>
        <Box className={classes.topText}>
          <AppLink>
            <Typography variant="subtitle2" color="textPrimary">
              {user.name}
            </Typography>
          </AppLink>
          <Typography variant="caption">{getCreatedTime(new Date(createDate))}</Typography>
        </Box>
      </Box>
      <Box className={classes.content}>
        <Typography
          variant={isMobile ? "body2" : "subtitle1"}
          dangerouslySetInnerHTML={{
            __html: StringFormat(
              getLabel(getFormatByTypeId(activityTypeId)),
              user.name,
              bookLink,
              edition ? edition.title : "",
            ),
          }}
        />

        {!isMobile && edition && (
          <AppLink to={StringFormat(PathConstant.FM_BOOK_DETAIL_ID, edition.editionId)}>
            <Avatar alt="book" src={getImageById(edition.imageId)} variant="square" className={classes.img} />
          </AppLink>
        )}
      </Box>
    </Paper>
  );
};
Item.propTypes = {
  activityData: PropTypes.object,
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      padding: "0px 0px 6px 16px",
    },
  },
  item: {
    width: "100%",
    borderRadius: "10px",
    margin: "16px 0px 16px 0px",
    [theme.breakpoints.down("xs")]: {
      margin: "2px 0px 2px 0px",
      borderRadius: "0px",
    },
  },

  itemTop: {
    display: "flex",
  },
  avatar: {
    width: "40px",
    height: "40px",
  },
  topText: {
    marginLeft: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      "&>:nth-child(1)": {
        marginRight: theme.spacing(2),
      },
    },
  },
  img: {
    width: "94px",
    height: "142px",
    borderRadius: "6px",
    marginLeft: theme.spacing(3),
  },
  text: {
    "&>:nth-child(3)": {
      color: theme.palette.primary.main,
    },
  },
}));
export default Activity;
