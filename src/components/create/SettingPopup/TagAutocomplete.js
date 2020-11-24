import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Autocomplete, TextField } from "components";
import { makeStyles, InputAdornment } from "@material-ui/core";
import ChipsList from "./ChipsList";

const TagAutocomplete = ({ tagsSuggestion, tagsList, onChangeTagsList }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
  const [inputValue, setInputValue] = useState("");
  const onChange = (e, newValue) => {
    setInputValue("");
    onChangeTagsList(newValue);
  };

  const onChangeInputValue = (e, newValue) => {
    const value = newValue.replace(/[^a-zA-Z0-9]/g, "").trim();
    setInputValue(value);
  };

  return (
    <>
      <Autocomplete
        multiple
        freeSolo
        value={tagsList}
        inputValue={inputValue}
        onChange={onChange}
        onInputChange={onChangeInputValue}
        renderTags={() => {}}
        filterSelectedOptions
        classes={{
          paper: classes.paper,
          focused: classes.focused,
        }}
        options={tagsSuggestion}
        renderOption={hashTag => `#${hashTag.title} (${hashTag.quantity})`}
        getOptionSelected={(option, value) => option.title === value}
        getOptionLabel={hashTag => hashTag.title}
        closeIcon={null}
        renderInput={params => (
          <TextField
            {...params}
            label={getLabel("L_ARTICLE_TAGS")}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start" className="mr-0">
                  &#35;
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <ChipsList chipsList={tagsList} onChangeChipsList={onChangeTagsList} />
    </>
  );
};

TagAutocomplete.propTypes = {
  tagsSuggestion: PropTypes.array,
  tagsList: PropTypes.array,
  onChangeTagsList: PropTypes.func,
};

export default TagAutocomplete;

const useStyles = makeStyles(theme => ({
  focused: {
    "& p": {
      color: theme.palette.text.primary,
    },
  },
  paper: {
    maxHeight: 215,
    maxWidth: 290,
  },
}));
