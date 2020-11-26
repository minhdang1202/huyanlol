import punycode from "punycode";
import { EditorState, RichUtils, convertToRaw } from "draft-js";

export const getWordCount = editorState => {
  const plainText = editorState.getCurrentContent().getPlainText("");
  const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
  const cleanString = plainText.replace(regex, " ").trim(); // replace above characters w/ space
  const wordArray = cleanString.match(/\S+/g); // matches words according to whitespace
  return wordArray ? wordArray.length : 0;
};

export const getCharCount = editorState => {
  const decodeUnicode = str => punycode.ucs2.decode(str); // func to handle unicode characters
  const plainText = editorState.getCurrentContent().getPlainText("");
  const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
  const cleanString = plainText.replace(regex, "").trim(); // replace above characters w/ nothing
  return decodeUnicode(cleanString).length;
};

export const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
  }, callback);
};

export const getEntityLink = editorState => {
  const contentState = editorState.getCurrentContent();
  const startKey = editorState.getSelection().getStartKey();
  const startOffset = editorState.getSelection().getStartOffset();
  const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
  const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
  let url = "";
  if (linkKey) {
    const linkInstance = contentState.getEntity(linkKey);
    url = linkInstance.getData().url;
  }
  return url;
};

export const insertLink = (editorState, urlValue) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", { url: urlValue });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });
  return RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey);
};

export const getContentSelection = editorState => {
  const cursorData = editorState.getSelection();
  const key = cursorData.anchorKey;
  const contentState = editorState.getCurrentContent();
  let result;
  contentState.blockMap.forEach((e, i) => {
    if (i === key) {
      result = e.text;
      return;
    }
  });
  return result;
};

export const getPlainText = editorState => {
  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  const value = blocks.map(block => (!block.text.trim() && "\n") || block.text).join("\n");
  return value.trim();
};

export const checkIfUnOrderList = editorState => {
  const cursorData = editorState.getSelection();
  const key = cursorData.anchorKey;
  const contentState = editorState.getCurrentContent();
  let result = false;
  contentState.blockMap.forEach((e, i) => {
    if (i === key) {
      if (e.getType() === "unordered-list-item") result = true;
    }
  });
  return result;
};
