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
  const giversRedux = yield select(({ articleRedux }) => articleRedux.articleGivers);
  const articleGivers = Array.from(giversRedux);
  const currentGivers = articleGivers[articleId]?.pageData || [];
  let response = yield call(ArticleService.getArticleGivers, articleId, params);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      const { pageData: newGivers } = responseData;
      articleGivers[articleId] =
        pageNum === 1 ? responseData : { ...responseData, pageData: currentGivers.concat(newGivers) };
      yield put(ArticleAction.articleSuccess({ articleGivers }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestGetCommentGivers(action) {
  const { commentId, ...params } = action.data;
  const { pageNum } = params;
  const commentGiversRedux = yield select(({ articleRedux }) => articleRedux.commentGivers);
  const commentGivers = Array.from(commentGiversRedux);
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
  const { lastCommentId, pageSize } = params;
  const { comments: commentsRedux, replies: currentRepliesRedux } = yield select(({ articleRedux }) => articleRedux);
  const comments = { ...commentsRedux };
  const currentReplies = Array.from(currentRepliesRedux);
  const { pageData: currentComments } = comments;
  let response = yield call(ArticleService.getArticleComments, articleId, params);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      let { pageData: newComments, total } = responseData;
      if (lastCommentId || (!lastCommentId && !currentReplies.length))
        newComments.forEach(comment => {
          const { commentId, replies, replyCount } = comment;
          if (replies && !currentReplies[commentId])
            currentReplies[commentId] = {
              pageData: replies.concat(currentReplies[commentId]?.pageData || []),
              replyCount,
            };
        });
      const isLastPage = !lastCommentId ? pageSize >= total : total === 0;
      const comments = !lastCommentId
        ? { ...responseData, isLastPage }
        : { ...responseData, pageData: currentComments.concat(newComments), isLastPage };
      yield put(ArticleAction.articleSuccess({ comments, replies: currentReplies }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestGetReplies(action) {
  const { commentId, ...params } = action.data;
  const currentRepliesRedux = yield select(({ articleRedux }) => articleRedux.replies);
  const currentReplies = Array.from(currentRepliesRedux);
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

export function* requestPostComment(action) {
  const { articleId, ...bodyReq } = action.data;
  let isSuccess = false;
  const { comments: commentsRedux, article: articleRedux } = yield select(({ articleRedux }) => articleRedux);
  const comments = { ...commentsRedux };
  const article = { ...articleRedux };
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
      article.commentCount += 1;
      isSuccess = true;
      yield put(
        ArticleAction.articleSuccess({
          comments,
          isPostCommentSuccess: true,
          newComment: responseData,
          article,
        }),
      );
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
  const { replies: repliesRedux, article: articleRedux } = yield select(({ articleRedux }) => articleRedux);
  const replies = Array.from(repliesRedux);
  const article = { ...articleRedux };
  let response = yield call(ArticleService.postReply, commentId, bodyReq);
  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      const parentCommentId = responseData.parent.commentId;
      if (replies[parentCommentId]?.pageData) {
        replies[parentCommentId].pageData.push(responseData);
        replies[parentCommentId].replyCount += 1;
      } else {
        replies[parentCommentId] = { pageData: [responseData], replyCount: 1 };
      }
      article.commentCount += 1;
      isSuccess = true;
      yield put(
        ArticleAction.articleSuccess({
          replies,
          isPostCommentSuccess: true,
          isPostReplySuccess: true,
          article,
          newComment: responseData,
        }),
      );
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure({ isPostCommentFailure: true }));
  }
  if (!isSuccess) {
    yield put(ArticleAction.articleFailure({ isPostCommentFailure: true }));
  }
}

export function* requestArticleList(action) {
  let response = yield call(ArticleService.getListArticles, action.data);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      yield put(ArticleAction.articleSuccess({ articleList: responseData }));
    } else {
      yield put(ArticleAction.articleFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestArticlePopularList(action) {
  let response = yield call(ArticleService.getListArticles, action.data);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data.pageData;
      yield put(ArticleAction.articleSuccess({ articlePopularList: responseData }));
    } else {
      yield put(ArticleAction.articleFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestAddArticleReact(action) {
  const { articleId, bodyReq } = action.data;
  let response = yield call(ArticleService.postReactArticle, articleId, bodyReq);

  try {
    if (response.status === ApiConstant.STT_OK) {
      yield put(ArticleAction.articleSuccess());
    } else {
      yield put(ArticleAction.articleFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}

export function* requestAddCommentReact(action) {
  const { commentId, bodyReq } = action.data;
  let response = yield call(ArticleService.postReactComment, commentId, bodyReq);

  try {
    if (response.status === ApiConstant.STT_OK) {
      yield put(ArticleAction.articleSuccess());
    } else {
      yield put(ArticleAction.articleFailure());
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.articleFailure(error));
  }
}
