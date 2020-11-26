import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@material-ui/core";
import { LangConstant } from "const";
import CategorySelect from "./CategorySelect";
import TagAutocomplete from "./TagAutocomplete";
import BookAutocomplete from "./BookAutocomplete";

const SettingOptions = ({
  categoryId,
  categoryList,
  onChangeCategoryId,
  booksSuggestion,
  booksList,
  onChangeBooksList,
  isReviewType,
  tagsSuggestion,
  tagsList,
  onChangeTagsList,
}) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  return (
    <>
      <CategorySelect categoryId={categoryId} categoryList={categoryList} onChangeCategoryId={onChangeCategoryId} />
      <Box mt={4} mb={3}>
        <Typography variant="subtitle1">{getLabel("TXT_SETTING_TITLE")}</Typography>
      </Box>
      <BookAutocomplete
        booksSuggestion={booksSuggestion}
        booksList={booksList}
        onChangeBooksList={onChangeBooksList}
        isReviewType={isReviewType}
      />
      <TagAutocomplete tagsSuggestion={tagsSuggestion} tagsList={tagsList} onChangeTagsList={onChangeTagsList} />
    </>
  );
};

SettingOptions.propTypes = {
  categoryId: PropTypes.number,
  categoryList: PropTypes.array,
  onChangeCategoryId: PropTypes.func,
  booksSuggestion: PropTypes.array,
  booksList: PropTypes.array,
  onChangeBooksList: PropTypes.func,
  isReviewType: PropTypes.bool,
  tagsSuggestion: PropTypes.array,
  tagsList: PropTypes.array,
  onChangeTagsList: PropTypes.func,
};

export default SettingOptions;
