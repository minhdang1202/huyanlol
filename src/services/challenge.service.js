import { ApiConstant } from "const";
import { createApi } from "api";

export const getChallengeInfo = challengeId => {
  return createApi().get(ApiConstant.GET_CHALLENGE_INFO(challengeId));
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
