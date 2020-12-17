import React, { useEffect } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { uuid } from "utils";
import { BookSummary } from "components";
import { useSelector, useDispatch } from "react-redux";
import EditionAction from "redux/edition.redux";

const MostMentionedBooks = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_COLLECTION_ARTICLES);
  const dispatch = useDispatch();
  const suggestions = useSelector(state => state.editionRedux.suggestions);
  const listBook = suggestions ? suggestions.slice(0, 3) : [];
  useEffect(() => {
    dispatch(EditionAction.requestGetBookSuggestion());
  }, []);
  return (
    <Box className={classes.root}>
      <Typography variant="h6">{getLabel("TXT_MOST_MENTIONED_BOOK")}</Typography>
      <Box>
        {listBook.map(book => (
          <BookSummary key={uuid()} data={book} isHorizontal={true} />
        ))}
      </Box>
    </Box>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "&>*:first-child": {
      marginBottom: theme.spacing(2),
    },
  },
}));
export default MostMentionedBooks;
