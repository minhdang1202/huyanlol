import React from "react";
import StringFormat from "string-format";
import { Button, Typography, Avatar, Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import { PathConstant } from "const";
import { AppLink, CustomRating } from "components";
import { HEIGHT_BOOK_BOX, HEIGHT_BOOK_BOX_MOBILE } from "./ArticleSliders/BookSlider";
import { getImageById } from "utils";

const BookBox = ({ data, className, ...otherProps }) => {
  const classes = useStyles();
  const { imageId, authorName, title, editionId, rateAvg } = data;
  console.log(data);
  return (
    <AppLink className={classes.root} to={StringFormat(PathConstant.FM_BOOK_DETAIL_ID, editionId)}>
      <Button className={clsx(classes.button, className)} {...otherProps}>
        <Box display="flex">
          <Avatar variant="square" src={getImageById(imageId)} className={classes.bookCover} />
          <Box ml={2} my="auto">
            <Typography variant="subtitle1" className={clsx("primary-text", "eclipse-2", "mb-8")}>
              {title}
            </Typography>
            <Typography variant="body2" className={clsx("grey-text", "eclipse")}>
              {authorName}
            </Typography>
            <Box display="flex" alignItems="center" mt={1.5}>
              <CustomRating value={rateAvg} readOnly className="mr-4" />
              <Typography variant="subtitle2" className="primary-text">
                {rateAvg}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Button>
    </AppLink>
  );
};

BookBox.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "&:hover": {
      textDecoration: "none",
    },
    "& *": {
      lineHeight: "normal",
      textAlign: "left",
    },
  },
  button: {
    borderRadius: 8,
    justifyContent: "flex-start",
    marginRight: 0,
    width: "100%",
    border: `solid 1px ${theme.palette.background.default}`,
    height: HEIGHT_BOOK_BOX,
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
