import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Container, Divider, Typography, Box, Hidden } from "@material-ui/core";
import clsx from "clsx";
import { LangConstant, PathConstant, AppConstant } from "const";
import { useTranslation } from "react-i18next";
import MainLayout from "layouts/MainLayout";
import { CustomRating, DialogAppDownload, AuthDialog, Snackbar, Processing } from "components";
import { CreateToolbar, CustomEditor, SettingPopup, TitleInput } from "components/articles-create";
import ArticleCreateActions from "redux/articleCreate.redux";
import { getRandomDefaultArticleCoverId, getRedirectPath, debounce } from "utils";

const ArticleCreate = () => {
  const MAX_LENGTH_TITLE = 250;
  const classes = useStyles();
  const router = useRouter();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  const reviewCategoryList = [{ title: getLabel("TXT_REVIEW_TYPE_CATEGORY"), categoryId: AppConstant.CATEGORY_REVIEW }];

  const dispatch = useDispatch();
  const {
    isReviewType,
    reviewInfo,
    categoriesList,
    article,
    isSaveSuccess,
    isSaveFailure,
    isPostSuccess,
    isPostFailure,
    isFetching,
  } = useSelector(({ articleCreateRedux }) => articleCreateRedux);
  const { isAuth } = useSelector(({ authRedux }) => authRedux);

  const articleId = article.articleId;

  const [title, setTitle] = useState();
  const [rate, setRate] = useState(0);
  const [contentHtml, setContentHtml] = useState();
  const [intro, setIntro] = useState();
  const [hasContent, setHasContent] = useState();
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [defaultCoverId, setDefaultCoverId] = useState(getRandomDefaultArticleCoverId());
  const [tagsList, setTagsList] = useState([]);
  const [booksList, setBooksList] = useState(isReviewType ? [reviewInfo] : []);
  const [thumbnailList, setThumbnailList] = useState([defaultCoverId]);
  const [thumbnailId, setThumbnailId] = useState(defaultCoverId);
  const [coverId, setCoverId] = useState(defaultCoverId);
  const [tagIds, setTagIds] = useState([]);
  const [tagNames, setTagNames] = useState([]);
  const [hasAutoSave, setHasAutoSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasSnackbar, setHasSnackbar] = useState(false);
  const [hasArticleId, setHasArticleId] = useState(false);
  const [message, setMessage] = useState();

  const onAutoSave = debounce(() => {
    setIsSaving(true);
    setHasAutoSave(false);
  }, AppConstant.AUTO_SAVE_WAIT_TIME);

  const onChangeTagsList = tags => {
    const newTagsList = tags.map(tag => {
      if (typeof tag === "object") {
        setTagIds(tagIds.concat(tag.tagId));
        return tag.tagName;
      }
      setTagNames(tagNames.concat(tag));
      return tag;
    });
    setTagsList([...new Set(newTagsList)]);
  };

  const onChangeThumbnailList = thumbnailId => {
    if (thumbnailList.length === 1) {
      setCoverId(thumbnailId);
      setThumbnailId(thumbnailId);
    }
    setThumbnailList([thumbnailId, ...thumbnailList]);
  };

  const onChangeCoverId = newCoverId => {
    setCoverId(newCoverId);
  };

  const onChangeThumbnailId = newThumbnailId => {
    setThumbnailId(newThumbnailId);
  };

  const onChangeBooksList = books => {
    setBooksList(books);
  };

  const onGetBodyReq = () => {
    const editionIds = booksList.map(book => book.editionId);
    const bodyReq = {
      body: contentHtml,
      intro: intro,
      bodyImageIds: thumbnailList,
      categoryIds: [categoryId],
      coverId: coverId,
      editionIds: editionIds,
      tagIds: tagIds,
      tagNames: [...new Set(tagNames)],
      thumbId: thumbnailId,
      title: title,
    };
    if (isReviewType) {
      bodyReq.value = rate;
    }
    return bodyReq;
  };

  const onPatchArticle = (state = AppConstant.DRAFT) => {
    const bodyReq = onGetBodyReq();
    dispatch(ArticleCreateActions.requestPatchArticle({ articleId, bodyReq: { ...bodyReq, state } }));
  };

  const onCloseDownload = () => {
    if (isReviewType) {
      router.push(getRedirectPath(PathConstant.FM_BOOK_DETAIL, reviewInfo.editionId, reviewInfo.title));
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

  const onChangeContent = ({ contentHtml, hasContent, intro }) => {
    setContentHtml(contentHtml);
    setHasContent(hasContent);
    setIntro(intro);
    onCreateArticle();
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);
    onCreateArticle();
  };

  const onChangeRate = (e, newRate) => {
    setRate(newRate);
  };

  const onChangeCategoryId = e => {
    setCategoryId(e.target.value);
  };

  const onCreateArticle = () => {
    if (hasContent && title && !hasArticleId) {
      setHasArticleId(true);
      dispatch(ArticleCreateActions.requestPostArticle(onGetBodyReq()));
    }
  };

  const onClickPostArticle = () => {
    onPatchArticle(AppConstant.PUBLISHED);
    setHasSnackbar(true);
  };

  const onClickSaveDraft = () => {
    onPatchArticle();
    setHasSnackbar(true);
  };

  const onHiddenSnackbar = debounce(() => {
    dispatch(ArticleCreateActions.saveArticleSuccess());
    setHasSnackbar(false);
  }, AppConstant.SNACKBAR_DURATION);

  useEffect(() => {
    return () => {
      if (isReviewType) dispatch(ArticleCreateActions.finishReviewBook());
      dispatch(ArticleCreateActions.postArticleSuccess());
    };
  }, []);

  useEffect(() => {
    if (isReviewType) {
      setRate(reviewInfo.rate ? reviewInfo.rate : 0);
      setCategoryId(0);
      return;
    }
    dispatch(ArticleCreateActions.requestCategoriesList());
  }, [isReviewType]);

  useEffect(() => {
    if (categoriesList.length && !isReviewType) setCategoryId(categoriesList[0].categoryId);
  }, [categoriesList]);

  useEffect(() => {
    if (articleId && !hasAutoSave && contentHtml && title) {
      setHasAutoSave(true);
      onAutoSave();
    }
  }, [contentHtml, tagsList, thumbnailList, coverId, thumbnailId, categoryId, title, rate]);

  useEffect(() => {
    if (isSaving) {
      onPatchArticle();
      setIsSaving(false);
    }
  }, [isSaving]);

  useEffect(() => {
    if (isPostSuccess || isPostFailure || isSaveFailure || isSaveSuccess) {
      if (!articleId) {
        setHasArticleId(false);
      }
      if (hasSnackbar) {
        onHiddenSnackbar();
        const newDefaultThumbnailId = getRandomDefaultArticleCoverId();
        switch (true) {
          case isPostSuccess:
            dispatch(ArticleCreateActions.saveArticleSuccess());
            dispatch(ArticleCreateActions.postArticleSuccess());
            dispatch(ArticleCreateActions.finishReviewBook());
            setMessage(getLabel("MSG_POST_ARTICLE_SUCCESS"));

            setThumbnailId(newDefaultThumbnailId);
            setCoverId(newDefaultThumbnailId);
            setBooksList([]);
            setThumbnailList([newDefaultThumbnailId]);
            setTagsList([]);
            setCategoryId();
            setHasArticleId(false);
            setIsOpenSetting(false);
            setTitle("");
            break;
          case isPostFailure:
            setMessage(getLabel("ERR_POST_ARTICLE"));
            break;
          case isSaveSuccess:
            setMessage(getLabel("MSG_SAVE_ARTICLE_SUCCESS"));
            break;
          case isSaveFailure:
            setMessage(getLabel("ERR_SAVE_ARTICLE"));
        }
      }
    }
  }, [isPostSuccess, isPostFailure, isSaveFailure, isSaveSuccess]);

  return (
    <MainLayout className={classes.root}>
      <Processing isShow={isFetching && hasSnackbar} />
      {hasSnackbar && message && <Snackbar open={true} error={isSaveFailure || isPostFailure} message={message} />}
      <Hidden smUp>
        <DialogAppDownload isOpen={true} onClose={onCloseDownload} />
      </Hidden>
      <AuthDialog isOpen={!isAuth} />
      <SettingPopup
        open={isOpenSetting}
        onClose={onCloseSetting}
        rate={rate}
        bookName={isReviewType ? reviewInfo.bookName : null}
        isReviewType={isReviewType}
        title={title}
        content={intro}
        categoryId={categoryId}
        categoriesList={isReviewType ? reviewCategoryList : categoriesList}
        onChangeCategoryId={onChangeCategoryId}
        tagsList={tagsList}
        onChangeTagsList={onChangeTagsList}
        booksList={booksList}
        onChangeBooksList={onChangeBooksList}
        isDisabled={!(hasContent && title)}
        coverId={coverId}
        thumbnailId={thumbnailId}
        thumbnailList={thumbnailList}
        onChangeCoverId={onChangeCoverId}
        onChangeThumbnailId={onChangeThumbnailId}
        onChangeThumbnailList={onChangeThumbnailList}
        onClickPostArticle={onClickPostArticle}
        onClickSaveDraft={onClickSaveDraft}
      />
      <Box position="relative">
        <Box position="sticky" top={0} zIndex={1000} bgcolor="white">
          <Container className={classes.container}>
            <CreateToolbar onOpenSetting={onOpenSetting} />
          </Container>
          <Divider />
        </Box>
        <Container className={classes.container}>
          <TitleInput onChange={onChangeTitle} maxLength={MAX_LENGTH_TITLE} value={title} />
          {isReviewType && (
            <Box display="flex" alignItems="center" mb={3}>
              <Typography className={clsx("grey-text", "mr-8")}>{getLabel("L_CREATE_RATING")}</Typography>
              <CustomRating value={rate} onChange={onChangeRate} />
            </Box>
          )}
          <CustomEditor onChangeContent={onChangeContent} onChangeThumbnailList={onChangeThumbnailList} />
        </Container>
      </Box>
    </MainLayout>
  );
};

export default ArticleCreate;

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
}));
