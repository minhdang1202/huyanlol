import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Container, Divider, Typography, Box, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import { LangConstant, PathConstant, AppConstant, ApiConstant } from "const";
import { useTranslation } from "react-i18next";
import MainLayout from "layouts/MainLayout";
import { CustomRating, DialogAppDownload, Snackbar, Processing } from "components";
import { CreateToolbar, CustomEditor, SettingPopup, TitleInput } from "components/articles-create";
import ArticleCreateActions from "redux/articleCreate.redux";
import { ArticleService } from "services";
import { getNumberIdFromCreateQuery, getRedirectPath, debounce } from "utils";

const ArticleEdit = ({ article }) => {
  const MAX_LENGTH_TITLE = 250;
  const classes = useStyles();
  const router = useRouter();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  const reviewCategoryList = [{ title: getLabel("TXT_REVIEW_TYPE_CATEGORY"), categoryId: AppConstant.CATEGORY_REVIEW }];

  const dispatch = useDispatch();
  const { categoriesList, isFetching, isSaveSuccess, isSaveFailure, isPostSuccess, isPostFailure } = useSelector(
    ({ articleCreateRedux }) => articleCreateRedux,
  );

  const articleId = article.articleId;
  const [title, setTitle] = useState(article.title || "");
  const [rate, setRate] = useState(article.editions[0].userRelation.evaluation.rate);
  const [contentHtml, setContentHtml] = useState();
  const [intro, setIntro] = useState();
  const [hasContent, setHasContent] = useState();
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [categoryId, setCategoryId] = useState(article.categories[0].categoryId);
  const [tagsList, setTagsList] = useState(article.hashtags);
  const [booksList, setBooksList] = useState(article.editions);
  const [thumbnailList, setThumbnailList] = useState(article.bodyImageIds);
  const [thumbnailId, setThumbnailId] = useState(article.thumbnailId);
  const [coverId, setCoverId] = useState(article.coverId);
  const [tagIds, setTagIds] = useState([]);
  const [tagNames, setTagNames] = useState([]);
  const [hasAutoSave, setHasAutoSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasSnackbar, setHasSnackbar] = useState(false);
  const [message, setMessage] = useState();
  const isReviewType = !Boolean(categoryId);

  const onAutoSave = debounce(() => {
    setIsSaving(true);
    setHasAutoSave(false);
  }, AppConstant.AUTOSAVE_WAIT_TIME);

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
      router.back();
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
    dispatch(ArticleCreateActions.editArticle(article));
    if (categoryId) dispatch(ArticleCreateActions.requestCategoriesList());
  }, []);

  useEffect(() => {
    if (categoriesList.length && !isReviewType) setCategoryId(categoriesList[0].categoryId);
  }, [categoriesList]);

  useEffect(() => {
    if (!hasAutoSave && contentHtml && title) {
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
      if (hasSnackbar) {
        setMessage("");
        if (!isPostSuccess) onHiddenSnackbar();
        switch (true) {
          case isPostSuccess:
            dispatch(ArticleCreateActions.saveArticleSuccess());
            dispatch(ArticleCreateActions.postArticleSuccess());
            router.push(getRedirectPath(PathConstant.FM_ARTICLE_DETAIL, articleId, title));
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
      <SettingPopup
        open={isOpenSetting}
        onClose={onCloseSetting}
        rate={rate}
        bookName={null}
        isReviewType={isReviewType}
        title={title}
        content={intro}
        categoryId={categoryId}
        categoriesList={categoryId ? categoriesList : reviewCategoryList}
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
        onClickSaveDraft={onClickSaveDraft}
        onClickPostArticle={onClickPostArticle}
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
          <CustomEditor
            initialHtml={article.body}
            onChangeContent={onChangeContent}
            onChangeThumbnailList={onChangeThumbnailList}
          />
        </Container>
      </Box>
    </MainLayout>
  );
};

export const getServerSideProps = async ({ res, req, query }) => {
  let articleId = query && query.article ? query.article : null;
  const isOnlyNumber = /^\d+$/.test(articleId);
  articleId = isOnlyNumber ? articleId : getNumberIdFromCreateQuery(articleId);
  const token = req.cookies[AppConstant.KEY_TOKEN];
  const cookiesInfo = JSON.parse(req.cookies[AppConstant.KEY_STORED_APP]);
  const userId = cookiesInfo.userId;
  const articleDetailResponse = await ArticleService.getArticleDetail(articleId, token);
  const article = articleDetailResponse.data;

  if (article.data) {
    const articleData = article.data;
    let { title, creator } = articleData;
    const creatorId = creator.userId;
    if (userId !== creatorId)
      return {
        redirect: {
          permanent: true,
          destination: getRedirectPath(PathConstant.FM_ARTICLE_DETAIL, articleId, title),
        },
      };

    if (isOnlyNumber) {
      return {
        redirect: {
          permanent: true,
          destination: getRedirectPath(PathConstant.FM_ARTICLE_EDIT, articleId, title),
        },
      };
    }
    return {
      props: {
        article: articleData,
      },
    };
  }
  res.status(ApiConstant.STT_NOT_FOUND).end();
  return { props: {} };
};

ArticleEdit.propTypes = {
  article: PropTypes.object,
};

export default ArticleEdit;

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
