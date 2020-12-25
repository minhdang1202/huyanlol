import React, { useState } from "react";
import clsx from "clsx";
import { Box, Button, IconButton, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { AppConstant } from "const";
import BookBox from "../../../BookBox";
import { cutString } from "utils";
import CommentReact from "./CommentReact";

const CommentContent = ({ comment, isDesktopComment }) => {
  const { content, commentToEditions, reactCount, replyCount, commentId, userReaction } = comment;
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const shortComment = cutString(AppConstant.COMMENT_DEFAULT_LENGTH, content);
  const hasSeeMoreBtn = content.length > AppConstant.COMMENT_DEFAULT_LENGTH;
  const [isFullComment, setIsFullComment] = useState(false);
  const [displayContent, setDisplayContent] = useState(shortComment);
  const onShowComment = () => {
    setIsFullComment(!isFullComment);
    setDisplayContent(!isFullComment ? content : shortComment);
  };

  return (
    <Box my={1.5}>
      <Box display="flex" alignItems="flex-start">
        <Box flexGrow={1}>
          <Box className={classes.content} dangerouslySetInnerHTML={{ __html: displayContent }} />
          {hasSeeMoreBtn && (
            <Button size="small" className={clsx(classes.seeMoreBtn, "blue-text")} onClick={onShowComment}>
              {isFullComment ? getLabel("TXT_SEE_LESS") : getLabel("TXT_SEE_MORE")}
            </Button>
          )}
        </Box>
        {!isDesktopComment && (
          <CommentReact
            commentId={commentId}
            totalReactCount={reactCount}
            baseReactCount={userReaction ? userReaction.reactCount : 0}
            isSide={true}
          />
        )}
      </Box>
      {commentToEditions[0] && <BookBox className="mt-12" data={commentToEditions[0]} />}
    </Box>
  );
};

CommentContent.propTypes = {
  comment: PropTypes.object,
  isDesktopComment: PropTypes.bool,
};

export default CommentContent;

const useStyles = makeStyles(theme => ({
  content: {
    fontSize: 16,
    "& a": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
    "& p": {
      marginTop: 0,
      marginBottom: 0,
    },
    "& *:first-child": {
      marginTop: 0,
    },
    "& *:last-child": {
      marginBottom: 0,
    },
  },
  seeMoreBtn: {
    display: "inline-block",
    minHeight: "fit-content",
    marginLeft: theme.spacing(-1),
    "&:hover": {
      background: "none",
    },
  },
  reactCount: {
    color: "inherit",
    marginTop: theme.spacing(-1),
  },
  reacted: {
    "& .ic-heart": {
      color: theme.palette.error.main,
      WebkitTextStroke: "0px",
    },
  },
}));
