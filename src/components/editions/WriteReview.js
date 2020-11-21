import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Paper, Typography, Box, Avatar, Button, Hidden, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import { convertFormat } from "utils/date";
import { useTranslation } from "react-i18next";
import CustomRating from "../CustomRating";
import { LangConstant, PathConstant } from "const";
import { AvatarIcon } from "icons";
import { DialogAppDownload, AppLink } from "components";
import ArticleCreateActions from "redux/articleCreate.redux";

const WriteReview = ({ editionId, bookName }) => {
  //Mock
  let name, rate, avatar, review;

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const currentDate = convertFormat(new Date(), "dd/MM/yyyy");

  const dispatch = useDispatch();
  const dispatchStartReview = () => dispatch(ArticleCreateActions.startReviewBook(editionId, bookName, rate));

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const onRate = (e, newValue) => {
    setIsDownloadOpen(true);
  };

  const onCloseDownload = () => {
    setIsDownloadOpen(false);
  };

  const onGoToCreateReview = () => {
    dispatchStartReview();
  };

  return (
    <>
      <DialogAppDownload isOpen={isDownloadOpen} onClose={onCloseDownload} />
      <Paper className={clsx("paper", classes.root)}>
        <Typography variant="h6">{getLabel("TXT_EDITION_COMMENT_TITLE")}</Typography>
        <Hidden xsDown>
          <Button
            size="large"
            disabled
            classes={{ startIcon: classes.startIcon, disabled: classes.disabled }}
            startIcon={name ? <Avatar src={avatar}></Avatar> : <AvatarIcon width={46} height={46} className="mr-12" />}
          >
            {name}
          </Button>
        </Hidden>
        <Box display="flex" alignItems="center">
          <Typography className="mr-12">{getLabel("TXT_EDITION_YOUR_COMMENT")}</Typography>
          <CustomRating onChange={onRate} value={rate ? rate : 0} />
          <Typography variant="body2" className={classes.date}>
            {currentDate}
          </Typography>
        </Box>
        <AppLink to={PathConstant.ARTICLE_CREATE}>
          <Button
            size={isMobile ? "small" : "large"}
            className={clsx(classes.button, "blue-text")}
            onClick={onGoToCreateReview}
          >
            {review ? getLabel("TXT_EDITION_EDIT_COMMENT") : getLabel("TXT_EDITION_WRITE_COMMENT")}
          </Button>
        </AppLink>
      </Paper>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0 0 10px 10px !important",
    },
    "& a:hover": {
      textDecoration: "none",
    },
  },
  button: {
    marginLeft: theme.spacing(-1),
  },
  avatar: {
    width: 46,
    height: 46,
  },
  date: {
    color: theme.palette.text.secondary,
    marginLeft: "auto",
  },
  startIcon: {
    marginRight: theme.spacing(1.5),
    "&>*": {
      width: 46,
      height: 46,
    },
  },
  disabled: {
    color: `${theme.palette.text.primary} !important`,
    padding: "0 !important",
  },
}));

WriteReview.propTypes = {
  editionId: PropTypes.number,
  bookName: PropTypes.string,
};

export default WriteReview;
