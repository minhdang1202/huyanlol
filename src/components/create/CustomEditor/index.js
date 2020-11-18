import React, { useState, useEffect, useRef } from "react";
import StringFormat from "string-format";
import punycode from "punycode";
import { makeStyles, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import { stateToHTML } from "draft-js-export-html";
import { ArrowRightIcon, ArrowLeftIcon } from "icons";
import createUndoPlugin from "draft-js-undo-plugin";
import { CHARACTERS_UPDATE_BOX_ID } from "../CreateToolbar/WordCountPopover";
import { WORDS_UPDATE_CONTAINER_ID } from "../CreateToolbar";

const undoPlugin = createUndoPlugin({
  undoContent: <ArrowLeftIcon />,
  redoContent: <ArrowRightIcon />,
});
const plugins = [undoPlugin];

const CustomEditor = ({ onChangeContent }) => {
  const classes = useStyles();
  const editor = useRef();
  const charsBox = document.getElementById(CHARACTERS_UPDATE_BOX_ID);
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const onGetWordCount = editorState => {
    const plainText = editorState.getCurrentContent().getPlainText("");
    const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
    const cleanString = plainText.replace(regex, " ").trim(); // replace above characters w/ space
    const wordArray = cleanString.match(/\S+/g); // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  };

  const onGetCharCount = editorState => {
    const decodeUnicode = str => punycode.ucs2.decode(str); // func to handle unicode characters
    const plainText = editorState.getCurrentContent().getPlainText("");
    const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
    const cleanString = plainText.replace(regex, "").trim(); // replace above characters w/ nothing
    return decodeUnicode(cleanString).length;
  };

  const onChange = editorState => {
    setEditorState(editorState);
    setWordCount(onGetWordCount(editorState));
    setCharCount(onGetCharCount(editorState));
    const contentHtml = stateToHTML(editorState.getCurrentContent());
    const hasContent = editorState.getCurrentContent().hasText();
    onChangeContent(contentHtml, hasContent);
  };

  useEffect(() => {
    const wordsBox = document.getElementById(WORDS_UPDATE_CONTAINER_ID);
    wordsBox.innerText = StringFormat(getLabel("FM_WORDS"), wordCount);
  }, [wordCount]);

  useEffect(() => {
    if (charsBox && charCount) {
      charsBox.innerText = charCount;
    }
  }, [charCount, charsBox]);

  return (
    <Box className={classes.root}>
      <Editor
        ref={editor}
        placeholder={getLabel("P_CREATE_REVIEW_CONTENT")}
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
      />
    </Box>
  );
};

export const { UndoButton, RedoButton } = undoPlugin;

CustomEditor.propTypes = {
  onChangeContent: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  root: {
    "& .DraftEditor-root": {
      fontSize: 16,
    },
    "& .public-DraftEditorPlaceholder-root": {
      color: theme.palette.grey[500],
    },
  },
}));

export default CustomEditor;
