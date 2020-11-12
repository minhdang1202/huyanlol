import { call, put } from "redux-saga/effects";
import { ApiConstant } from "const";
import ArticleAction from "redux/article.redux";
import { ArticleService } from "services";
import { getImageById } from "utils";

export function* requestGetGiversList(action) {
  const { data } = action;
  let response = yield call(ArticleService.getArticleGivers, data);

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

      yield put(ArticleAction.getGiversListSuccess({ giversList: giversList, totalGivers: total }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.getGiversListFailure(error));
  }
}

export function* requestGetCommentsList(action) {
  const { data } = action;
  let response = yield call(ArticleService.getArticleComments, data);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      let { pageData } = responseData;
      const commentsList = pageData.map(comment => {
        const { content, commentId, commentToEditions, replyCount, reactCount, lastUpdate, replies } = comment;
        const { userId, name, imageId } = comment.user;
        const avatar = imageId ? getImageById(imageId) : null;
        return {
          content,
          commentId,
          commentToEditions,
          replyCount,
          reactCount,
          lastUpdate,
          replies,
          userId,
          name,
          avatar,
        };
      });

      yield put(ArticleAction.getCommentsListSuccess({ commentsList }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.getCommentsListFailure(error));
  }
}
