import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { Section, BookSummary } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { uuid } from "utils";
import { useDispatch, useSelector } from "react-redux";
import EditionAction from "redux/edition.redux";

const MostBorrowing = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);
  const dispatch = useDispatch();
  const listSuggestionsRedux = useSelector(({ editionRedux }) => editionRedux.suggestions);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (listSuggestionsRedux && listSuggestionsRedux != list) {
      setList(listSuggestionsRedux);
    }
  }, [listSuggestionsRedux]);

  useEffect(() => {
    dispatch(EditionAction.requestGetBookSuggestion(DEFAULT_PARAMS));
  }, []);

  return (
    <Section title={getLabel("TXT_MOST_BORROWING_BOOK")}>
      <Box className={classes.root}>
        {list.map(book => (
          <Box key={uuid()} className={classes.item}>
            <BookSummary data={book} />
          </Box>
        ))}
      </Box>
    </Section>
  );
};

MostBorrowing.propTypes = {
  data: PropTypes.array,
};
MostBorrowing.defaultProps = {};

export default memo(MostBorrowing);

const DEFAULT_PARAMS = {
  page: 1,
  page_size: 5,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    "& > $item:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down("md")]: {
      overflow: "scroll",
    },
  },
  item: {
    maxWidth: 94,
  },
}));
