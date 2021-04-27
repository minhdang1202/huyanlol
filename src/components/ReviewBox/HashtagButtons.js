import React from "react";
import PropTypes from "prop-types";
import { Typography, Button, Box, makeStyles } from "@material-ui/core";
import { AppLink, Hashtag } from "components";

const HashtagButtons = ({ hashtags, category, articleUrl }) => {
  const classes = useStyles();
  hashtags = hashtags && hashtags.length > 3 ? hashtags.slice(0, 3) : hashtags;
  return (
    <Box className={classes.root}>
      <Box>{hashtags && hashtags.map((hashtag, index) => <Hashtag key={index} content={hashtag.tagName} />)}</Box>
      <AppLink to={articleUrl}>
        <Button startIcon={<Box className="ic-tag" />}>
          {category && <Typography variant="subtitle2">{category.title}</Typography>}
        </Button>
      </AppLink>
    </Box>
  );
};

HashtagButtons.propTypes = {
  hashtags: PropTypes.array,
  category: PropTypes.object,
  articleUrl: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    "& *": {
      color: theme.palette.primary.main,
    },
    "& .ic-tag": {
      fontSize: 12,
    },
    "& button": {
      height: "fit-content",
      padding: "6px !important",
    },
    "& a:last-child": {
      "&:hover": {
        textDecoration: "none",
      },
    },
  },
}));

export default HashtagButtons;
