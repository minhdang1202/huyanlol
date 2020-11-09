import React, { memo } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { Section, ReviewSummary } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { uuid } from "utils";

const ListReviews = props => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);

  return (
    <Section title={getLabel("TXT_LIST_REVIEWS")}>
      <Box className={classes.root}>
        {MOCK_DATA.map((review, index) => (
          <Box key={uuid()} className={classes.item}>
            <ReviewSummary data={review} isHiddenAction={0 === index % 2} />
          </Box>
        ))}
      </Box>
    </Section>
  );
};

ListReviews.propTypes = {
  data: PropTypes.array,
};
ListReviews.defaultProps = {};

export default memo(ListReviews);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    "& > $item:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  item: {},
}));

const MOCK_DATA = [
  {
    user: {
      name: "Lê Thu Hân",
      avatar: "/images/img-demo-avatar.jpg",
    },
    book: {
      cover: "/images/img-demo-avatar.jpg",
      title: "Sự im lặng của bầy cừu",
      author: "Thomas Harris",
    },
    title: "Sự im lặng của bầy cừu",
    description:
      "Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ. Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ.",
    time: "12 giờ trước",
    heart: 23,
    numberComments: 145,
    rating: 2.5,
  },
  {
    user: {
      name: "Lê Thu Hân",
      avatar: "/images/img-demo-avatar.jpg",
    },
    book: {
      cover: "/images/img-demo-avatar.jpg",
      title: "Sự im lặng của bầy cừu",
      author: "Thomas Harris",
    },
    title: "Sự im lặng của bầy cừu",
    description:
      "Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ. Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ.",
    time: "12 giờ trước",
    heart: 23,
    numberComments: 145,
    rating: 2.5,
  },
  {
    user: {
      name: "Lê Thu Hân",
      avatar: "/images/img-demo-avatar.jpg",
    },
    book: {
      cover: "/images/img-demo-avatar.jpg",
      title: "Sự im lặng của bầy cừu",
      author: "Thomas Harris",
    },
    title: "Sự im lặng của bầy cừu",
    description:
      "Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ. Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ.",
    time: "12 giờ trước",
    heart: 23,
    numberComments: 145,
    rating: 2.5,
  },
  {
    user: {
      name: "Lê Thu Hân",
      avatar: "/images/img-demo-avatar.jpg",
    },
    book: {
      cover: "/images/img-demo-avatar.jpg",
      title: "Sự im lặng của bầy cừu",
      author: "Thomas Harris",
    },
    title: "Sự im lặng của bầy cừu",
    description:
      "Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ. Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ.",
    time: "12 giờ trước",
    heart: 23,
    numberComments: 145,
    rating: 2.5,
  },
];
