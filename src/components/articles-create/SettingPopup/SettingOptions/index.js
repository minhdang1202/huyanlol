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
  categoriesList,
  onChangeCategoryId,
  booksList,
  onChangeBooksList,
  tagsList,
  onChangeTagsList,
  isReviewType,
}) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  return (
    <>
      <CategorySelect categoryId={categoryId} categoriesList={categoriesList} onChangeCategoryId={onChangeCategoryId} />
      <Box mt={4} mb={3}>
        <Typography variant="subtitle1">{getLabel("TXT_SETTING_TITLE")}</Typography>
      </Box>
      <BookAutocomplete booksList={booksList} onChangeBooksList={onChangeBooksList} isReviewType={isReviewType} />
      <TagAutocomplete tagsList={tagsList} onChangeTagsList={onChangeTagsList} />
    </>
  );
};

SettingOptions.propTypes = {
  categoryId: PropTypes.number,
  categoriesList: PropTypes.array,
  onChangeCategoryId: PropTypes.func,
  booksList: PropTypes.array,
  onChangeBooksList: PropTypes.func,
  tagsList: PropTypes.array,
  onChangeTagsList: PropTypes.func,
  isReviewType: PropTypes.bool,
};

export default SettingOptions;
