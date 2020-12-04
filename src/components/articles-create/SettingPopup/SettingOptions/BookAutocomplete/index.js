import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { AppConstant, LangConstant } from "const";
import { Autocomplete, TextField } from "components";
import { makeStyles, InputAdornment } from "@material-ui/core";
import ChipsList from "../ChipsList";
import BookItem from "./BookItem";
import EditionActions from "redux/edition.redux";
import { debounce } from "utils";

const BookAutocomplete = ({ booksList, onChangeBooksList, isReviewType }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  const [inputValue, setInputValue] = useState();
  const dispatch = useDispatch();
  const { suggestions, isFetching } = useSelector(({ editionRedux }) => editionRedux);

  const onChange = (e, newValue) => {
    onChangeBooksList(newValue);
  };

  const onSetInputValue = useCallback(
    debounce(value => {
      setInputValue(value);
    }, 500),
    [],
  );

  const onInputChange = (e, value) => {
    onSetInputValue(value);
  };

  useEffect(() => {
    if (inputValue)
      dispatch(
        EditionActions.requestGetEditionSuggestion({
          keyword: inputValue,
          size: AppConstant.BOOK_SUGGESTION,
          type: "TITLE",
        }),
      );
  }, [inputValue]);

  return (
    <>
      <Autocomplete
        noOptionsText={inputValue ? getLabel("TXT_NO_BOOK") : getLabel("TXT_TYPE_BOOK_TITLE")}
        disabled={isReviewType}
        multiple
        loading={isFetching}
        loadingText={getLabel("TXT_FINDING_BOOK")}
        value={booksList}
        onChange={onChange}
        onInputChange={onInputChange}
        renderTags={() => {}}
        filterSelectedOptions
        classes={{
          paper: classes.paper,
          endAdornment: classes.endAdornment,
          focused: classes.focused,
        }}
        options={[...booksList, ...suggestions]}
        filterOptions={options => options.filter(option => option !== "")}
        renderOption={option => <BookItem book={option} />}
        getOptionSelected={(option, value) => option.editionId === value.editionId}
        getOptionLabel={option => option.title}
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
