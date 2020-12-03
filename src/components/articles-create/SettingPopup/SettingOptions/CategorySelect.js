import React from "react";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import PropTypes from "prop-types";
import TextFieldSelect, { MenuItem } from "components/TextFieldSelect";

const CategorySelect = ({ categoryId, categoriesList, onChangeCategoryId }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  return (
    categoryId >= 0 && (
      <TextFieldSelect
        disabled={categoryId == 0}
        label={getLabel("L_ARTICLE_CATEGORY")}
        value={categoryId}
        onChange={e => onChangeCategoryId(e)}
      >
        {categoriesList.map(category => (
          <MenuItem key={category.categoryId} value={category.categoryId}>
            {category.title}
          </MenuItem>
        ))}
      </TextFieldSelect>
    )
  );
};

CategorySelect.propTypes = {
  categoriesList: PropTypes.array,
  categoryId: PropTypes.number,
  onChangeCategoryId: PropTypes.func,
};

export default CategorySelect;
