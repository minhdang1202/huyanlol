import React from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import Review from "./Review";

const BookReviews = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  return (
    <Box className={classes.root}>
      <Typography className={classes.title} variant="h6">
        {getLabel("TXT_BOOKDETAIL_USER_REVIEWS")}
      </Typography>
      {Array(3)
        .fill(REVIEW_DEMO)
        .map((review, index) => {
          return <Review key={index} review={review} />;
        })}
    </Box>
  );
};

const REVIEW_DEMO = {
  author: "Lê Thu Hân",
  avatar: "/images/img-demo-avatar.jpg",
  date: "12 giờ trước",
  title: "Ai cũng cần có trong đời những tháng ngày lặng lẽ.",
  rating: 4,
  thumbnail: "/images/img-demo-avatar.jpg",
  content:
    'Mình từng nghe một câu như thế này : "Em phụ trách việc xinh đẹp, anh sẽ lo. Mình từng nghe một câu như thế này : "Em phụ trách việc xinh đẹp, anh sẽ lo',
  love: 23,
  comment: 145,
  hasLoved: true,
};

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: "hidden",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default BookReviews;
