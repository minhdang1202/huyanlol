import React from "react";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import PropTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import SettingTypeTabs from "./SettingTypeTabs";
import ArticleBox from "./ArticleBox";

const PreviewArticle = ({
  rate,
  isReviewType,
  type,
  title,
  content,
  bookName,
  tagsList,
  categoryTitle,
  thumbnailId,
  onChangeType,
}) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  return (
    <>
      <Box display="flex" position="relative" justifyContent="space-between" zIndex={2} mt={2}>
        <Typography variant="subtitle1">{getLabel("TXT_PREVIEW_ARTICLE")}</Typography>
        <SettingTypeTabs value={type} onChange={(e, newValue) => onChangeType(e, newValue)} />
      </Box>
      <ArticleBox
        type={type}
        rate={rate}
        title={title}
        content={content}
        isReviewType={isReviewType}
        bookName={bookName}
        tagsList={tagsList}
        thumbnailId={thumbnailId}
        categoryTitle={categoryTitle}
      />
    </>
  );
};

PreviewArticle.propTypes = {
  type: PropTypes.number,
  isReviewType: PropTypes.bool,
  rate: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  bookName: PropTypes.string,
  tagsList: PropTypes.array,
  categoryTitle: PropTypes.string,
  thumbnailId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChangeType: PropTypes.func,
};

export default PreviewArticle;
