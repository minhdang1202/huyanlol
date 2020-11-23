import React from "react";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import PropTypes from "prop-types";
import { TextFieldSelect } from "components";

const CategorySelect = ({ categoryId, categoryList, onChangeCategoryId }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
  return (
    <TextFieldSelect
      disabled={categoryId == 0}
      label={getLabel("L_ARTICLE_CATEGORY")}
      value={categoryId}
      selectList={categoryList}
      onChange={e => onChangeCategoryId(e)}
    />
  );
};

CategorySelect.propTypes = {
  categoryList: PropTypes.array,
  categoryId: PropTypes.number,
  onChangeCategoryId: PropTypes.func,
};

export default CategorySelect;
