import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import CustomRating from "components/CustomRating";
import { HeartIcon, MessageIcon, ShareIcon } from "icons";
import { makeStyles, useTheme, Paper, Typography, Box, Avatar, Divider, Button } from "@material-ui/core";

const Review = ({ review }) => {
  const { className, author, date, title, rating, content, love, comment, avatar, thumbnail, hasLoved } = review;
  const theme = useTheme();
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const [isAuth, setIsAuth] = useState(true);
  const [isLoved, setIsLoved] = useState(hasLoved);

  const onLove = () => {
    if (isAuth && !isLoved) setIsLoved(true);
  };

  return (
    <Paper className={clsx(className, classes.root, "paper")}>
      <Box display="flex" alignItems="center">
        <Avatar src={avatar}>{author}</Avatar>
        <Box ml={1}>
          <Typography variant="subtitle2">{author}</Typography>
          <Typography variant="caption">{date}</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box mr={{ xs: 2, md: 5, lg: 7 }}>
          <Typography className={clsx("eclipse", classes.title)} variant="subtitle1">
            {title}
          </Typography>
          <CustomRating readOnly={true} defaultValue={rating} size="medium" />
          <Typography variant="body2" className={clsx("eclipse", classes.content)}>
            {content}
          </Typography>
        </Box>
        <Avatar className={classes.thumbnail} variant="square" src={thumbnail}>
          Thumbnail
        </Avatar>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box className={classes.heartWrapper}>
          <HeartIcon width={12} height={12} color={theme.palette.error.main} />
          <Typography variant="body2" className={classes.greyText}>
            {love}
          </Typography>
        </Box>
        <Typography variant="body2" className={classes.greyText}>
          {comment + " " + getLabel("TXT_BOOKDETAIL_COMMENT")}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box display="flex" justifyContent="space-between">
        <Button
          classes={{ label: isLoved ? classes.activeButton : "" }}
          startIcon={<HeartIcon isActive={isLoved} />}
          onClick={onLove}
        >
          {getLabel("TXT_BOOKDETAIL_LOVE")}
        </Button>
        <Button startIcon={<MessageIcon />}>{getLabel("TXT_BOOKDETAIL_COMMENT")}</Button>
        <Button startIcon={<ShareIcon color={theme.palette.text.secondary} />}>
          {getLabel("TXT_BOOKDETAIL_SHARE")}
        </Button>
      </Box>
    </Paper>
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
  activeButton: {
    color: theme.palette.error.main,
  },
  heartWrapper: {
    display: "flex",
    alignItems: "center",
    "&>*:first-child": {
      marginRight: theme.spacing(0.5),
    },
  },
}));

Review.propTypes = {
  review: PropTypes.object,
};

export default Review;
