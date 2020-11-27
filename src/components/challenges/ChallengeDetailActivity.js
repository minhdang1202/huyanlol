import React, { useState } from "react";
import { makeStyles, Typography, Paper, Box, useTheme, useMediaQuery } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import StringFormat from "string-format";
import { AppLink, Avatar, ArticleSummary } from "components";
import { useSelector } from "react-redux";
import { getImageById } from "utils";
import { getCreatedTime } from "utils/date";
import { AppConstant, PathConstant, LangConstant } from "const";
import PropTypes from "prop-types";
const Activity = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const activities = useSelector(state => state.challengeRedux.detailListActivity);
  const articles = useSelector(state => state.articleRedux.challengeArticles);
  const targetTypeId = useSelector(state => state.challengeRedux.detailInfo.targetTypeId);
  const [isArticle, setIsArticle] = useState(
    Boolean(
      targetTypeId === AppConstant.CHALLENGE_TARGET_TYPE.writeArticle ||
        targetTypeId === AppConstant.CHALLENGE_ACTIVITY_TYPE.writeArticleList,
    ),
  );
  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        {(targetTypeId === AppConstant.CHALLENGE_TARGET_TYPE.writeArticle ||
          targetTypeId === AppConstant.CHALLENGE_ACTIVITY_TYPE.writeArticleList) && (
          <Typography
            variant={"h6"}
            className={classes.title}
            color={isArticle ? "textPrimary" : "textSecondary"}
            onClick={() => setIsArticle(true)}
          >
            {getLabel("L_ARTICLE")}
          </Typography>
        )}
        <Typography
          variant={"h6"}
          className={classes.title}
          color={!isArticle ? "textPrimary" : "textSecondary"}
          onClick={() => setIsArticle(false)}
        >
          {getLabel("L_ACTIVITY")}
        </Typography>
      </Box>

      {!isArticle
        ? activities.map(
            (each, index) =>
              index < AppConstant.CHALLENGE_ACTIVITY_SIZE && (
                <Item activityData={each} className={classes.item} key={each.activityId} />
              ),
          )
        : articles.map(
            (each, index) =>
              index < AppConstant.CHALLENGE_ACTIVITY_SIZE && (
                <ArticleSummary key={each.articleId} data={each} className={classes.article} />
              ),
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
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(10),
    },
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
  title: {
    cursor: "pointer",
    "&:first-of-type": {
      marginRight: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      padding: "12px 0px 16px 0px",
      "&:first-of-type": {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      },
    },
  },
  item: {
    width: "100%",
    borderRadius: "10px",
    margin: "16px 0px 16px 0px",
    [theme.breakpoints.down("xs")]: {
      margin: "2px 0px 2px 0px",
      borderRadius: "0px",
      "&:first-of-type": {
        marginTop: theme.spacing(1),
      },
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
  article: {
    marginTop: "16px",
    [theme.breakpoints.down("xs")]: {
      "&:first-of-type": {
        marginTop: theme.spacing(1),
      },
      marginTop: "1px",
    },
  },
}));
export default Activity;
