import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import { Autocomplete, TextField } from "components";
import { makeStyles, InputAdornment, Paper } from "@material-ui/core";
import ChipsList from "./ChipsList";
import ArticleCreateActions from "redux/articleCreate.redux";
import { checkIfLastPage, debounce } from "utils";

const TagAutocomplete = ({ tagsList, onChangeTagsList }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();
  const onGetHashTagsList = data => {
    dispatch(
      ArticleCreateActions.requestHashTagsList({
        pageSize: AppConstant.DATA_SIZES.hashTags,
        ...data,
      }),
    );
  };
  const { hashTagsList, isFetching } = useSelector(({ articleCreateRedux }) => articleCreateRedux);

  const onSetValue = useCallback(
    debounce(value => {
      setValue(value);
    }, 500),
    [],
  );

  const onChange = (e, newValue) => {
    setInputValue("");
    onChangeTagsList(newValue);
  };

  const onChangeInputValue = (e, newValue) => {
    const value = newValue.replace(/[^a-zA-Z0-9]/g, "").trim();
    setInputValue(value);
    onSetValue(value);
  };

  const onScroll = e => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const { total, pageSize, pageNo } = hashTagsList;
    if (checkIfLastPage({ total, pageNo, pageSize })) return;
    if (scrollTop + clientHeight === scrollHeight) {
      onFetchData(pageNo + 1);
    }
  };

  const onFetchData = pageNum => {
    if (value) {
      onGetHashTagsList({ tagName: value, pageNum: pageNum });
    } else {
      onGetHashTagsList({ pageNum: pageNum });
    }
  };

  useEffect(() => {
    if (isFocus) onFetchData();
  }, [value, isFocus]);

  useEffect(() => {
    if (hashTagsList.pageData && hashTagsList.pageNo > 1) {
      setSuggestion(suggestion.concat(hashTagsList.pageData));
    } else {
      setSuggestion(hashTagsList.pageData);
    }
  }, [hashTagsList]);

  return (
    <>
      <Autocomplete
        multiple
        freeSolo
        loading={isFetching}
        loadingText={getLabel("TXT_FINDING_HASHTAGS")}
        value={tagsList}
        inputValue={inputValue}
        onChange={onChange}
        onInputChange={onChangeInputValue}
        filterSelectedOptions
        PaperComponent={props => <Paper {...props} onScroll={onScroll} />}
        classes={{
          paper: classes.paper,
          focused: classes.focused,
        }}
        options={suggestion || []}
        filterOptions={options => options.filter(option => option !== "")}
        renderOption={hashTag => `#${hashTag.tagName} (${hashTag.taggedCount})`}
        getOptionSelected={(option, value) => option.tagName == value}
        getOptionLabel={hashTag => hashTag.tagName}
        closeIcon={null}
        renderInput={params => (
          <TextField
            {...params}
            label={getLabel("L_ARTICLE_TAGS")}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
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
      <ChipsList isTag chipsList={tagsList} onChangeChipsList={onChangeTagsList} />
    </>
  );
};

TagAutocomplete.propTypes = {
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
    width: 290,
  },
}));
