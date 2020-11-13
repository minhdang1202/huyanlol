import React from "react";
import PropTypes from "prop-types";
import { Typography, Button, Box, makeStyles } from "@material-ui/core";
import { AppLink } from "components";

const HashtagButtons = ({ hashtags, category, articleUrl }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>
        {hashtags.slice(0, 3).map((hashtag, index) => (
          <AppLink key={index} to={articleUrl}>
            <Typography variant="body2">{hashtag}</Typography>
          </AppLink>
        ))}
      </Box>
      <AppLink to={articleUrl}>
        <Button startIcon={<Box className="ic-tag" />}>
          <Typography variant="subtitle2">{category}</Typography>
        </Button>
      </AppLink>
    </Box>
  );
};

HashtagButtons.propTypes = {
  hashtags: PropTypes.array,
  category: PropTypes.string,
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
