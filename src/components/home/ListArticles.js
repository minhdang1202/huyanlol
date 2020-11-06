import React, { memo } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { Section, ArticleSummary } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { uuid } from "utils";

const ListArticles = props => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);

  return (
    <Section title={getLabel("TXT_LIST_ARTICLES")}>
      <Box className={classes.root}>
        {MOCK_DATA.map(article => (
          <Box key={uuid()} className={classes.item}>
            <ArticleSummary data={article} />
          </Box>
        ))}
      </Box>
    </Section>
  );
};

ListArticles.propTypes = {
  data: PropTypes.array,
};
ListArticles.defaultProps = {};

export default memo(ListArticles);

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
      description:
        "Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ. Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ.",
    },
    time: "12 giờ trước",
    hashtags: [
      "#tieudiem",
      "#tieudiem",
      "#tieudiem",
      "#tieudiem",
      "#tieudiem",
      "#tieudiem",
      "#tieudiem",
      "#tieudiem",
      "#tieudiem",
      "#tieudiem",
    ],
    categories: [
      "Đánh giá sách",
      "Đánh giá sách",
      "Đánh giá sách",
      "Đánh giá sách",
      "Đánh giá sách",
      "Đánh giá sách",
      "Đánh giá sách",
      "Đánh giá sách",
      "Đánh giá sách",
    ],
    heart: 23,
    numberComments: 145,
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
      description:
        "Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ em trong công việc gia đình",
    },
    time: "12 giờ trước",
    hashtags: ["#tieudiem"],
    categories: ["Đánh giá sách"],
    heart: 0,
    numberComments: 145,
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
      description:
        "Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ em trong công việc gia đình",
    },
    time: "12 giờ trước",
    hashtags: ["#tieudiem"],
    categories: ["Đánh giá sách"],
    heart: 23,
    numberComments: 145,
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
      description:
        "Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ. Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ.",
    },
    time: "12 giờ trước",
    hashtags: ["#tieudiem"],
    categories: ["Đánh giá sách"],
    heart: 23,
    numberComments: 145,
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
      description:
        "Mình từng nghe một câu như thế này : Em phụ trách việc xinh đẹp, anh sẽ lo kiếm tiền. Nhưng anh lúc nào cũng quan tâm giúp đỡ em trong công việc gia đình",
    },
    time: "12 giờ trước",
    hashtags: ["#tieudiem"],
    categories: ["Đánh giá sách"],
    heart: 23,
    numberComments: 145,
  },
];
