import React, { useState } from "react";
import PropTypes from "prop-types";
import StringFormat from "string-format";
import clsx from "clsx";
import { convertDistanceDate } from "utils/date";
import { useTranslation } from "react-i18next";
import { AppConstant, PathConstant } from "const";
import { CustomRating, DialogAppDownload, AppLink } from "components";
import { makeStyles, Paper, Typography, Box, Avatar, Button } from "@material-ui/core";
import FooterButtons from "./FooterButtons";
import TopIconButtons from "./TopIconButtons";

const ReviewBox = ({ review, className, isArticleType, isReviewType }) => {
  const { articleId, title, intro, name, lastUpdate, avatar, thumbnail, reactCount, commentCount, rate } = review;
  const classes = useStyles();
  const shareUrl = AppConstant.WEBSITE_URL + StringFormat(PathConstant.FM_ARTICLE_DETAIL_ID, articleId);
  const { t: getLabel, i18n } = useTranslation();
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
      <AppLink className={classes.link} to={StringFormat(PathConstant.FM_ARTICLE_DETAIL_ID, articleId)}>
        <Button component="div" className={clsx(classes.button, className)}>
          <Paper className={clsx(classes.paper, "paper")}>
            <Box display="flex" alignItems="center">
              <Avatar src={avatar} />
              <Box ml={1}>
                <Typography variant="subtitle2">{name}</Typography>
                <Typography variant="caption">{displayDate}</Typography>
              </Box>
              <TopIconButtons onOpenDownload={onOpenDownload} />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box mr={{ xs: 2, md: 5, lg: 7 }}>
                <Typography className={clsx("eclipse", classes.title)} variant="subtitle1">
                  {title}
                </Typography>
                <CustomRating readOnly={true} defaultValue={rate} />
                <Typography variant="body2" className={clsx("eclipse", classes.content)}>
                  {intro}
                </Typography>
              </Box>
              <Avatar className={classes.thumbnail} variant="square" src={thumbnail} />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box className={classes.heartWrapper}>
                <Box className={clsx("ic-heart", classes.heartIcon)} />
                <Typography variant="body2" className={classes.greyText}>
                  {reactCount}
                </Typography>
              </Box>
              <Typography variant="body2" className={classes.greyText} onClick={onOpenDownload}>
                {StringFormat(getLabel("FM_COMMENT"), commentCount)}
              </Typography>
            </Box>
            {!isReviewType && !isArticleType && <FooterButtons shareUrl={shareUrl} onOpenDownload={onOpenDownload} />}
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
  greyText: {
    textTransform: "lowercase",
    color: theme.palette.text.secondary,
  },
  thumbnail: {
    width: 94,
    height: 142,
    borderRadius: 6,
  },
  title: {
    marginBottom: theme.spacing(1),
    WebkitLineClamp: "2 !important",
    lineHeight: "normal",
  },
  content: {
    WebkitLineClamp: "2 !important",
    marginTop: theme.spacing(1.5),
    color: theme.palette.text.secondary,
  },
  heartWrapper: {
    display: "flex",
    alignItems: "center",
    "&>*:first-child": {
      marginRight: theme.spacing(0.5),
    },
  },
  heartIcon: {
    color: theme.palette.danger.main,
    fontSize: 12,
  },
  link: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  button: {
    width: "100%",
    minWidth: "100%",
    height: "fit-content",
    padding: "0 !important",
    justifyContent: "flex-start",
  },
}));

ReviewBox.propTypes = {
  review: PropTypes.object,
  className: PropTypes.string,
  isReviewType: PropTypes.bool,
  isArticleType: PropTypes.bool,
};

export default ReviewBox;
