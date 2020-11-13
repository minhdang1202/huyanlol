import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import StringFormat from "string-format";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Button, Box, useTheme, makeStyles, useMediaQuery } from "@material-ui/core";
import DialogAppDownload from "components/DialogAppDownload";
import ArticleActions from "redux/article.redux";

const CommentButtons = ({ reactCount, replyCount, commentId, userId, name }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation();
  const dispatch = useDispatch();
  const onReplyComment = () => dispatch(ArticleActions.onReplyComment(commentId, userId, name));

  const [isOpenDownload, setIsOpenDownload] = useState(false);

  const onOpenDownload = () => {
    setIsOpenDownload(true);
  };
  const onCloseDownload = () => {
    setIsOpenDownload(false);
  };
  return (
    <>
      <DialogAppDownload isOpen={isOpenDownload} onClose={onCloseDownload} />
      {isMobile ? (
        <Button size="small" className={clsx(classes.buttonMobile, "grey-text")} onClick={onReplyComment}>
          {getLabel("TXT_REPLY")}
        </Button>
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
  userId: PropTypes.number,
  name: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  buttonMobile: {
    margin: theme.spacing(-1, 0, 0, -1),
  },
}));

export default CommentButtons;
