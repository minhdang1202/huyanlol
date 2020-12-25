import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
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
import { BookmarkIcon, DotIcon, HeartIcon, MessageIcon } from "icons";
import { useTranslation } from "react-i18next";
import { AppConstant, PathConstant, ApiConstant } from "const";
import StringFormat from "string-format";
import clsx from "clsx";
import { getCreatedTime } from "utils/date";
import { parseISO } from "date-fns";
import { getImageById, getTitleNoMark, getAbsolutePath } from "utils";
import { useRouter } from "next/router";
import { FBShareButton, AppLink, CustomRating, ReactButton, AuthDialog } from "components";
import { useDispatch } from "react-redux";
import ArticleActions from "redux/article.redux";
import { ArticleService } from "services";
import { hasLogged } from "utils/auth";

const ReviewSummary = ({ data, isHiddenAction, classes }) => {
  const defaultClasses = useStyles({ isHidden: isHiddenAction });
  const { t: getLabel } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [creator, setCreator] = useState({});
  const [review, setReview] = useState({});
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
      const { status } = await ArticleService.postBookmarkArticle(review.articleId);
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
      const { creator, ...review } = data;
      if (creator) setCreator(creator);
      if (review) setReview(review);
      if (review) {
        let newReview = { ...review };
        if (newReview.hashtags) {
          newReview.hashtags = newReview.hashtags < 4 ? newReview.hashtags : newReview.hashtags.slice(0, 3);
        }
        let createTime = review.lastUpdate || review.publishedDate;
        if (createTime) {
          newReview.createTime = getCreatedTime(parseISO(createTime));
        }
        setReview(newReview);
        let linkToReview;
        if (newReview.title) {
          const articleTitleNoMark = getTitleNoMark(newReview.title);
          linkToReview = StringFormat(PathConstant.FM_ARTICLE_DETAIL, articleTitleNoMark, newReview.articleId);
        } else if (newReview.articleId) {
          linkToReview = StringFormat(PathConstant.FM_ARTICLE_DETAIL_ID, newReview.articleId);
        }
        setLinkToDetail(linkToReview);
        setIsBookmarked(review.saved);
      }
    }
  }, [data]);

  let isHeart = Boolean(getTotalReactCount(review.reactCount, tempReactAddition) > 0);

  return (
    <Card className={clsx(defaultClasses.root, classes && classes.root)}>
      <CardHeader
        classes={{ root: defaultClasses.header, action: defaultClasses.headerAction }}
        avatar={
          <AppLink className="no-style-link">
            <Avatar src={getImageById(creator.imageId)} className={defaultClasses.headerAvatar}>
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
            {review.createTime}
          </Typography>
        }
      />

      <CardContent className={defaultClasses.main}>
        <AppLink className="no-style-link" to={linkToDetail}>
          <Grid container>
            <Grid item xs={8} md={9}>
              <Typography variant="subtitle1" component="p">
                {review.title}
              </Typography>
              <CustomRating
                readOnly={true}
                value={
                  review.editions && review.editions[0] && review.editions[0].userRelation
                    ? review.editions[0].userRelation.evaluation.rate
                    : 0
                }
                size="small"
              />
              <Typography variant="body2" color="textSecondary" component="p" className="eclipse-2">
                {review.intro}
              </Typography>
            </Grid>
            <Grid item xs={4} md={3} className={defaultClasses.mainCover}>
              <CardMedia
                src={getImageById(review.editions && review.editions[0] && review.editions[0].imageId)}
                title={review.title}
                component="img"
              />
            </Grid>

            <Grid item xs={8} md={9} className={defaultClasses.mainTotalHeart}>
              <HeartIcon isActive={isHeart} width={12} height={12} />
              <Typography variant="body2" color="textSecondary" component="p">
                {getTotalReactCount(review.reactCount, tempReactAddition)}
              </Typography>
            </Grid>
            <Grid item xs={4} md={3}>
              <Typography variant="body2" color="textSecondary" component="p">
                {StringFormat(getLabel("FM_NUMBER_COMMENTS"), review.commentCount || 0)}
              </Typography>
            </Grid>
          </Grid>
        </AppLink>
      </CardContent>

      {!isHiddenAction && <Divider />}
      <CardActions disableSpacing className={defaultClasses.action} onClick={onStopTriggerParent}>
        <ReactButton
          articleId={review.articleId}
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
  bookTitle: {
    padding: "4px 0",
    "& .ic-book, a": { color: theme.palette.text.link },
  },
  bookTitleIcon: {
    minWidth: "max-content",
    marginRight: 4,
  },
  bookTitleText: {},
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
      "& .ic-share": {
        fontSize: 17,
      },
    },
  },
}));

ReviewSummary.propTypes = {
  data: PropTypes.object,
  isHiddenAction: PropTypes.bool,
  classes: PropTypes.object,
};
ReviewSummary.defaultProps = { isHiddenAction: false, classes: {} };

export default memo(ReviewSummary);
