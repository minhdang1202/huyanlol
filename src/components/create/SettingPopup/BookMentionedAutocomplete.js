import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Autocomplete, TextField } from "components";
import { makeStyles, InputAdornment } from "@material-ui/core";

const BookMentionedAutocomplete = ({ tagsSuggestion, isReviewType }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
  return (
    <Autocomplete
      freeSolo
      clearOnBlur
      options={tagsSuggestion.map(option => `#${option.title}`)}
      closeIcon={null}
      renderInput={params => (
        <TextField
          {...params}
          disabled={isReviewType}
          label={getLabel("L_MENTIONED_BOOK")}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start" className="mr-0">
                &amp;
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

BookMentionedAutocomplete.propTypes = {
  tagsSuggestion: PropTypes.array,
  isReviewType: PropTypes.bool,
};

export default BookMentionedAutocomplete;
