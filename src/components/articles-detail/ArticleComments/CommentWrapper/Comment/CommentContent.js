import React, { useState } from "react";
import clsx from "clsx";
import { Box, Button, IconButton, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { AppConstant } from "const";
import BookBox from "../../../BookBox";
import { cutString, getImageById } from "utils";

const CommentContent = ({ content, commentToEditions, isDesktopComment }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const shortComment = cutString(AppConstant.COMMENT_DEFAULT_LENGTH, content);
  const hasSeeMoreBtn = content.length > AppConstant.COMMENT_DEFAULT_LENGTH;
  const { imageId, rateAvg, title, authorName, editionId } = commentToEditions[0] || {};
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
          <IconButton className={clsx(classes.loveBtn)}>
            <Box className="ic-heart" />
          </IconButton>
        )}
      </Box>
      {commentToEditions[0] && (
        <BookBox
          className="mt-12"
          bookCover={getImageById(imageId)}
          rateAvg={rateAvg}
          bookName={title}
          author={authorName}
          editionId={editionId}
        />
      )}
    </Box>
  );
};

CommentContent.propTypes = {
  commentToEditions: PropTypes.array,
  content: PropTypes.string,
  isDesktopComment: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  content: {
    fontSize: 16,
    "& a": {
      textDecoration: "none",
      color: theme.palette.primary.main,
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
  loveBtn: {
    marginTop: theme.spacing(-1),
    "& .ic-heart": {
      WebkitTextStroke: `2px ${theme.palette.grey[500]}`,
      color: theme.palette.white,
      fontSize: 20,
    },
    "&:hover .ic-heart": {
      color: theme.palette.error.main,
      WebkitTextStroke: "0px",
    },
    "&:hover": {
      background: "none",
      color: theme.palette.error.main,
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

export default CommentContent;
