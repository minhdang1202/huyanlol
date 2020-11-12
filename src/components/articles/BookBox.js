import React from "react";
import { Button, Typography, Avatar, Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppLink, CustomRating } from "components";
import { HEIGHT_BOOK_BOX, HEIGHT_BOOK_BOX_MOBILE } from "./ArticleSliders/BookSlider";

const BookBox = ({ bookCover, rate, bookName, author, className, ...otherProps }) => {
  const classes = useStyles();
  return (
    <Button className={clsx(classes.root, className)} {...otherProps}>
      <AppLink to="#">
        <Box display="flex">
          <Avatar variant="square" src={bookCover} className={classes.bookCover} />
          <Box ml={2} my="auto">
            <Typography variant="subtitle1" className={clsx("primary-text", "eclipse-2", "mb-8")}>
              {bookName}
            </Typography>
            <Typography variant="body2" className={clsx("grey-text", "eclipse")}>
              {author}
            </Typography>
            <CustomRating value={rate} readOnly className="mt-12" />
          </Box>
        </Box>
      </AppLink>
    </Button>
  );
};

BookBox.propTypes = {
  rate: PropTypes.number,
  bookCover: PropTypes.string,
  bookName: PropTypes.string,
  author: PropTypes.string,
  className: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 8,
    justifyContent: "flex-start",
    marginRight: 0,
    border: `solid 1px ${theme.palette.background.default}`,
    width: "100%",
    height: HEIGHT_BOOK_BOX,
    "& *": {
      lineHeight: "normal",
      textAlign: "left",
      "&:hover": {
        textDecoration: "none",
      },
    },
    [theme.breakpoints.down("xs")]: {
      height: HEIGHT_BOOK_BOX_MOBILE,
    },
  },
  bookCover: {
    height: 142,
    width: 97,
    borderRadius: 8,
    [theme.breakpoints.down("xs")]: {
      height: 123,
      width: 84,
    },
  },
}));

export default BookBox;
