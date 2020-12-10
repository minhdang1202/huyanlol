import { call, put, select } from "redux-saga/effects";
import { ApiConstant } from "const";
import ArticleAction from "redux/article.redux";
import { ArticleService } from "services";

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

export function* requestGetGivers(action) {
  const { articleId, ...params } = action.data;
  const { pageNum } = params;
  let givers = yield select(({ articleRedux }) => articleRedux.articleGivers);
  const currentGivers = givers[articleId]?.pageData || [];
  let response = yield call(ArticleService.getArticleGivers, articleId, params);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      const { pageData: newGivers } = responseData;
      givers[articleId] = pageNum === 1 ? responseData : { ...responseData, pageData: currentGivers.concat(newGivers) };
      yield put(ArticleAction.articleSuccess({ givers }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestGetCommentGivers(action) {
  const { commentId, ...params } = action.data;
  const { pageNum } = params;
  let commentGivers = yield select(({ articleRedux }) => articleRedux.commentGivers);
  const currentCommentGivers = commentGivers[commentId]?.pageData || [];
  let response = yield call(ArticleService.getArticleCommentGivers, commentId, params);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      const { pageData: newCommentGivers } = responseData;
      commentGivers[commentId] =
        pageNum === 1 ? responseData : { ...responseData, pageData: currentCommentGivers.concat(newCommentGivers) };
      yield put(ArticleAction.articleSuccess({ commentGivers }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestGetComments(action) {
  const { articleId, ...params } = action.data;
  const { lastCommentId } = params;
  let [comments, currentReplies, desktopComments] = yield select(({ articleRedux }) => [
    articleRedux.comments,
    articleRedux.replies,
    articleRedux.desktopComments,
  ]);
  const { pageData: currentComments, total: currentTotal } = comments;
  let response = yield call(ArticleService.getArticleComments, articleId, params);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      let { pageData: newComments, total: newTotal } = responseData;
      const total = newTotal < currentTotal ? currentTotal : newTotal;
      if (lastCommentId || (!lastCommentId && !currentReplies.length))
        newComments.forEach(comment => {
          const { commentId, replies } = comment;
          if (replies && !currentReplies[commentId])
            currentReplies[commentId] = {
              pageData: replies.concat(currentReplies[commentId]?.pageData || []),
            };
        });
      const comments = !lastCommentId
        ? responseData
        : { ...responseData, pageData: currentComments.concat(newComments), total };
      const result = { comments, replies: currentReplies };
      if (!desktopComments[articleId]) {
        desktopComments[articleId] = newComments.slice(0, 2);
        result.desktopComments = desktopComments;
      }
      yield put(ArticleAction.articleSuccess(result));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestGetReplies(action) {
  const { commentId, ...params } = action.data;
  const isFetchingReplies = false;
  let currentReplies = yield select(({ articleRedux }) => articleRedux.replies);
  let response = yield call(ArticleService.getArticleReplies, commentId, params);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      const { pageData: newReplies } = responseData;
      currentReplies[commentId] = {
        ...responseData,
        pageData: newReplies.reverse().concat(currentReplies[commentId].pageData),
      };
      yield put(ArticleAction.articleSuccess({ replies: currentReplies, isFetchingReplies }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error, isFetchingReplies));
  }
}

export function* requestPostComment(action) {
  const { articleId, ...bodyReq } = action.data;
  let isSuccess = false;
  let comments = yield select(({ articleRedux }) => articleRedux.comments);
  let response = yield call(ArticleService.postComment, articleId, bodyReq);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      if (comments.pageData) {
        comments.pageData.unshift(responseData);
        comments.total += 1;
      } else {
        comments.pageData = [responseData];
        comments.total = 1;
      }
      isSuccess = true;
      yield put(ArticleAction.articleSuccess({ comments, isPostCommentSuccess: true }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure({ isPostCommentFailure: true }));
  }
  if (!isSuccess) {
    yield put(ArticleAction.articleFailure({ isPostCommentFailure: true }));
  }
}

export function* requestPostReply(action) {
  const { commentId, ...bodyReq } = action.data;
  let isSuccess = false;
  let replies = yield select(({ articleRedux }) => articleRedux.replies);
  let response = yield call(ArticleService.postReply, commentId, bodyReq);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      if (replies[commentId].pageData) {
        replies[commentId].pageData.unshift(responseData);
      } else {
        replies[commentId].pageData = [responseData];
      }
      isSuccess = true;
      yield put(ArticleAction.articleSuccess({ replies, isPostCommentSuccess: true }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure({ isPostCommentFailure: true }));
  }
  if (!isSuccess) {
    yield put(ArticleAction.articleFailure({ isPostCommentFailure: true }));
  }
}
