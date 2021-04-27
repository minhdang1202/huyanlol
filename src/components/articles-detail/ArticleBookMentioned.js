import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import StringFormat from "string-format";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import BookBox from "./BookBox";
import { BookSlider } from "./ArticleSliders";

const ArticleBookMentioned = ({ isReviewType, bookList, bookMentioned }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);

  return (
    <>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
        mb={{ xs: 1, sm: 1.5 }}
      >
        <Typography variant="h6">{getLabel("TXT_ARTICLE_BOOK_MENTIONED")}</Typography>
        {!isReviewType && (
          <Typography variant="body2" className="grey-text">
            {StringFormat(getLabel("FM_ARTICLE_BOOK"), bookList.length)}
          </Typography>
        )}
      </Box>
      {isReviewType ? (
        <BookBox
          data={bookMentioned}
          className="mb-8"
        />
      ) : (
        <BookSlider sliderList={bookList} className="mb-8" />
      )}
    </>
  );
};

ArticleBookMentioned.propTypes = {
  isReviewType: PropTypes.bool,
  bookList: PropTypes.array,
  bookMentioned: PropTypes.object,
};

export default ArticleBookMentioned;
