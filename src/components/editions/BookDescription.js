import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Button, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { LangConstant } from "const";
import { cutString } from "utils";

const BookDescription = ({ description }) => {
  const classes = useStyles();
  const theme = useTheme(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const shortDescription = cutString(LIMIT_DESCRIPTION, description);
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const [isFullContent, setIsFullContent] = useState(false);
  const [content, setContent] = useState(shortDescription);

  const onShowDescription = () => {
    setIsFullContent(!isFullContent);
  };

  useEffect(() => {
    if (isFullContent) {
      setContent(description);
    } else {
      setContent(shortDescription);
    }
  }, [isFullContent]);

  return (
    <Paper className={clsx("paper", classes.root)}>
      <Typography variant="h6">{getLabel("TXT_EDITION_BOOK_INTRO")}</Typography>
      <Typography>{content}</Typography>
      <Button
        size={isMobile ? "small" : "large"}
        className={clsx(classes.button, "blue-text")}
        onClick={onShowDescription}
      >
        {isFullContent ? getLabel("TXT_EDITION_READ_LESS") : getLabel("TXT_EDITION_READ_MORE")}
      </Button>
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0 !important",
    },
  },
  button: {
    marginLeft: theme.spacing(-1),
  },
}));

const LIMIT_DESCRIPTION = 250;

BookDescription.propTypes = {
  description: PropTypes.string,
};

export default BookDescription;
