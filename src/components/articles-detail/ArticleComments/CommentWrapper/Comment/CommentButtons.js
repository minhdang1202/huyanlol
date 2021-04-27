import React, { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import StringFormat from "string-format";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Button, Box, useTheme, useMediaQuery, makeStyles } from "@material-ui/core";
import ArticleActions from "redux/article.redux";
import GiversList from "../../../GiversList";
import { AuthDialog, DialogAppDownload } from "components";
import { MOBILE_INPUT_ID } from "../../MobileCommentInput";
import CommentReact from "./CommentReact";

const CommentButtons = ({ comment, isDesktopComment, tempReactCount }) => {
  const { reactCount, replyCount, commentId, userReaction } = comment;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation();
  const { isAuth } = useSelector(({ authRedux }) => authRedux);
  const dispatch = useDispatch();

  const [isOpenDownload, setIsOpenDownload] = useState(false);
  const [isOpenGivers, setIsOpenGivers] = useState(false);
  const [isOpenAuthDialog, setIsOpenAuthDialog] = useState(false);

  const onOpenGiversList = () => {
    setIsOpenGivers(true);
  };

  const onCloseGiversList = () => {
    setIsOpenGivers(false);
  };

  const onOpenDownload = () => {
    setIsOpenDownload(true);
  };
  const onCloseDownload = () => {
    setIsOpenDownload(false);
  };

  const onCloseAuthDialog = () => {
    setIsOpenAuthDialog(false);
  };
  const onReplyComment = () => {
    if (!isAuth) {
      setIsOpenAuthDialog(true);
      return;
    }
    if (isMobile) {
      const mobileInput = document.getElementById(MOBILE_INPUT_ID);
      mobileInput.click();
    }
    dispatch(ArticleActions.replyComment(comment));
  };

  return (
    <>
      {isOpenGivers && (
        <GiversList
          isOpen={true}
          onClose={onCloseGiversList}
          reactCount={reactCount + tempReactCount}
          commentId={commentId}
        />
      )}
      {isOpenAuthDialog && <AuthDialog isOpen={true} onClose={onCloseAuthDialog} />}
      {isOpenDownload && <DialogAppDownload isOpen={true} onClose={onCloseDownload} />}
      {!isDesktopComment ? (
        <Box display="flex">
          <Button size="small" className={clsx(classes.buttonMobile, "grey-text", "mr-4")} onClick={onReplyComment}>
            {getLabel("TXT_REPLY")}
          </Button>
          <Button size="small" className={clsx(classes.buttonMobile, "grey-text")} onClick={onOpenGiversList}>
            {StringFormat(getLabel("FM_LOVE"), reactCount + tempReactCount)}
          </Button>
        </Box>
      ) : (
        <Box display="flex">
          <CommentReact
            commentId={commentId}
            totalReactCount={reactCount}
            baseReactCount={userReaction ? userReaction.reactCount : 0}
          />
          <Button className="grey-text" startIcon={<Box className="ic-comment" />}>
            {StringFormat(getLabel("FM_COMMENT"), replyCount)}
          </Button>
        </Box>
      )}
    </>
  );
};

CommentButtons.propTypes = {
  comment: PropTypes.object,
  isDesktopComment: PropTypes.bool,
  tempReactCount: PropTypes.number,
};

export default memo(CommentButtons);

const useStyles = makeStyles(theme => ({
  buttonMobile: {
    margin: theme.spacing(-1, 0, 0, -1),
  },
}));
