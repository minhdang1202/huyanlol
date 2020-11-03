import React, { useState } from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Button, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { LangConstant } from "const";
import { cutString } from "utils";

const BookDescription = ({ description }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const [isFullContent, setIsFullContent] = useState(description.length <= LIMIT_DESCRIPTION);
  const [content, setContent] = useState(isFullContent ? description : cutString(LIMIT_DESCRIPTION, description));

  const onShowDescription = () => {
    setIsFullContent(true);
    setContent(description);
  };

  return (
    <Paper className={clsx("paper", classes.root)}>
      <Typography variant="h6">{getLabel("TXT_BOOKDETAIL_BOOK_INTRO")}</Typography>
      <Typography>{content}</Typography>
      {!isFullContent && (
        <Button size="large" className={clsx(classes.button, "blue-text")} onClick={onShowDescription}>
          {getLabel("TXT_BOOKDETAIL_READ_MORE")}
        </Button>
      )}
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
