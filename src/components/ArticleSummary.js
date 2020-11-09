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
import { uuid } from "utils";
import clsx from "clsx";

const ArticleSummary = ({ data, isHiddenAction }) => {
  const classes = useStyles({ isHidden: isHiddenAction });
  const { t: getLabel } = useTranslation();
  const theme = useTheme();

  const [user, setUser] = useState({});
  const [book, setBook] = useState({});
  const [article, setArticle] = useState({});

  useEffect(() => {
    if (data) {
      const { user, book, ...article } = data;
      if (user) setUser(user);
      if (book) setBook(book);
      if (article) {
        let newArticle = { ...article };
        if (newArticle.hashtags) {
          newArticle.hashtags = newArticle.hashtags.splice(0, 3);
        }
        setArticle(newArticle);
      }
    }
  }, [data]);

  let isHeart = Boolean(article.heart && article.heart > 0);

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{ root: classes.header, action: classes.headerAction }}
        avatar={
          <Avatar aria-label="recipe" src={user.avatar} className={classes.headerAvatar}>
            {(user.name || AppConstant.APP_NAME).charAt(0)}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="bookmark" classes={{ label: classes.bookmarkButton }}>
              <BookmarkIcon color="white" stroke="currentColor" />
            </IconButton>
            <IconButton aria-label="settings">
              <DotIcon />
            </IconButton>
          </>
        }
        title={
          <Typography variant="subtitle2" component="p">
            {user.name}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="textSecondary" component="p">
            {article.time}
          </Typography>
        }
      />

      <CardContent className={classes.main}>
        <Grid container>
          <Grid item xs={8} md={9}>
            <Typography variant="subtitle1" component="p">
              {book.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className="eclipse-2">
              {book.description}
            </Typography>
            {article.hashtags && (
              <Box>
                {article.hashtags.map(hashtag => (
                  <Hashtag content={hashtag} key={uuid()} />
                ))}
              </Box>
            )}
            {article.categories && <Box ml="-6px">{<CategoryTag content={article.categories[0]} key={uuid()} />}</Box>}
          </Grid>
          <Grid item xs={4} md={3} className={classes.mainCover}>
            <CardMedia src={book.cover} title={book.title} component="img" />
          </Grid>

          <Grid item xs={8} md={9} className={classes.mainTotalHeart}>
            <HeartIcon isActive={isHeart} width={12} height={12} />
            <Typography variant="body2" color="textSecondary" component="p">
              {article.heart}
            </Typography>
          </Grid>
          <Grid item xs={4} md={3}>
            <Typography variant="body2" color="textSecondary" component="p">
              {StringFormat(getLabel("FM_NUMBER_COMMENTS"), article.numberComments)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />
      <CardActions disableSpacing className={classes.action}>
        <Button startIcon={<HeartIcon isActive={isHeart} />} className={clsx(isHeart && classes.heartColor)}>
          {getLabel("TXT_LOVE")}
        </Button>
        <Button startIcon={<MessageIcon />}>{getLabel("TXT_COMMENT")}</Button>
        <Button startIcon={<ShareIcon color={theme.palette.text.secondary} />}>{getLabel("TXT_SHARE")}</Button>
      </CardActions>
    </Card>
  );
};

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

ArticleSummary.propTypes = {
  data: PropTypes.object,
  isHiddenAction: PropTypes.bool,
};
ArticleSummary.defaultProps = { isHiddenAction: false };

export default memo(ArticleSummary);
