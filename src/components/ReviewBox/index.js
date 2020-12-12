import React, { useState } from "react";
import PropTypes from "prop-types";
import StringFormat from "string-format";
import clsx from "clsx";
import { getAbsolutePath } from "utils";
import { convertDistanceDate } from "utils/date";
import { useTranslation } from "react-i18next";
import { AppConstant, PathConstant } from "const";
import { CustomRating, DialogAppDownload, AppLink } from "components";
import { makeStyles, Paper, Typography, Box, Avatar, Button, IconButton } from "@material-ui/core";
import FooterButtons from "./FooterButtons";
import TopIconButtons from "./TopIconButtons";
import HashtagButtons from "./HashtagButtons";
import BookNameButton from "./BookNameButton";
import ReactButtons from "./ReactButtons";

const ReviewBox = ({ review, className, isArticleType, isReviewType, isSlide, isBookDetail }) => {
  const {
    articleId,
    title,
    intro,
    name,
    lastUpdate,
    avatar,
    thumbnail,
    reactCount,
    commentCount,
    rate,
    hashtags,
    categories,
    bookName,
    editionId,
  } = review;
  const classes = useStyles({ isArticleType, isReviewType });
  const shareUrl = getAbsolutePath(StringFormat(PathConstant.FM_ARTICLE_DETAIL_ID, articleId));
  const articleUrl = StringFormat(PathConstant.FM_ARTICLE_DETAIL_ID, articleId);
  const editionUrl = editionId ? "#" : null;
  const { i18n } = useTranslation();
  const displayDate = convertDistanceDate(new Date(lastUpdate), new Date(), i18n.language);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const onOpenDownload = event => {
    event.preventDefault();
    setIsDownloadOpen(true);
  };

  const onCloseDownload = () => {
    setIsDownloadOpen(false);
  };

  return (
    <>
      <DialogAppDownload isOpen={isDownloadOpen} onClose={onCloseDownload} />
      <AppLink className={classes.link} to={articleUrl} component="div">
        <Button component="div" className={clsx(classes.button, className)}>
          <Paper className={clsx(classes.paper, "paper")}>
            <Box display="flex" alignItems="center">
              <AppLink to="#">
                <IconButton className={classes.avatarButton}>
                  <Avatar src={avatar} />
                </IconButton>
              </AppLink>
              <Box ml={1}>
                <AppLink to="#">
                  <Typography variant="subtitle2" component="div">
                    {name}
                  </Typography>
                </AppLink>
                <Typography variant="caption">{displayDate}</Typography>
              </Box>
              <TopIconButtons onOpenDownload={onOpenDownload} />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box mr={{ xs: 2, md: 5, lg: 7 }}>
                <Typography className={clsx("eclipse", classes.title)} variant="subtitle1">
                  {title}
                </Typography>
                {isReviewType && <CustomRating readOnly={true} defaultValue={rate} />}
                <Typography variant="body2" className={clsx("eclipse-2", classes.content)}>
                  {intro}
                </Typography>
                {isReviewType && !isBookDetail && <BookNameButton editionUrl={editionUrl} bookName={bookName} />}
                {isArticleType && (
                  <HashtagButtons articleUrl={articleUrl} hashtags={hashtags} category={categories[0]} />
                )}
              </Box>
              <Avatar className={classes.thumbnail} variant="square" src={thumbnail} />
            </Box>
            <ReactButtons commentCount={commentCount} reactCount={reactCount} articleUrl={articleUrl} />
            {!isSlide && <FooterButtons shareUrl={shareUrl} onOpenDownload={onOpenDownload} />}
          </Paper>
        </Button>
      </AppLink>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  paper: {
    width: "100%",
    "& button": {
      color: theme.palette.text.secondary,
    },
    padding: `${theme.spacing(2)}px !important`,
    paddingBottom: `${theme.spacing(1)}px !important`,
    [theme.breakpoints.down("xs")]: {
      paddingBottom: `${theme.spacing(0.5)}px !important`,
    },
  },
  thumbnail: {
    width: 94,
    height: 142,
    borderRadius: 6,
  },
  title: {
    marginBottom: theme.spacing(1),
    lineHeight: "normal",
  },
  content: {
    marginTop: theme.spacing(1.5),
    color: theme.palette.text.secondary,
  },
  link: {
    "&:hover": {
      textDecoration: "none",
    },
    "& a": {
      color: theme.palette.text.primary,
    },
  },
  button: {
    width: "100%",
    minWidth: "100%",
    height: "fit-content",
    padding: "0 !important",
    justifyContent: "flex-start",
  },
  avatarButton: {
    padding: "0 !important",
    minWidth: "fit-content",
    width: "fit-content",
  },
}));

ReviewBox.propTypes = {
  review: PropTypes.object,
  className: PropTypes.string,
  isReviewType: PropTypes.bool, //has Rating
  isArticleType: PropTypes.bool, //has Hashtags
  isSlide: PropTypes.bool,
  isBookDetail: PropTypes.bool, // hidden BookNameButton
};

export default ReviewBox;
