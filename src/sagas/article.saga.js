import { call, put, select } from "redux-saga/effects";
import { ApiConstant } from "const";
import ArticleAction from "redux/article.redux";
import { ArticleService } from "services";
import { getImageById } from "utils";

export function* requestGetHomeArticles(action) {
  let response = yield call(ArticleService.getListArticles, action.data);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      yield put(ArticleAction.articleSuccess({ homeArticles: responseData }));
    } else {
      yield put(ArticleAction.articleFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestGetHomeReviews(action) {
  let response = yield call(ArticleService.getListArticles, action.data);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      yield put(ArticleAction.articleSuccess({ homeReviews: responseData }));
    } else {
      yield put(ArticleAction.articleFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestGetChallengeArticles(action) {
  let response = yield call(ArticleService.getChallengeListArticles, action.data);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data.pageData;
      yield put(ArticleAction.articleSuccess({ challengeArticles: responseData }));
    } else {
      yield put(ArticleAction.articleFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestGetGiversList(action) {
  const { id, params, isComment } = action;
  let response = isComment
    ? yield call(ArticleService.getArticleCommentGivers, id, params)
    : yield call(ArticleService.getArticleGivers, id, params);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      let { pageData, total } = responseData;
      const giversList = pageData.map(giver => {
        const { reactCount } = giver;
        const { userId, name, followRelation, imageId } = giver.user;
        const avatar = imageId ? getImageById(imageId) : null;
        return {
          avatar,
          name,
          userId,
          followRelation,
          reactCount,
        };
      });

      yield put(ArticleAction.articleSuccess({ giversList: giversList, totalGivers: total }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestGetComments(action) {
  const { articleId, ...params } = action.data;
  const { pageNum } = params;
  let [currentPageData, currentReplies] = yield select(({ articleRedux }) => [
    articleRedux.comments.pageData,
    articleRedux.replies,
  ]);
  let response = yield call(ArticleService.getArticleComments, articleId, params);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      const { pageData: newPageData } = responseData;
      newPageData.forEach(comment => {
        const { commentId, replies } = comment;
        if (replies)
          currentReplies[commentId] = {
            pageData: replies.concat(currentReplies[commentId]?.pageData || []),
          };
      });
      const comments =
        pageNum === 1 ? responseData : { ...responseData, pageData: currentPageData.concat(newPageData) };
      yield put(ArticleAction.articleSuccess({ comments, replies: currentReplies }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestGetReplies(action) {
  const { commentId, ...params } = action.data;
  let currentReplies = yield select(({ articleRedux }) => articleRedux.replies);
  let response = yield call(ArticleService.getArticleReplies, commentId, params);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      const { pageData: newReplies } = responseData;
      currentReplies[commentId] = { ...responseData, pageData: newReplies.concat(currentReplies[commentId].pageData) };
      yield put(ArticleAction.articleSuccess({ replies: currentReplies }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}
