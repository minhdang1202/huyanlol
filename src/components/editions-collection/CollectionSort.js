import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Paper } from "@material-ui/core";
import { Section, BookSummary } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { uuid } from "utils";
import { useDispatch, useSelector } from "react-redux";
import EditionAction from "redux/edition.redux";

const CollectionBooks = props => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);
  const dispatch = useDispatch();
  const listSuggestionsRedux = useSelector(({ editionRedux }) => editionRedux.suggestions);

  const [list, setList] = useState([]);

  return <Box>this is sort</Box>;
};

CollectionBooks.propTypes = {};

export default CollectionBooks;

const DEFAULT_PARAMS = {
  page: 1,
  page_size: 12,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    overflow: "scroll",
    "& > $item:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
  item: {
    maxWidth: 94,
  },
}));
