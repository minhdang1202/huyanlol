import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Autocomplete, TextField } from "components";
import { makeStyles, InputAdornment } from "@material-ui/core";
import ChipsList from "../ChipsList";
import BookItem from "./BookItem";

const BookAutocomplete = ({ booksSuggestion, booksList, onChangeBooksList, isReviewType }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  const onChange = (e, newValue) => {
    onChangeBooksList(newValue);
  };

  return (
    <>
      <Autocomplete
        noOptionsText={getLabel("TXT_NO_BOOK")}
        disabled={isReviewType}
        multiple
        value={booksList}
        onChange={onChange}
        renderTags={() => {}}
        filterSelectedOptions
        classes={{
          paper: classes.paper,
          endAdornment: classes.endAdornment,
          focused: classes.focused,
        }}
        options={booksSuggestion}
        renderOption={book => <BookItem book={book} />}
        getOptionSelected={(option, value) => option.id === value.id}
        getOptionLabel={book => book.title}
        closeIcon={null}
        renderInput={params => (
          <TextField
            {...params}
            label={getLabel("L_MENTIONED_BOOK")}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start" className={clsx("mr-0", isReviewType && classes.disabled)}>
                  {isReviewType ? `&${booksList[0].title}` : "&"}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <ChipsList isDisabled={isReviewType} chipsList={booksList} onChangeChipsList={onChangeBooksList} />
    </>
  );
};

BookAutocomplete.propTypes = {
  booksSuggestion: PropTypes.array,
  booksList: PropTypes.array,
  onChangeBooksList: PropTypes.func,
  isReviewType: PropTypes.bool,
};

export default BookAutocomplete;

const useStyles = makeStyles(theme => ({
  focused: {
    "& p": {
      color: theme.palette.text.primary,
    },
  },
  paper: {
    maxHeight: 250,
    "& li": {
      height: 125,
    },
  },
  endAdornment: {
    display: "none",
  },
  disabled: {
    "& *": {
      color: theme.palette.grey[300],
    },
  },
}));
