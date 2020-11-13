import { call, put } from "redux-saga/effects";
import { ApiConstant } from "const";
import ArticleAction from "redux/article.redux";
import { ArticleService } from "services";
import { getImageById } from "utils";

export function* requestGetGiversList(action) {
  const { articleId, params } = action;
  let response = yield call(ArticleService.getArticleGivers, articleId, params);

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
  const { articleId, params } = action;
  let response = yield call(ArticleService.getArticleComments, articleId, params);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      let { pageData, total } = responseData;
      const commentsList = pageData.map(comment => {
        const {
          content,
          commentId,
          commentToEditions,
          commentToUsers,
          replyCount,
          reactCount,
          lastUpdate,
          replies,
        } = comment;
        const { userId, name, imageId } = comment.user;
        const avatar = imageId ? getImageById(imageId) : null;
        let repliesList;
        if (replies) {
          repliesList = replies.map(reply => {
            const { imageId, name, userId } = reply.user;
            const avatar = imageId ? getImageById(imageId) : null;
            return { ...reply, avatar, name, userId };
          });
        }
        const bookCoverId = commentToEditions[0] ? commentToEditions[0].imageId : null;
        const bookCover = bookCoverId ? getImageById(bookCoverId) : null;
        if (commentToEditions[0]) commentToEditions[0].bookCover = bookCover;
        return {
          content,
          commentId,
          commentToEditions,
          commentToUsers,
          replyCount,
          reactCount,
          lastUpdate,
          replies: repliesList,
          userId,
          name,
          avatar,
        };
      });

      yield put(ArticleAction.getCommentsListSuccess({ commentsList, totalComments: total }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.getCommentsListFailure(error));
  }
}

export function* requestGetRepliesList(action) {
  const { commentId, params } = action;
  let response = yield call(ArticleService.getArticleReplies, commentId, params);

  try {
    if (response.status === ApiConstant.STT_OK) {
      let responseData = response.data.data;
      let { pageData } = responseData;
      const repliesList = pageData.map(reply => {
        const { content, commentId, commentToEditions, commentToUsers, reactCount, lastUpdate, replyCount } = reply;
        const { userId, name, imageId } = reply.user;
        const avatar = imageId ? getImageById(imageId) : null;
        const bookCoverId = commentToEditions[0] ? commentToEditions[0].imageId : null;
        const bookCover = bookCoverId ? getImageById(bookCoverId) : null;
        if (commentToEditions[0]) commentToEditions[0].bookCover = bookCover;
        return {
          content,
          commentId,
          commentToEditions,
          commentToUsers,
          reactCount,
          lastUpdate,
          userId,
          name,
          avatar,
          replyCount,
        };
      });

      yield put(ArticleAction.getRepliesListSuccess({ repliesList }));
    }
  } catch (error) {
    console.log(error);
    yield put(ArticleAction.getRepliesListFailure(error));
  }
}
