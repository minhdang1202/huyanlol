import React, { useEffect, useState } from "react";
import { Box, makeStyles, Paper } from "@material-ui/core";
import { BookSummary, CommonPagination } from "components";
import { uuid } from "utils";
import { useDispatch, useSelector } from "react-redux";
import EditionAction from "redux/edition.redux";

const ListBooks = () => {
  const classes = useStyles();
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
    <Paper className={classes.root}>
      <Box className={classes.list}>
        {list.map(book => (
          <Box key={uuid()} className={classes.item}>
            <BookSummary data={book} />
          </Box>
        ))}
      </Box>
      <CommonPagination count={5} className={classes.pagination} />
    </Paper>
  );
};

ListBooks.propTypes = {};

export default ListBooks;

const DEFAULT_PARAMS = {
  page: 1,
  page_size: 36,
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 3),
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    borderRadius: 10,
  },
  list: {
    display: "grid",
    gridGap: 8,
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  },
  item: {
    paddingRight: 8,
  },
  pagination: {
    marginBottom: 8,
  },
}));
