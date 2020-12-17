import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { AppLink, CustomRating } from "components";
import clsx from "clsx";
import { getImageById, getTitleNoMark } from "utils";
import StringFormat from "string-format";
import { PathConstant } from "const";

const BookSummary = ({ data, classes, isHorizontal }) => {
  const defaultClasses = useStyles();
  const [book, setBook] = useState({});

  useEffect(() => {
    if (data) {
      let newBook = { ...data };
      if (newBook.title) {
        const bookTitleNoMark = getTitleNoMark(newBook.title);
        newBook.link = StringFormat(PathConstant.FM_BOOK_DETAIL, bookTitleNoMark, newBook.editionId);
      } else if (newBook.editionId) {
        newBook.link = StringFormat(PathConstant.FM_BOOK_DETAIL_ID, newBook.articleId);
      }
      setBook(newBook);
    }
  }, [data]);

  return (
    <AppLink className={defaultClasses.link} to={book.link}>
      <Box className={clsx(defaultClasses.root, classes.root, isHorizontal && defaultClasses.horizontalRoot)}>
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
                {book.authorName || book.author}
              </Typography>
              <CustomRating readOnly={true} value={book.rateAvg || 0} size="small" />
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
  isHorizontal: PropTypes.bool,
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
  horizontalRoot: {
    display: "flex",
    width: "100%",
    justifyContent: "space-start",

    marginBottom: theme.spacing(2),
    "& .MuiCardMedia-media": {
      width: "94px !important",
      marginRight: theme.spacing(2),
    },
    "&>*:nth-child(2)": {
      "&>*:first-child": {
        height: "auto",
      },
    },
  },
  cover: {
    height: COVER_HEIGHT,
    borderRadius: 2,
  },
  content: {
    minHeight: "max-content",
    padding: "12px 0",
    "& .eclipse": {
      minHeight: 19,
    },
  },
  title: {
    height: 42,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
