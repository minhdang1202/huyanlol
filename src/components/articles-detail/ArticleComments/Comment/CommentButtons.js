import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import StringFormat from "string-format";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Button, Box, useTheme, makeStyles, useMediaQuery } from "@material-ui/core";
import DialogAppDownload from "components/DialogAppDownload";
import ArticleActions from "redux/article.redux";
import GiverList from "../../GiversList";

const CommentButtons = ({ reactCount, replyCount, commentId, user }) => {
  const { userId, name } = user;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation();
  const dispatch = useDispatch();
  const onReplyComment = () => dispatch(ArticleActions.onReplyComment(commentId, userId, name));

  const [isOpenDownload, setIsOpenDownload] = useState(false);
  const [isOpenGivers, setIsOpenGivers] = useState(false);

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
  return (
    <>
      <GiverList
        isOpen={isOpenGivers}
        onClose={onCloseGiversList}
        reactCount={reactCount}
        id={commentId}
        isComment={true}
      />
      <DialogAppDownload isOpen={isOpenDownload} onClose={onCloseDownload} />
      {isMobile ? (
        <Box display="flex">
          <Button size="small" className={clsx(classes.buttonMobile, "grey-text", "mr-4")} onClick={onReplyComment}>
            {getLabel("TXT_REPLY")}
          </Button>
          <Button size="small" className={clsx(classes.buttonMobile, "grey-text")} onClick={onOpenGiversList}>
            {StringFormat(getLabel("FM_LOVE"), reactCount)}
          </Button>
        </Box>
      ) : (
        <Box display="flex">
          <Button
            className={clsx("grey-text", "mr-16")}
            startIcon={<Box className="ic-heart-empty" />}
            onClick={onOpenDownload}
          >
            {StringFormat(getLabel("FM_LOVE"), reactCount)}
          </Button>
          <Button className="grey-text" startIcon={<Box className="ic-comment" />}>
            {StringFormat(getLabel("FM_COMMENT"), replyCount)}
          </Button>
        </Box>
      )}
    </>
  );
};

CommentButtons.propTypes = {
  reactCount: PropTypes.number,
  replyCount: PropTypes.number,
  commentId: PropTypes.number,
  user: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
  buttonMobile: {
    margin: theme.spacing(-1, 0, 0, -1),
  },
}));

export default CommentButtons;
