import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Paper, makeStyles, Typography, Divider, Hidden, Box, useMediaQuery, useTheme } from "@material-ui/core";
import StringFormat from "string-format";

import { LangConstant, AppConstant } from "const";
import SearchBar from "./SearchBar";
import FaqSearchList from "./FaqSearchList";
import FaqList from "./FaqList";
import MobileFaqSearchList from "./MobileFaqSearchList";
import { TabPanel } from "components";

const FAQ = ({ selectedTab }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);
  const [searchValue, setSearchValue] = useState("");
  const [isExistSearchResult, setIsExistSearchResult] = useState(false);
  const [expandedId, setExpandedId] = useState(-1);
  const [searchResults, setSearchResults] = useState([]);

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const FAQ_LIST = [
    {
      title: getLabel("TXT_BORROW_BOOKS_THROUGH_GAT"),
      body: [
        getLabel("TXT_BORROW_BOOKS_THROUGH_GAT_BODY_1"),
        getLabel("TXT_BORROW_BOOKS_THROUGH_GAT_BODY_2"),
        getLabel("TXT_BORROW_BOOKS_THROUGH_GAT_BODY_3"),
        getLabel("TXT_BORROW_BOOKS_THROUGH_GAT_BODY_4"),
        getLabel("TXT_BORROW_BOOKS_THROUGH_GAT_BODY_5"),
      ],
      id: 0,
    },
    {
      title: getLabel("TXT_NEED_DEPOSIT_OR_PAY"),
      body: [getLabel("TXT_NEED_DEPOSIT_OR_PAY_BODY_1")],
      id: 1,
    },
    {
      title: getLabel("TXT_NOT_SEE_OWNER_RESPOND"),
      body: [getLabel("TXT_NOT_SEE_OWNER_RESPOND_BODY_1"), getLabel("TXT_NOT_SEE_OWNER_RESPOND_BODY_2")],
      id: 2,
    },
    {
      title: getLabel("TXT_TIME_TO_BORROW"),
      body: [getLabel("TXT_TIME_TO_BORROW_BODY_1")],
      id: 3,
    },
    {
      title: getLabel("TXT_MAXIMUM_TO_BORROW"),
      body: [getLabel("TXT_MAXIMUM_TO_BORROW_BODY_1")],
      id: 4,
    },
    {
      title: getLabel("TXT_NOT_SEE_BOOK_ON_APP"),
      body: [getLabel("TXT_NOT_SEE_BOOK_ON_APP_BODY_1")],
      id: 5,
    },
    {
      title: getLabel("TXT_NEED_ASSISTANCE"),
      body: [
        getLabel("TXT_NEED_ASSISTANCE_BODY_1"),
        getLabel("TXT_NEED_ASSISTANCE_BODY_2"),
        getLabel("TXT_NEED_ASSISTANCE_BODY_3"),
        getLabel("TXT_NEED_ASSISTANCE_BODY_4"),
        getLabel("TXT_NEED_ASSISTANCE_BODY_5"),
      ],
      id: 6,
    },
    {
      title: getLabel("TXT_GIVE_BOOK_BACK_LATE"),
      body: [getLabel("TXT_GIVE_BOOK_BACK_LATE_BODY_1")],
      id: 7,
    },
    {
      title: getLabel("TXT_WHERE_TO_SEE_DATE_RETURN_OR_OVERDUE"),
      body: [
        getLabel("TXT_WHERE_TO_SEE_DATE_RETURN_OR_OVERDUE_BODY_1"),
        getLabel("TXT_WHERE_TO_SEE_DATE_RETURN_OR_OVERDUE_BODY_2"),
        getLabel("TXT_WHERE_TO_SEE_DATE_RETURN_OR_OVERDUE_BODY_3"),
        getLabel("TXT_WHERE_TO_SEE_DATE_RETURN_OR_OVERDUE_BODY_4"),
        getLabel("TXT_WHERE_TO_SEE_DATE_RETURN_OR_OVERDUE_BODY_5"),
      ],
      id: 8,
    },
    {
      title: getLabel("TXT_RETURNED_BUT_STILL_SEE_WHEN_CHECK"),
      body: [getLabel("TXT_RETURNED_BUT_STILL_SEE_WHEN_CHECK_BODY_1")],
      id: 9,
    },
    {
      title: getLabel("TXT_KINDS_OF_BOOK_ON_GAT"),
      body: [getLabel("TXT_KINDS_OF_BOOK_ON_GAT_BODY_1")],
      id: 10,
    },
  ];

  const onChangeSearchValue = e => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      const resultFiltered = FAQ_LIST.filter(faqItem => faqItem.title.toLowerCase().includes(value.toLowerCase()));

      if (resultFiltered.length) {
        setIsExistSearchResult(true);
        return setSearchResults(
          resultFiltered.map(faqItem => ({
            title: faqItem.title,
            id: faqItem.id,
          })),
        );
      }

      setIsExistSearchResult(false);
      return setSearchResults([{ title: StringFormat(getLabel("FM_NO_QUESTION_FOUND"), value), id: -1 }]);
    }

    setSearchResults([]);
  };

  const onClickDeleteSearchValue = () => {
    setSearchValue("");
    setSearchResults([]);
    setIsExistSearchResult(false);
  };

  return (
    <TabPanel height="100%" index={AppConstant.INTRODUCTION_TABS_VALUE.faq} value={selectedTab}>
      <Paper className={classes.root}>
        <Hidden xsDown>
          <Typography className="medium-xl-txt mb-24">{getLabel("TXT_FAQ")}</Typography>
        </Hidden>

        <Box className={classes.searchBoxRoot}>
          <Box className="space-between-root">
            <SearchBar value={searchValue} onChange={onChangeSearchValue} />
            <Hidden smUp>
              <Typography onClick={onClickDeleteSearchValue} className={clsx("blue-text", classes.cancelTxt)}>
                {getLabel("TXT_CANCEL")}
              </Typography>
            </Hidden>
          </Box>
          <Hidden xsDown>
            <FaqSearchList
              searchResults={searchResults}
              setExpandedId={setExpandedId}
              setSearchValue={setSearchValue}
              setSearchResults={setSearchResults}
            />
          </Hidden>
        </Box>

        <Divider
          className="mt-24"
          classes={{
            root: classes.dividerRoot,
          }}
        />

        {isMobile ? (
          !searchResults.length ? (
            <FaqList faqList={FAQ_LIST} expandedId={expandedId} setExpandedId={setExpandedId} />
          ) : (
            <MobileFaqSearchList
              searchResults={searchResults}
              isExistSearchResult={isExistSearchResult}
              setExpandedId={setExpandedId}
              setSearchValue={setSearchValue}
              setSearchResults={setSearchResults}
            />
          )
        ) : (
          <FaqList faqList={FAQ_LIST} expandedId={expandedId} setExpandedId={setExpandedId} />
        )}
      </Paper>
    </TabPanel>
  );
};

export default FAQ;

FAQ.propTypes = {
  selectedTab: PropTypes.number,
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    padding: theme.spacing(3),
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: 0,
      boxShadow: "none",
    },
  },
  dividerRoot: {
    margin: theme.spacing(3, -3, 2.25),
    backgroundColor: theme.palette.background.default,
    height: 2,
    [theme.breakpoints.down("xs")]: {
      marginTop: "16px !important",
      marginBottom: 0,
    },
  },
  searchBoxRoot: {
    position: "relative",
  },
  cancelTxt: {
    wordBreak: "keep-all",
    paddingLeft: theme.spacing(2),
  },
}));
