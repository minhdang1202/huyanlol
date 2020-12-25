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
} from "@material-ui/core";
import { CategoryTag, FBShareButton, Hashtag, ReactButton, AuthDialog } from "components";
import { BookmarkIcon, DotIcon, HeartIcon, MessageIcon } from "icons";
import { useTranslation } from "react-i18next";
import { AppConstant, PathConstant, ApiConstant } from "const";
import StringFormat from "string-format";
import { getImageById, getTitleNoMark, uuid, getAbsolutePath } from "utils";
import clsx from "clsx";
import { getCreatedTime } from "utils/date";
import { parseISO } from "date-fns";
import { useRouter } from "next/router";
import AppLink from "./AppLink";
import { useDispatch } from "react-redux";
import ArticleActions from "redux/article.redux";
import { ArticleService } from "services";
import { hasLogged } from "utils/auth";

const ArticleSummary = ({ data, isHeaderAction, isAction, isSummaryReact, classes }) => {
  const defaultClasses = useStyles({ isHeader: isHeaderAction, isAction: isAction });
  const { t: getLabel } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [creator, setCreator] = useState({});
  const [article, setArticle] = useState({});
  const [linkToDetail, setLinkToDetail] = useState();
  const [tempReactAddition, setTempReactAddition] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState();
  const [isOpenAuthDialog, setIsOpenAuthDialog] = useState(false);

  const onGoToDetail = () => {
    dispatch(ArticleActions.setIsOpenCommentDetail(true));
    router.push(linkToDetail);
  };

  const onBookmark = async event => {
    event.stopPropagation();
    if (hasLogged()) {
      const { status } = await ArticleService.postBookmarkArticle(article.articleId);
      if (status === ApiConstant.STT_OK) setIsBookmarked(!isBookmarked);
    } else {
      setIsOpenAuthDialog(true);
    }
  };

  const onSetting = event => {
    event.stopPropagation();
    console.log("onSetting");
  };

  const onStopTriggerParent = event => {
    event.stopPropagation();
  };
  const onClickHashtag = event => {
    event.stopPropagation();
  };
  const onClickCategory = categoryId => {
    console.log(categoryId);
  };
  const onAddReactTemp = () => {
    setTempReactAddition(tempReactAddition => tempReactAddition + 1);
  };
  const onCloseAuthDialog = () => setIsOpenAuthDialog(false);

  const getTotalReactCount = (base, temp) => {
    if (!base) base = 0;
    return temp <= AppConstant.USER_MAX_REACT_COUNT ? base + temp : base + AppConstant.USER_MAX_REACT_COUNT;
  };

  useEffect(() => {
    if (data) {
      const { creator, ...article } = data;
      if (creator) setCreator(creator);
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
        let linkToArticle;
        if (newArticle.title) {
          const articleTitleNoMark = getTitleNoMark(newArticle.title);
          linkToArticle = StringFormat(PathConstant.FM_ARTICLE_DETAIL, articleTitleNoMark, newArticle.articleId);
        } else if (newArticle.articleId) {
          linkToArticle = StringFormat(PathConstant.FM_ARTICLE_DETAIL_ID, newArticle.articleId);
        }
        setLinkToDetail(linkToArticle);
        setIsBookmarked(article.saved);
      }
    }
  }, [data]);

  let isHeart = Boolean(getTotalReactCount(article.reactCount, tempReactAddition) > 0);
  return (
    <Card className={clsx(defaultClasses.root, classes && classes.root)}>
      <CardHeader
        classes={{ root: defaultClasses.header, action: defaultClasses.headerAction }}
        avatar={
          <AppLink className="no-style-link">
            <Avatar aria-label="recipe" src={getImageById(creator.imageId)} className={defaultClasses.headerAvatar}>
              {(creator.name || AppConstant.APP_NAME).charAt(0)}
            </Avatar>
          </AppLink>
        }
        action={
          <>
            <IconButton aria-label="bookmark" classes={{ label: defaultClasses.bookmarkButton }} onClick={onBookmark}>
              <BookmarkIcon color="white" stroke={isBookmarked ? "#001a39" : "currentColor"} />
            </IconButton>
            <IconButton aria-label="settings" onClick={onSetting}>
              <DotIcon />
            </IconButton>
          </>
        }
        title={
          <AppLink className="no-style-link">
            <Typography variant="subtitle2" component="p">
              {creator.name}
            </Typography>
          </AppLink>
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
            <AppLink className="no-style-link" to={linkToDetail}>
              <Typography variant="subtitle1" component="p">
                {article.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className="eclipse-2">
                {article.intro}
              </Typography>
            </AppLink>

            {article.hashtags && (
              <Box>
                {article.hashtags.map(hashtag => (
                  <AppLink key={uuid()} className="no-style-link">
                    <Hashtag content={hashtag.tagName} onClick={onClickHashtag} />
                  </AppLink>
                ))}
              </Box>
            )}
            {article.categories && (
              <Box ml="-6px">
                {article.categories.map(category => (
                  <AppLink
                    key={uuid()}
                    className="no-style-link"
                    to={StringFormat(PathConstant.FM_ARTICLES_BY_CATEGORY, category.categoryId)}
                  >
                    <CategoryTag content={category.title} onClick={() => onClickCategory(category)} />
                  </AppLink>
                ))}
              </Box>
            )}
          </Grid>
          <Grid item xs={4} md={3} className={defaultClasses.mainCover}>
            <AppLink className="no-style-link" to={linkToDetail}>
              <CardMedia src={getImageById(article.thumbnailId)} title={article.title} component="img" />
            </AppLink>
          </Grid>
          {isSummaryReact && (
            <>
              <Grid item xs={8} md={9} className={defaultClasses.mainTotalHeart}>
                <HeartIcon isActive={isHeart} width={12} height={12} />
                <Typography variant="body2" color="textSecondary" component="p">
                  {getTotalReactCount(article.reactCount, tempReactAddition)}
                </Typography>
              </Grid>
              <Grid item xs={4} md={3}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {StringFormat(getLabel("FM_NUMBER_COMMENTS"), article.commentCount || 0)}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>

      {isAction && <Divider />}
      <CardActions disableSpacing className={defaultClasses.action} onClick={onStopTriggerParent}>
        <ReactButton
          articleId={article.articleId}
          userRelation={data.userRelation}
          changeParentTempCount={onAddReactTemp}
        />
        <Button startIcon={<MessageIcon />} onClick={onGoToDetail}>
          {getLabel("TXT_COMMENT")}
        </Button>
        <FBShareButton url={getAbsolutePath(linkToDetail)} />
      </CardActions>
      <AuthDialog isOpen={isOpenAuthDialog} onClose={onCloseAuthDialog} />
    </Card>
  );
};

ArticleSummary.propTypes = {
  data: PropTypes.object,
  isAction: PropTypes.bool,
  isHeaderAction: PropTypes.bool,
  isSummaryReact: PropTypes.bool,
  classes: PropTypes.object,
};
ArticleSummary.defaultProps = { isAction: true, isHeaderAction: true, isSummaryReact: true, classes: {} };

export default memo(ArticleSummary);

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    cursor: "pointer",

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
    display: props => (props.isHeader ? "block" : "none"),
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
    display: props => (props.isAction ? "flex" : "none"),
    paddingTop: 6,
    paddingBottom: 6,
    justifyContent: "space-between",

    "& button:first-child": {
      marginLeft: -6,
    },
    "& button": {
      color: theme.palette.text.secondary,
      "& .ic-share": {
        fontSize: 17,
      },
    },
  },
}));
