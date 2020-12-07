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

export function* requestGetGivers(action) {
  const { articleId, ...params } = action.data;
  const { pageNum } = params;
  let givers = yield select(({ articleRedux }) => articleRedux.givers);
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
  const { pageNum } = params;
  let [currentComments, currentReplies, desktopComments] = yield select(({ articleRedux }) => [
    articleRedux.comments.pageData,
    articleRedux.replies,
    articleRedux.desktopComments,
  ]);
  let response = yield call(ArticleService.getArticleComments, articleId, params);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      const { pageData: newComments } = responseData;
      if (pageNum !== 1 || (pageNum === 1 && !currentReplies.length))
        newComments.forEach(comment => {
          const { commentId, replies } = comment;
          if (replies)
            currentReplies[commentId] = {
              pageData: replies.concat(currentReplies[commentId]?.pageData || []),
            };
        });

      const comments =
        pageNum === 1 ? responseData : { ...responseData, pageData: currentComments.concat(newComments) };
      desktopComments = desktopComments.length ? desktopComments : newComments.slice(0, 2);
      yield put(ArticleAction.articleSuccess({ comments, replies: currentReplies, desktopComments }));
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
      currentReplies[commentId] = {
        ...responseData,
        pageData: newReplies.reverse().concat(currentReplies[commentId].pageData),
      };
      yield put(ArticleAction.articleSuccess({ replies: currentReplies }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

// export function* requestPostComment(action) {
//   const { articleId, ...params } = action.data;
//   let response = yield call(ArticleService.postComment, articleId, params);

//   try {
//     if (response.status === ApiConstant.STT_OK) {
//       let responseData = response.data.data;      
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(ArticleAction.articleFailure(error));
//   }
// }
