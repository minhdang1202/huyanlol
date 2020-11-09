import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Divider, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Section, ReviewSummary } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { uuid } from "utils";
import TabUsers from "./TabUsers";

const TopWriter = props => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);

  const [selectedTab, setSelectedTab] = useState(1);

  const onSelectedTab = (event, selectedTabIndex) => {
    setSelectedTab(selectedTabIndex);
  };

  return (
    <Section title={getLabel("TXT_LIST_REVIEWS")}>
      <TabUsers data={MOCK_DATA.map(item => item.user)} value={selectedTab} onChange={onSelectedTab} />

      <Box className={classes.root}>
        <Box className={("center-root", classes.header)}>
          <Typography variant="subtitle2">{MOCK_DATA[selectedTab - 1].user.name}</Typography>
          <IconButton>
            <Box className="ic-arrow-circle-right" />
          </IconButton>
        </Box>
        <Divider />
        {MOCK_DATA.map(review => (
          <ReviewSummary data={review} isHiddenAction={true} key={uuid()} classes={{ root: classes.item }} />
        ))}
      </Box>
    </Section>
  );
};

TopWriter.propTypes = {
  data: PropTypes.array,
};
TopWriter.defaultProps = {};

export default memo(TopWriter);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    background: "white",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 9,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    border: "solid 1px rgba(216, 216, 216, 0.18)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    "& > button": {
      color: theme.palette.grey[500],
      fontSize: 16,
    },
  },
  item: {
    border: "none",
    borderRadius: "none",
    boxShadow: "unset",
  },
}));

const MOCK_DATA = [
  {
    user: {
      id: 1,
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
      id: 2,
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
      id: 3,
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
