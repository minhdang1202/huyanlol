import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Autocomplete, TextField } from "components";
import { makeStyles, InputAdornment } from "@material-ui/core";
import ChipsList from "./ChipsList";

const TagAutocomplete = ({ tagsSuggestion, tagsList, onChangeTagsList }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
  const onChange = (e, newValue) => {
    onChangeTagsList(newValue);
  };

  const onKeyDown = e => {
    const k = e.which || e.keyCode;
    if (k == 32 || k == 51) return false;
  };

  return (
    <>
      <Autocomplete
        multiple
        freeSolo
        value={tagsList}
        onChange={onChange}
        renderTags={() => {}}
        filterSelectedOptions
        classes={{
          paper: classes.paper,
        }}
        options={tagsSuggestion}
        renderOption={hashTag => `#${hashTag.title} (${hashTag.quantity})`}
        getOptionSelected={(option, value) => option.title === value}
        getOptionLabel={hashTag => hashTag.title}
        closeIcon={null}
        renderInput={params => (
          <TextField
            {...params}
            onKeyDown={onKeyDown}
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

const useStyles = makeStyles(() => ({
  paper: {
    maxHeight: 215,
  },
}));
