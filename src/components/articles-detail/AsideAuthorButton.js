import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Typography, makeStyles, Avatar } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { FollowButton, EditArticleButton } from "../articles-detail";
import { getImageById } from "utils";
import { useSelector } from "react-redux";

const AsideAuthorButton = ({ creator, date }) => {
  const classes = useStyles();
  const userId = useSelector(state => state.userRedux?.profile?.userId);
  const { imageId, name, username } = creator;
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  return (
    <>
      <Typography variant="subtitle2" className={classes.reviewByText}>
        {getLabel("TXT_ARTICLE_REVIEW_BY")}
      </Typography>
      <Avatar className={classes.authorAvatar} src={getImageById(imageId)} />
      <Typography variant="subtitle1" className="eclipse">
        {name}
      </Typography>
      <Typography variant="body2" className={clsx("eclipse", "grey-text")}>
        {date}
      </Typography>
      {userId === creator.userId ? (
        <EditArticleButton className="mt-16" />
      ) : (
        <FollowButton className="mt-16" authorUsername={username} authorId={creator?.userId} />
      )}
    </>
  );
};

AsideAuthorButton.propTypes = {
  creator: PropTypes.object,
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
}));

export default AsideAuthorButton;
