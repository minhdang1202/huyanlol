import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Divider, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Section, ReviewSummary, ArticleSummary } from "components";
import { useTranslation } from "react-i18next";
import { AppConstant, LangConstant } from "const";
import { uuid } from "utils";
import TabUsers from "./TabUsers";
import { useDispatch, useSelector } from "react-redux";
import UserAction from "redux/user.redux";
import TabPanel from "components/TabPanel";

const TopWriter = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);
  const dispatch = useDispatch();
  const topWriterRedux = useSelector(({ userRedux }) => userRedux.topWriter.pageData);

  const [list, setList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const onSelectedTab = (event, selectedTabIndex) => {
    setSelectedTab(selectedTabIndex);
  };

  useEffect(() => {
    if (topWriterRedux && topWriterRedux != list) {
      setList(topWriterRedux);
    }
  }, [topWriterRedux]);

  useEffect(() => {
    dispatch(UserAction.requestTopWriter(DEFAULT_PARAMS));
  }, []);

  return (
    <Section title={getLabel("TXT_TOP_WRITERS")}>
      <TabUsers data={list} value={selectedTab} onChange={onSelectedTab} />

      <Box className={classes.root}>
        <Box className={("center-root", classes.header)}>
          <Typography variant="subtitle2">{(list[selectedTab] || {}).name}</Typography>
          <IconButton>
            <Box className="ic-arrow-circle-right" />
          </IconButton>
        </Box>
        <Divider />
        {list.map((item, index) => (
          <TabPanel key={uuid()} index={index} value={selectedTab}>
            {(item.articles || []).map(article =>
              isReview(article.categories) ? (
                <ReviewSummary data={article} isHiddenAction={true} key={uuid()} classes={{ root: classes.item }} />
              ) : (
                <ArticleSummary data={article} isHiddenAction={true} key={uuid()} classes={{ root: classes.item }} />
              ),
            )}
          </TabPanel>
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
const DEFAULT_PARAMS = {
  pageNum: 1,
  pageSize: 3,
};

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

const isReview = categories =>
  (categories || []).filter(entry => AppConstant.CATEGORY_REVIEW === entry.categoryId).length > 0;
