import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Box, Avatar, Typography, makeStyles } from "@material-ui/core";

const BookItem = ({ book }) => {
  const classes = useStyles();
  return (
    <Box display="flex">
      <Avatar variant="square" src={book.bookCover} className={classes.image} />
      <Box ml={1.5} mt={1.5}>
        <Typography variant="subtitle2" className="eclipse-2">
          {book.title}
        </Typography>
        <Typography variant="body2" className={clsx("grey-text", "eclipse", "mt-4")}>
          {book.author}
        </Typography>
      </Box>
    </Box>
  );
};

BookItem.propTypes = {
  book: PropTypes.object,
};

export default BookItem;

const useStyles = makeStyles(() => ({
  image: {
    borderRadius: 2,
    width: 63,
    height: 100,
  },
}));
