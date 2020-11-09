import React, { useState } from "react";
import PropTypes from "prop-types";
import StringFormat from "string-format";
import clsx from "clsx";
import { convertDistanceDate } from "utils/date";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant, PathConstant } from "const";
import CustomRating from "components/CustomRating";
import { makeStyles, Paper, Typography, Box, Avatar, Divider, Button, IconButton } from "@material-ui/core";
import DialogAppDownload from "components/DialogAppDownload";
import { FacebookShareButton } from "react-share";

const Review = ({ review, className }) => {
  const { articleId, title, intro, name, lastUpdate, avatar, thumbnail, reactCount, commentCount, rate } = review;
  const classes = useStyles();
  const shareUrl = AppConstant.WEBSITE_URL + StringFormat(PathConstant.FM_ARTICLE_DETAIL_ID, articleId);
  const { t: getLabel, i18n } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const displayDate = convertDistanceDate(new Date(lastUpdate), new Date(), i18n.language);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const onOpenDownload = () => {
    setIsDownloadOpen(true);
  };

  const onCloseDownload = () => {
    setIsDownloadOpen(false);
  };

  return (
    <>
      <DialogAppDownload isOpen={isDownloadOpen} onClose={onCloseDownload} />
      <Paper className={clsx(className, classes.root, "paper")}>
        <Box display="flex" alignItems="center">
          <Avatar src={avatar} />
          <Box ml={1}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{displayDate}</Typography>
          </Box>
          <Box ml="auto">
            <IconButton className={classes.iconButton} onClick={onOpenDownload}>
              <Box className="ic-bookmark-empty" />
            </IconButton>
            <IconButton className={classes.iconButton}>
              <Box className="ic-ellipsis-h" />
            </IconButton>
          </Box>
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
            {StringFormat(getLabel("FM_EDITION_BOOK_COMMENTS"), commentCount)}
          </Typography>
        </Box>
        <Divider className={classes.divider} />
        <Box display="flex" justifyContent="space-between">
          <Button
            startIcon={<Box className={clsx("ic-heart-empty", classes.textSecondary)} />}
            onClick={onOpenDownload}
          >
            {getLabel("TXT_EDITION_LOVE")}
          </Button>
          <Button startIcon={<Box className={clsx("ic-comment", classes.textSecondary)} />} onClick={onOpenDownload}>
            {getLabel("TXT_EDITION_COMMENT")}
          </Button>
          <FacebookShareButton resetButtonStyle={false} url={shareUrl} className={classes.shareButton}>
            <Button component="div" startIcon={<Box className={clsx("ic-share", classes.textSecondary)} />}>
              {getLabel("TXT_EDITION_SHARE")}
            </Button>
          </FacebookShareButton>
        </Box>
      </Paper>
    </>
  );
};

const PAPER_DEFAULT_PADDING_X = "24px";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(1),
    },
    "& button": {
      color: theme.palette.text.secondary,
    },
    padding: `${theme.spacing(2)}px !important`,
    paddingBottom: `${theme.spacing(1)}px !important`,
    [theme.breakpoints.down("xs")]: {
      paddingBottom: `${theme.spacing(0.5)}px !important`,
    },
  },
  divider: {
    width: `calc(100% + ${PAPER_DEFAULT_PADDING_X} * 2)`,
    marginLeft: `calc(${PAPER_DEFAULT_PADDING_X} * -1)`,
    marginBottom: `${theme.spacing(1)}px !important`,
    [theme.breakpoints.down("xs")]: {
      marginBottom: `${theme.spacing(0.5)}px !important`,
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
  shareButton: {
    width: "fit-content",
    height: "fit-content",
    border: "none",
    background: "none",
    "& span": {
      color: theme.palette.text.secondary,
    },
  },
  heartIcon: {
    color: theme.palette.danger.main,
    fontSize: 12,
  },
  textSecondary: {
    color: theme.palette.text.secondary,
    fontSize: 16,
  },
  iconButton: {
    fontSize: 16,
    color: theme.palette.text.secondary,
    width: 35,
    height: 35,
  },
}));

Review.propTypes = {
  review: PropTypes.object,
  className: PropTypes.string,
};

export default Review;
