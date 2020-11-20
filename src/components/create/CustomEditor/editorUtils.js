import { EditorState, Modifier } from "draft-js";
import punycode from "punycode";

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

export const resetAllStyles = editorState => {
  const selectionState = editorState.getSelection();
  const anchorKey = selectionState.getAnchorKey();
  //Then based on the docs for SelectionState -
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(anchorKey);
  const start = selectionState.getStartOffset();
  const end = selectionState.getEndOffset();
  // Selected Text
  const selectedText = currentBlock.getText().slice(start, end);

  const contentWithoutStyles = Modifier.replaceText(
    editorState.getCurrentContent(),
    selectionState,
    selectedText,
    null,
  );

  const newState = EditorState.push(editorState, contentWithoutStyles, "change-inline-style");

  return newState;
};

export const resetBlockType = editorState => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  // const styles = editorState.getCurrentInlineStyle();

  // const removeStyles = styles.reduce((state, style) => {
  //   return Modifier.removeInlineStyle(state, selection, style);
  // }, contentState);

  const removeBlock = Modifier.setBlockType(contentState, selection, "unstyled");
  const newState = EditorState.push(editorState, removeBlock);

  return newState;
};
