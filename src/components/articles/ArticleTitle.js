import React from "react";
import { Typography, Box, Hidden, Avatar, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import { CustomRating } from "components";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import PropTypes from "prop-types";

const ArticleTitle = ({ isReviewType, name, avatar, date, category }) => {
  const classes = useStyles({ hasRating: isReviewType });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  return (
    <>
      <Typography variant="h4" component="h1" className={classes.title}>
        {DEMO_TITLE}
      </Typography>
      <Hidden smUp>
        <Box className={classes.subTitle}>
          <Avatar src={avatar} />
          <Typography variant="subtitle2" className={classes.fullText}>
            {name}
          </Typography>
          <Typography variant="body2" className={clsx("grey-text", classes.fullText)}>
            {date}
          </Typography>
          <Box width={3} height={3} borderRadius="50%" bgcolor={theme.palette.grey[500]} />
          <Typography variant="subtitle2" className={clsx("blue-text", "eclipse")}>
            {category}
          </Typography>
        </Box>
      </Hidden>
      {isReviewType ? (
        <Box display="flex" alignItems="center" mt={{ xs: 2, sm: 3 }} mb={{ xs: 2, sm: 3 }}>
          <Typography variant={isMobile ? "subtitle1" : "body1"} className="mr-16">
            {isMobile ? getLabel("TXT_ARTICLE_REVIEW_TITLE_MOBILE") : getLabel("TXT_ARTICLE_REVIEW_TITLE")}
          </Typography>
          <CustomRating readOnly={true} />
        </Box>
      ) : null}
    </>
  );
};

ArticleTitle.propTypes = {
  isReviewType: PropTypes.bool,
  name: PropTypes.string,
  date: PropTypes.string,
  category: PropTypes.string,
  avatar: PropTypes.string,
};

const DEMO_TITLE = "Đánh giá cuốn sách Nếu chỉ còn một ngày để sống";

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: props => (props.hasRating ? 0 : theme.spacing(4)),
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0 !important",
    },
  },
  subTitle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1.5),
    marginBottom: props => (props.hasRating ? 0 : theme.spacing(3)),
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
    "&>*:nth-child(1)": {
      width: 21,
      height: 21,
    },
    "& *": {
      lineHeight: "normal",
    },
  },
  fullText: {
    minWidth: "fit-content",
  },
}));

export default ArticleTitle;
