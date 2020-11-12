import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import { CategoryTag, Hashtag } from "components";
import { BookmarkIcon, DotIcon, HeartIcon, MessageIcon, ShareIcon } from "icons";
import { useTranslation } from "react-i18next";
import { AppConstant } from "const";
import StringFormat from "string-format";
import { getImageById, uuid } from "utils";
import clsx from "clsx";
import { getCreatedTime } from "utils/date";
import { parseISO } from "date-fns";

const ArticleSummary = ({ data, isHiddenAction }) => {
  const defaultClasses = useStyles({ isHidden: isHiddenAction });
  const { t: getLabel } = useTranslation();
  const theme = useTheme();

  const [creator, setCreator] = useState({});
  const [book, setBook] = useState({});
  const [article, setArticle] = useState({});

  useEffect(() => {
    if (data) {
      const { creator, editions, ...article } = data;
      if (creator) setCreator(creator);
      if (editions && editions[0]) setBook(editions[0]);
      if (article) {
        let newArticle = { ...article };
        if (newArticle.hashtags) {
          newArticle.hashtags = newArticle.hashtags < 4 ? newArticle.hashtags : newArticle.hashtags.slice(0, 3);
        }
        let createTime = article.lastUpdate || article.publishedDate;
        if (createTime) {
          newArticle.createTime = getCreatedTime(parseISO(createTime));
        }
        setArticle(newArticle);
      }
    }
  }, [data]);

  let isHeart = Boolean(article.reactCount && article.reactCount > 0);

  return (
    <Card className={defaultClasses.root}>
      <CardHeader
        classes={{ root: defaultClasses.header, action: defaultClasses.headerAction }}
        avatar={
          <Avatar aria-label="recipe" src={getImageById(creator.imageId)} className={defaultClasses.headerAvatar}>
            {(creator.name || AppConstant.APP_NAME).charAt(0)}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="bookmark" classes={{ label: defaultClasses.bookmarkButton }}>
              <BookmarkIcon color="white" stroke="currentColor" />
            </IconButton>
            <IconButton aria-label="settings">
              <DotIcon />
            </IconButton>
          </>
        }
        title={
          <Typography variant="subtitle2" component="p">
            {creator.name}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="textSecondary" component="p">
            {article.createTime}
          </Typography>
        }
      />

      <CardContent className={defaultClasses.main}>
        <Grid container>
          <Grid item xs={8} md={9}>
            <Typography variant="subtitle1" component="p">
              {article.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className="eclipse-2">
              {article.intro}
            </Typography>
            {article.hashtags && (
              <Box>
                {article.hashtags.map(hashtag => (
                  <Hashtag content={hashtag.tagName} key={uuid()} />
                ))}
              </Box>
            )}
            {article.categories && (
              <Box ml="-6px">
                {article.categories.map(category => (
                  <CategoryTag content={category.title} key={uuid()} />
                ))}
              </Box>
            )}
          </Grid>
          <Grid item xs={4} md={3} className={defaultClasses.mainCover}>
            <CardMedia src={getImageById(book.imageId)} title={book.title} component="img" />
          </Grid>

          <Grid item xs={8} md={9} className={defaultClasses.mainTotalHeart}>
            <HeartIcon isActive={isHeart} width={12} height={12} />
            <Typography variant="body2" color="textSecondary" component="p">
              {article.reactCount}
            </Typography>
          </Grid>
          <Grid item xs={4} md={3}>
            <Typography variant="body2" color="textSecondary" component="p">
              {StringFormat(getLabel("FM_NUMBER_COMMENTS"), article.commentCount || 0)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      {!isHiddenAction && <Divider />}
      <CardActions disableSpacing className={defaultClasses.action}>
        <Button startIcon={<HeartIcon isActive={isHeart} />} className={clsx(isHeart && defaultClasses.heartColor)}>
          {getLabel("TXT_LOVE")}
        </Button>
        <Button startIcon={<MessageIcon />}>{getLabel("TXT_COMMENT")}</Button>
        <Button startIcon={<ShareIcon color={theme.palette.text.secondary} />}>{getLabel("TXT_SHARE")}</Button>
      </CardActions>
    </Card>
  );
};

ArticleSummary.propTypes = {
  data: PropTypes.object,
  isHiddenAction: PropTypes.bool,
};
ArticleSummary.defaultProps = { isHiddenAction: false };

export default memo(ArticleSummary);

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,

    "& > *:not(hr)": {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  header: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  headerAvatar: { width: 32, height: 32 },
  headerAction: {
    display: props => (props.isHidden ? "none" : "block"),
    margin: 0,
    "& *": { color: theme.palette.text.secondary },
    "& button:last-child": {
      marginRight: -9,
    },
  },
  bookmarkButton: {
    width: 24,
    height: 24,
    "& svg": {
      width: 12,
      height: 16,
      fontSize: 16,
    },
  },
  main: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  mainCover: {
    "& > *": {
      width: 94,
      height: 142,
      borderRadius: 6,
      float: "right",
    },
  },
  mainTotalHeart: {
    display: "flex",
    alignItems: "center",

    "& > *:first-child": {
      marginRight: theme.spacing(1),
    },

    "&, & + *": {
      marginTop: theme.spacing(2.5),
      "& > *": {
        float: "right",
      },
    },
  },
  heartColor: {
    "&, & *": {
      color: theme.palette.error.main,
    },
  },
  action: {
    display: props => (props.isHidden ? "none" : "flex"),
    paddingTop: 6,
    paddingBottom: 6,
    justifyContent: "space-between",

    "& button:first-child": {
      marginLeft: -6,
    },
    "& button": {
      color: theme.palette.text.secondary,
    },
  },
}));
