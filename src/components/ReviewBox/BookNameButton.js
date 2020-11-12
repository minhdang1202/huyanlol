import React from "react";
import PropTypes from "prop-types";
import { Typography, Button, Box, makeStyles } from "@material-ui/core";
import { AppLink } from "components";

const BookNameButton = ({ editionUrl, bookName }) => {
  const classes = useStyles();
  return (
    <AppLink className={classes.root} to={editionUrl}>
      <Button startIcon={<Box className="ic-book" />}>
        <Typography variant="subtitle2" className="eclipse">
          {bookName}
        </Typography>
      </Button>
    </AppLink>
  );
};

BookNameButton.propTypes = {
  editionUrl: PropTypes.string,
  bookName: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    "& .ic-book": {
      fontSize: 12,
    },
    "& button": {
      height: "fit-content",
      padding: "6px !important",
      "& *": {
        color: theme.palette.primary.main,
      },
      marginTop: theme.spacing(0.5),
    },
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

export default BookNameButton;
