import { ApiConstant } from "../const";
import { createApi } from "../api";

export const getChallengeInfo = challengeId => {
  return createApi().get(ApiConstant.GET_CHALLENGE_INFO(challengeId));
};

export const getChallengeLeaderBoard = challengeId => {
  return createApi().get(ApiConstant.GET_CHALLENGE_LEADER_BOARD(challengeId));
};
