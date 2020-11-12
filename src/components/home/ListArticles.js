import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { Section, ArticleSummary } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { uuid } from "utils";
import { useDispatch, useSelector } from "react-redux";
import ArticleAction from "redux/article.redux";

const ListArticles = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);
  const dispatch = useDispatch();
  const listArticlesRedux = useSelector(({ articleRedux }) => articleRedux.homeArticles.pageData);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (listArticlesRedux && listArticlesRedux != list) {
      setList(listArticlesRedux);
    }
  }, [listArticlesRedux]);

  useEffect(() => {
    dispatch(ArticleAction.requestHomeArticles(DEFAULT_PARAMS));
  }, []);

  return (
    <Section title={getLabel("TXT_LIST_ARTICLES")}>
      <Box className={classes.root}>
        {list.map(article => (
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

const DEFAULT_PARAMS = {
  categoryIds: [],
  pageNum: 1,
  pageSize: 2,
};

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
];
