import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Typography, makeStyles, Button, Avatar } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";

const AsideAuthorButton = ({ name, date, avatar }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  return (
    <>
      <Typography variant="subtitle2" className={classes.reviewByText}>
        {getLabel("TXT_ARTICLE_REVIEW_BY")}
      </Typography>
      <Avatar className={classes.authorAvatar} src={avatar} />
      <Typography variant="subtitle1" className="eclipse">
        {name}
      </Typography>
      <Typography variant="body2" className={clsx("eclipse", "grey-text")}>
        {date}
      </Typography>
      <Button variant="contained" className={clsx("light-blue-button", classes.authorButton)}>
        {getLabel(LangConstant.getCommonKey("TXT_USER_PAGE"))}
      </Button>
    </>
  );
};

AsideAuthorButton.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  date: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  reviewByText: {
    textTransform: "uppercase",
    color: theme.palette.text.secondary,
  },
  authorAvatar: {
    width: 64,
    height: 64,
    margin: theme.spacing(2, 0, 1.5, 0),
  },
  authorButton: {
    fontSize: 18,
    padding: theme.spacing(0, 2),
    marginTop: theme.spacing(2),
  },
}));

export default AsideAuthorButton;
