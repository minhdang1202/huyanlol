import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { AppLink, CustomRating } from "components";
import clsx from "clsx";

const BookSummary = ({ data, classes }) => {
  const defaultClasses = useStyles();
  const [book, setBook] = useState();

  useEffect(() => {
    if (data) {
      setBook(data);
    }
  }, [data]);

  return (
    <AppLink className={defaultClasses.link}>
      <Box className={clsx(defaultClasses.root, classes.root)}>
        {book && (
          <>
            <CardMedia
              className={clsx(defaultClasses.cover, classes.cover)}
              src={book.cover}
              title={book.title}
              component="img"
            />
            <CardContent className={clsx(defaultClasses.content, classes.content)}>
              <Typography variant="subtitle2" component="p" className={clsx("eclipse-2", defaultClasses.title)}>
                {book.title}
              </Typography>

              <Typography variant="caption" component="p" className="eclipse">
                {book.author}
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
