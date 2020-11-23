import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StringFormat from "string-format";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Container, Divider, Typography, Box, TextareaAutosize, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import { LangConstant, PathConstant } from "const";
import { useTranslation } from "react-i18next";
import MainLayout from "layouts/MainLayout";
import { CustomRating, DialogAppDownload } from "components";
import { CreateToolbar, CustomEditor, SettingPopup } from "components/create";
import ArticleCreateActions from "redux/articleCreate.redux";

const Creator = () => {
  const MAX_LENGTH_TITLE = 250;
  const categoryList = MOCK_CATEGORY_LIST;
  const tagsSuggestion = MOCK_HASHTAGS_LIST;
  const reviewCategoryList = [{ title: "Đánh giá sách", id: 0 }];
  const classes = useStyles();
  const router = useRouter();
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);

  const dispatch = useDispatch();
  const dispatchStartSuccess = () => dispatch(ArticleCreateActions.startReviewBookSuccess());
  const [isReviewType, reviewInfo] = useSelector(state => [
    state.articleCreateRedux.isReviewType,
    state.articleCreateRedux.reviewInfo,
  ]);

  const [title, setTitle] = useState();
  const [rate, setRate] = useState(0);
  const [contentHtml, setContentHtml] = useState();
  const [contentText, setContentText] = useState();
  const [hasContent, setHasContent] = useState();
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [categoryId, setCategoryId] = useState(categoryList[0].id);
  const [tagsList, setTagsList] = useState([]);

  const onChangeTagsList = tags => {
    const newTagsList = tags.map(tag => {
      if (typeof tag === "object") return tag.title;
      return tag;
    });
    setTagsList([...new Set(newTagsList)]);
  };

  const onCloseDownload = () => {
    if (isReviewType) {
      router.push(StringFormat(PathConstant.FM_BOOK_DETAIL_ID, reviewInfo.editionId));
    } else {
      router.push(PathConstant.ROOT);
    }
  };

  const onOpenSetting = () => {
    setIsOpenSetting(true);
  };

  const onCloseSetting = () => {
    setIsOpenSetting(false);
  };

  const onChangeContent = ({ contentHtml, hasContent, contentText }) => {
    setContentHtml(contentHtml);
    setHasContent(hasContent);
    setContentText(contentText);
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  const onChangeRate = (e, newRate) => {
    setRate(newRate);
  };

  const onChangeCategoryId = e => {
    setCategoryId(e.target.value);
  };

  useEffect(() => {
    return () => {
      dispatchStartSuccess();
    };
  }, []);

  useEffect(() => {
    if (isReviewType) {
      setRate(reviewInfo.rate ? reviewInfo.rate : 0);
      setCategoryId(0);
    }
  }, [isReviewType]);

  return (
    <MainLayout className={classes.root}>
      <Hidden smUp>
        <DialogAppDownload isOpen={true} onClose={onCloseDownload} />
      </Hidden>
      <SettingPopup
        open={isOpenSetting}
        onClose={onCloseSetting}
        rate={rate}
        bookName={isReviewType ? reviewInfo.bookName : null}
        isReviewType={isReviewType}
        title={title}
        content={contentText}
        categoryId={categoryId}
        categoryList={isReviewType ? reviewCategoryList : categoryList}
        onChangeCategoryId={onChangeCategoryId}
        tagsSuggestion={tagsSuggestion}
        tagsList={tagsList}
        onChangeTagsList={onChangeTagsList}
      />
      <Box position="relative">
        <Box position="sticky" top={0}>
          <Container className={classes.container}>
            <CreateToolbar isDisabled={!(hasContent && title)} onOpenSetting={onOpenSetting} onClose={onCloseSetting} />
          </Container>
          <Divider />
        </Box>
        <Container className={classes.container}>
          <TextareaAutosize
            maxLength={MAX_LENGTH_TITLE}
            value={title}
            className={classes.title}
            placeholder={
              isReviewType
                ? StringFormat(getLabel("FM_CREATE_REVIEW_TITLE"), reviewInfo.bookName)
                : getLabel("P_CREATE_TITLE")
            }
            onChange={onChangeTitle}
          />
          {isReviewType && (
            <Box display="flex" alignItems="center" mb={3}>
              <Typography className={clsx("grey-text", "mr-8")}>{getLabel("L_CREATE_RATING")}</Typography>
              <CustomRating value={rate} onChange={onChangeRate} />
            </Box>
          )}
          <CustomEditor onChangeContent={onChangeContent} />
        </Container>
      </Box>
    </MainLayout>
  );
};

const MOCK_CATEGORY_LIST = [
  { title: "Đánh giá sách", id: 1 },
  { title: "Tiêu điểm sách", id: 2 },
];

const MOCK_HASHTAGS_LIST = [
  { title: "hashtag1", id: 0, quantity: 100 },
  { title: "hashtag2", id: 1, quantity: "10K" },
  { title: "hashtag3", id: 3, quantity: 200 },
  { title: "hashtag4", id: 4, quantity: "12k" },
  { title: "hashtag5", id: 5, quantity: 100 },
  { title: "hashtag6", id: 6, quantity: 100 },
  { title: "hashtag7", id: 7, quantity: 100 },
];

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.white,
  },
  container: {
    maxWidth: 1020,
    [theme.breakpoints.down("md")]: {
      maxWidth: 670,
    },
    "&:nth-child(2)": {
      marginTop: theme.spacing(3),
    },
  },
  title: {
    resize: "none",
    width: "100%",
    fontFamily: "SFProDisplay",
    fontSize: 34,
    color: theme.palette.text.primary,
    padding: theme.spacing(1.5, 0),
    border: "none",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
  },
}));

export default Creator;
