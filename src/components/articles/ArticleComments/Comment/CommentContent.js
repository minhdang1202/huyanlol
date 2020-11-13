import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Box, Button, IconButton, Hidden, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import BookBox from "../../BookBox";

const CommentContent = ({
  isFullComment,
  content,
  shortComment,
  onClick,
  hasSeeMoreBtn,
  hasMentioned,
  bookMentioned,
}) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const { bookCover, editionId, title, rateAvg, authorName } = bookMentioned;
  const [displayContent, setDisplayContent] = useState();

  useEffect(() => {
    if (!hasSeeMoreBtn) {
      setDisplayContent(content);
      return;
    }
    if (isFullComment) {
      setDisplayContent(content);
    } else {
      setDisplayContent(shortComment);
    }
  }, [isFullComment]);

  return (
    <Box my={1.5}>
      <Box display="flex" alignItems="flex-start">
        <Box flexGrow={1}>
          <Box className={classes.content} dangerouslySetInnerHTML={{ __html: displayContent }} />
          {hasSeeMoreBtn && (
            <Button size="small" className={clsx(classes.seeMoreBtn, "blue-text")} onClick={() => onClick()}>
              {isFullComment ? getLabel("TXT_SEE_LESS") : getLabel("TXT_SEE_MORE")}
            </Button>
          )}
        </Box>
        <Hidden smUp>
          <IconButton className={clsx(classes.loveBtn)}>
            <Box className="ic-heart" />
          </IconButton>
        </Hidden>
      </Box>
      {hasMentioned && (
        <BookBox
          className="mt-12"
          bookCover={bookCover}
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
  isFullComment: PropTypes.bool,
  content: PropTypes.string,
  shortComment: PropTypes.string,
  onClick: PropTypes.func,
  hasSeeMoreBtn: PropTypes.bool,
  hasMentioned: PropTypes.bool,
  bookMentioned: PropTypes.object,
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
