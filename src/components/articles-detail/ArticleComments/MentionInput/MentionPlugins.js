import createMentionPlugin from "draft-js-mention-plugin";
import Mention from "./Mention";

const HEIGHT_USER_SUGGESTIONS = "200px";
const WIDTH_USER_SUGGESTIONS = "250px";
const HEIGHT_EDITION_SUGGESTIONS = "245px";
const WIDTH_EDITION_SUGGESTIONS = "250px";

const downMentionUserPlugin = createMentionPlugin({
  mentionTrigger: "@",
  mentionComponent: Mention,
  entityMutability: "IMMUTABLE",
  supportWhitespace: true,
  positionSuggestions: settings => {
    return {
      left: settings.decoratorRect.left + "px",
      top: settings.decoratorRect.top + 25 + "px",
      transform: "scale(1)",
      maxHeight: HEIGHT_USER_SUGGESTIONS,
      width: WIDTH_USER_SUGGESTIONS,
    };
  },
});

const downMentionEditionPlugin = createMentionPlugin({
  mentionTrigger: "&",
  mentionComponent: Mention,
  entityMutability: "IMMUTABLE",
  supportWhitespace: true,
  positionSuggestions: settings => {
    return {
      left: settings.decoratorRect.left + "px",
      top: settings.decoratorRect.top + 25 + "px",
      transform: "scale(1)",
      maxHeight: HEIGHT_EDITION_SUGGESTIONS,
      width: WIDTH_EDITION_SUGGESTIONS,
    };
  },
});
const downPlugins = [downMentionEditionPlugin, downMentionUserPlugin];

const { MentionSuggestions: DownMentionUserSuggestions } = downMentionUserPlugin;
const { MentionSuggestions: DownMentionEditionSuggestions } = downMentionEditionPlugin;

export const downMentionPlugins = {
  plugins: downPlugins,
  MentionUserSuggestions: DownMentionUserSuggestions,
  MentionEditionSuggestions: DownMentionEditionSuggestions,
};

const topMentionUserPlugin = createMentionPlugin({
  mentionTrigger: "@",
  mentionComponent: Mention,
  entityMutability: "IMMUTABLE",
  supportWhitespace: true,
  positionSuggestions: settings => {
    return {
      left: settings.decoratorRect.left + "px",
      top: settings.decoratorRect.top - 25 + "px", // Change this value (25) for manage the distance between cursor and bottom edge of popover
      transform: "scale(1) translateY(-100%)",
      maxHeight: HEIGHT_USER_SUGGESTIONS,
      width: WIDTH_USER_SUGGESTIONS,
    };
  },
});
const topMentionEditionPlugin = createMentionPlugin({
  mentionTrigger: "&",
  mentionComponent: Mention,
  entityMutability: "IMMUTABLE",
  supportWhitespace: true,
  positionSuggestions: settings => {
    return {
      left: settings.decoratorRect.left + "px",
      top: settings.decoratorRect.top - 25 + "px", // Change this value (25) for manage the distance between cursor and bottom edge of popover
      transform: "scale(1) translateY(-100%)",
      maxHeight: HEIGHT_EDITION_SUGGESTIONS,
      width: WIDTH_EDITION_SUGGESTIONS,
    };
  },
});
const topPlugins = [topMentionEditionPlugin, topMentionUserPlugin];
const { MentionSuggestions: TopMentionUserSuggestions } = topMentionUserPlugin;
const { MentionSuggestions: TopMentionEditionSuggestions } = topMentionEditionPlugin;

export const topMentionPlugins = {
  plugins: topPlugins,
  MentionUserSuggestions: TopMentionUserSuggestions,
  MentionEditionSuggestions: TopMentionEditionSuggestions,
};
