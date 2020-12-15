import React, { useEffect, useState } from "react";
import { Box, makeStyles, Paper } from "@material-ui/core";
import { BookSummary, CommonPagination } from "components";
import { uuid } from "utils";
import { useDispatch, useSelector } from "react-redux";
import EditionAction from "redux/edition.redux";

import PropTypes from "prop-types";
const ListBooks = ({ onChangePage, pageNum }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { suggestions, suggestionsCategoryId, suggestionsByCategory } = useSelector(state => state.editionRedux);
  const [list, setList] = useState([]);

  useEffect(() => {
    const displayList = suggestionsByCategory.length > 0 ? suggestionsByCategory : suggestions;
    if (displayList && displayList != list) {
      setList(displayList);
    }
  }, [suggestions, suggestionsByCategory]);

  useEffect(() => {
    const load = () => {
      if (suggestionsCategoryId) {
        dispatch(
          EditionAction.requestGetBookSuggestionByCategory({ pageNum: pageNum, categories: suggestionsCategoryId }),
        );
      } else {
        dispatch(EditionAction.requestGetBookSuggestion({ pageNum: pageNum }));
      }
    };
    load();
  }, [pageNum, suggestionsCategoryId]);

  return (
    <Paper className={classes.root}>
      <Box className={classes.list}>
        {list.map(book => (
          <Box key={uuid()} className={classes.item}>
            <BookSummary data={book} />
          </Box>
        ))}
      </Box>
      <CommonPagination count={10} className={classes.pagination} onChange={onChangePage} />
    </Paper>
  );
};

ListBooks.propTypes = {
  onChangePage: PropTypes.func,
  pageNum: PropTypes.number,
};

export default ListBooks;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    borderRadius: 10,
    [theme.breakpoints.down("xs")]: {
      borderRadius: 0,
      paddingRight: 0,
    },
  },
  list: {
    display: "grid",
    width: "100%",
    height: "100%",
    gridTemplateColumns: "repeat(auto-fit, 117px)",
    gridColumnGap: 13,
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "repeat(auto-fit, 30vw)",
      gridColumnGap: 0,
    },
  },
  item: {
    maxWidth: 117,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      paddingRight: theme.spacing(1),
      maxWidth: 110,
    },
  },
  pagination: {
    marginBottom: 8,
  },
}));
