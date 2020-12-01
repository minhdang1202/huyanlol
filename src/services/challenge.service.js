import { ApiConstant, AppConstant } from "const";
import { createApi, defaultConfigV2 } from "api";
import { defaults } from "js-cookie";

export const getChallengeInfo = (challengeId, token) => {
  return createApi(defaultConfigV2, token).get(ApiConstant.GET_CHALLENGE_INFO(challengeId));
};

export const getChallengeLeaderBoard = challengeId => {
  return createApi().get(ApiConstant.GET_CHALLENGE_LEADER_BOARD(challengeId));
};

export const getChallengeActivity = (challengeId, pageSize) => {
  return createApi().get(ApiConstant.GET_CHALLENGE_ACTIVITY(challengeId, pageSize));
};

export const putJoinChallenge = challengeId => {
  return createApi().put(ApiConstant.PUT_JOIN_CHALLENGE(challengeId));
};

export const getChallengeFriendLeaderBoard = challengeId => {
  return createApi().get(ApiConstant.GET_CHALLENGE_FRIEND_LEADER_BOARD(challengeId));
};

export const getChallengeListAll = (data, listType) =>
  createApi().get(ApiConstant.GET_CHALLENGE_LIST_ALL, getChallengeListParams(data, listType));

const getChallengeListParams = (data, listType) => {
  let defaultData = data || {};
  const { pageNum, pageSize, sorts, joinStatusFilter, ...otherParams } = defaultData;
  let queryParams = {
    pageNum: pageNum ? pageNum : 1,
    pageSize: pageSize ? pageSize : AppConstant.DATA_SIZES.challenges,
    sorts: sorts ? sorts.join(",") : "createDate,DESC",
    ...otherParams,
  };
  if (!joinStatusFilter) {
    switch (listType) {
      case AppConstant.CHALLENGE_LIST_TYPE.all:
        return (queryParams.joinStatusFilter = AppConstant.CHALLENGE_LIST_TYPE.all);
      case AppConstant.CHALLENGE_ACTIVITY_TYPE.notJoined:
        return (queryParams.joinStatusFilter = AppConstant.CHALLENGE_LIST_TYPE.notJoined);
      case AppConstant.CHALLENGE_ACTIVITY_TYPE.joined:
        return (queryParams.joinStatusFilter = AppConstant.CHALLENGE_LIST_TYPE.joined);
      default:
        return (queryParams.joinStatusFilter = AppConstant.CHALLENGE_LIST_TYPE.all);
    }
  }

  return queryParams;
};
