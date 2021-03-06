import React from "react";
import clsx from "clsx";
import StringFormat from "string-format";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import PropTypes from "prop-types";
import { Grid, Avatar, Typography, Box, makeStyles } from "@material-ui/core";
import { CustomRating } from "components";
import { getImageById } from "utils";

const ArticleBox = ({ rate, isReviewType, type, title, content, bookName, tagsList, categoryTitle, thumbnailId }) => {
  const classes = useStyles({ type });
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={type == AppConstant.THUMBNAIL_TYPE ? 6 : 12}
        className={type == AppConstant.THUMBNAIL_TYPE ? null : "mt-12"}
      >
        <Typography variant="subtitle1" className={clsx("eclipse-2", "mb-8", !type && "mt-8")}>
          {title
            ? title
            : isReviewType
            ? StringFormat(getLabel("FM_CREATE_REVIEW_TITLE"), bookName)
            : getLabel("P_CREATE_TITLE")}
        </Typography>
        {isReviewType && <CustomRating value={rate} readOnly className="mb-8" />}
        <Typography variant="body2" className={clsx("eclipse-2", "grey-text")}>
          {content ? content : getLabel("P_CREATE_REVIEW_CONTENT")}
        </Typography>
        <Box mt={1.5} className="blue-text">
          {isReviewType ? (
            bookName && <IconSpan icClassName="ic-book">{bookName}</IconSpan>
          ) : (
            <>
              <Box className="eclipse" component="span" mb={1.5}>
                {tagsList &&
                  tagsList.map((tag, index) => {
                    if (index >= 3) return;
                    return (
                      <Typography variant="body2" component="span" key={index} className="mr-4">{`#${tag}`}</Typography>
                    );
                  })}
              </Box>
              <IconSpan icClassName="ic-tag">{categoryTitle}</IconSpan>
            </>
          )}
        </Box>
      </Grid>
      <Grid item xs={type == AppConstant.THUMBNAIL_TYPE ? 6 : 12}>
        <Avatar variant="square" src={getImageById(thumbnailId)} className={classes.thumbnail} />
      </Grid>
    </Grid>
  );
};

const IconSpan = ({ icClassName, children }) => (
  <Box display="flex">
    <Box className={icClassName} fontSize={14} mr={0.5} />
    <Typography variant="subtitle2" className="eclipse">
      {children}
    </Typography>
  </Box>
);

IconSpan.propTypes = {
  icClassName: PropTypes.string,
};

ArticleBox.propTypes = {
  type: PropTypes.number,
  isReviewType: PropTypes.bool,
  rate: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  bookName: PropTypes.string,
  tagsList: PropTypes.array,
  categoryTitle: PropTypes.string,
  thumbnailId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ArticleBox;

const useStyles = makeStyles(theme => ({
  root: {
    flexFlow: ({ type }) => (type == AppConstant.THUMBNAIL_TYPE ? "row" : "column-reverse"),
    width: ({ type }) => (type == AppConstant.THUMBNAIL_TYPE ? 450 : 295),
    boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.082441)`,
    background: theme.palette.white,
    borderRadius: 10,
    padding: theme.spacing(2),
    margin: "0 auto",
    marginTop: theme.spacing(1.5),
    position: "relative",
    zIndex: 100,
    "& *": {
      lineHeight: "normal",
    },
  },
  thumbnail: {
    width: ({ type }) => (type == AppConstant.THUMBNAIL_TYPE ? 95 : `calc(100% + ${theme.spacing(4)}px)`),
    height: ({ type }) => (type == AppConstant.THUMBNAIL_TYPE ? 145 : 125),
    borderRadius: ({ type }) => (type == AppConstant.THUMBNAIL_TYPE ? 6 : "10px 10px 0 0"),
    marginTop: ({ type }) => (type == AppConstant.THUMBNAIL_TYPE ? 0 : theme.spacing(-2)),
    marginLeft: ({ type }) => (type == AppConstant.THUMBNAIL_TYPE ? "auto" : theme.spacing(-2)),
  },
}));
