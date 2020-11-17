import React, { useState, useEffect, useRef } from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { WORDS_UPDATE_BOX_ID, CHARACTERS_UPDATE_BOX_ID } from "../CreateToolbar/WordCountPopover";

const CustomEditor = props => {
  const classes = useStyles();
  const editorRef = useRef();
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
  const { CKEditor, BalloonEditor, WordCount } = editorRef.current || {};
  const CONFIG = {
    placeholder: getLabel("P_CREATE_REVIEW_CONTENT"),
    plugins: [WordCount],
    wordCount: {
      onUpdate: stats => {
        const charactersBox = document.getElementById(CHARACTERS_UPDATE_BOX_ID);
        charactersBox.textContent = stats.characters;
        const wordsBox = document.getElementById(WORDS_UPDATE_BOX_ID);
        wordsBox.textContent = stats.words;
      },
    },
  };
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      BalloonEditor: require("@ckeditor/ckeditor5-build-balloon"),
      WordCount: require("@ckeditor/ckeditor5-word-count/src/wordcount"),
    };
    setIsEditorLoaded(true);
  }, []);

  return isEditorLoaded ? (
    <Box className={classes.root}>
      <CKEditor editor={BalloonEditor} config={CONFIG} {...props} />
    </Box>
  ) : (
    <CircularProgress />
  );
};

CustomEditor.propTypes = {};

const useStyles = makeStyles(theme => ({
  root: {
    "& .ck.ck-editor__editable_inline": {
      padding: 0,
      fontSize: 16,
    },
    "& .ck.ck-editor__editable_inline.ck-focused ::selection": {
      background: theme.palette.primary[100],
    },
    "& .ck.ck-placeholder:before, .ck .ck-placeholder:before": {
      color: theme.palette.grey[500],
    },
    "& .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-rounded-corners": {
      border: "none",
      boxShadow: "none",
    },
  },
}));

export default CustomEditor;
