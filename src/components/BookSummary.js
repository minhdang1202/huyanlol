import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { AppLink, CustomRating } from "components";
import clsx from "clsx";
import { getImageById } from "utils";
import StringFormat from "string-format";
import { PathConstant } from "const";

const BookSummary = ({ data, classes }) => {
  const defaultClasses = useStyles();
  const [book, setBook] = useState({});

  useEffect(() => {
    if (data) {
      setBook(data);
    }
  }, [data]);

  return (
    <AppLink
      className={defaultClasses.link}
      to={book.editionId && StringFormat(PathConstant.FM_BOOK_DETAIL_ID, book.editionId)}
    >
      <Box className={clsx(defaultClasses.root, classes.root)}>
        {book && (
          <>
            <CardMedia
              className={clsx(defaultClasses.cover, classes.cover)}
              src={getImageById(book.imageId)}
              title={book.title}
              component="img"
            />
            <CardContent className={clsx(defaultClasses.content, classes.content)}>
              <Typography variant="subtitle2" component="p" className={clsx("eclipse-2", defaultClasses.title)}>
                {book.title}
              </Typography>

              <Typography variant="caption" component="p" className="eclipse">
                {book.authorName}
              </Typography>
              <CustomRating readOnly={true} value={book.rating} size="small" />
            </CardContent>
          </>
        )}
      </Box>
    </AppLink>
  );
};

BookSummary.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object,
};
BookSummary.defaultProps = { classes: {} };

export default memo(BookSummary);
const COVER_HEIGHT = 150;

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.text.primary,
    "&:hover": {
      textDecoration: "unset",
    },
  },
  root: {
    width: "100%",
    minWidth: 94,
  },
  cover: {
    height: COVER_HEIGHT,
    borderRadius: 2,
  },
  content: {
    minHeight: "max-content",
    padding: "12px 0",
  },
  title: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
