import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import StringFormat from "string-format";
import { makeStyles, Box, Divider, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { EditorState, RichUtils, AtomicBlockUtils, CompositeDecorator } from "draft-js";
import Editor from "draft-js-plugins-editor";
import { stateToHTML } from "draft-js-export-html";
import createUndoPlugin from "draft-js-undo-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import { ArrowRightIcon, ArrowLeftIcon } from "icons";
import CustomInlineToolbar from "./CustomInlineToolbar";
import CustomSideToolbar from "./CustomSideToolbar";
import InsertLink from "./InsertLink";
import { getCharCount, getWordCount, findLinkEntities, getEntityLink, insertLink, getPlainText } from "./editorUtils";
import { WORD_BOX_ID } from "../CreateToolbar";
import ArticleCreateActions from "redux/articleCreate.redux";

const sideToolbarPlugin = createSideToolbarPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const undoPlugin = createUndoPlugin({
  undoContent: <ArrowLeftIcon />,
  redoContent: <ArrowRightIcon />,
});
const plugins = [undoPlugin, inlineToolbarPlugin, sideToolbarPlugin];
const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: InsertLink,
  },
]);

const CustomEditor = ({ onChangeContent }) => {
  const wordBox = document.getElementById(WORD_BOX_ID);

  const editor = useRef();

  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);

  const dispatch = useDispatch();
  const onCreateListSuccess = () => dispatch(ArticleCreateActions.createListSuccess());
  const onCreateBreakLineSuccess = () => dispatch(ArticleCreateActions.createBreakLineSuccess());

  const hasCreateList = useSelector(state => state.articleCreateRedux.hasCreateList);
  const hasCreateBreakLine = useSelector(state => state.articleCreateRedux.hasCreateBreakLine);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [anchorLinkInput, setAnchorLinkInput] = useState(null);
  const [inlineBtn, setInlineBtn] = useState();
  const [urlValue, setUrlValue] = useState("");
  const [hasHiddenPlaceholder, setHasHiddenPlaceholder] = useState(false);

  const classes = useStyles({ hasUrl: getEntityLink(editorState) });

  const onOpenLinkInput = e => {
    e.preventDefault();
    setAnchorLinkInput(e.currentTarget);
    onPromptForLink();
  };

  const onCloseLinkInput = () => {
    setAnchorLinkInput(null);
  };

  const onChangeUrlValue = e => {
    setUrlValue(e.target.value);
  };

  const onSubmitUrlValue = e => {
    e.preventDefault();
    if (!urlValue) {
      onRemoveLink();
      setTimeout(() => {
        editor.current.blur();
      }, 0);
      return;
    }

    onChange(insertLink(editorState, urlValue));
    setUrlValue("");
    setTimeout(() => {
      editor.current.blur();
    }, 0);
  };

  const onPromptForLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setUrlValue(getEntityLink(editorState));
    }
  };

  const onRemoveLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      onChange(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  const onChange = editorState => {
    setEditorState(editorState);
    const contentHtml = stateToHTML(editorState.getCurrentContent());
    const hasContent = editorState.getCurrentContent().hasText();
    const contentText = getPlainText(editorState);
    onChangeContent({ contentHtml, hasContent, contentText });
  };

  const onChangeInlineBtn = (e, newInlineBtn) => {
    setInlineBtn(newInlineBtn);
  };

  const onCreateList = () => {
    onChange(RichUtils.toggleBlockType(editorState, "unordered-list-item"));
    onCreateListSuccess();
  };

  const onCreateBreakLine = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("DIVIDER", "MUTABLE", { a: "b" });

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "));
    onCreateBreakLineSuccess();
  };

  const onRenderBlock = contentBlock => {
    const type = contentBlock.getType();
    if (type === "atomic") {
      return {
        component: DividerBlock,
        editable: true,
        props: {},
      };
    }
  };

  const onHandleKeyCommand = command => {
    let newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  useEffect(() => {
    onChange(EditorState.set(editorState, { decorator }));
  }, []);

  useEffect(() => {
    if (wordBox && editorState) wordBox.innerText = StringFormat(getLabel("FM_WORDS"), getWordCount(editorState));
    if (editorState) localStorage.setItem("charCount", getCharCount(editorState));

    //Fix: hidden placeholder when no text in "unstyled block"
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      const firstBlockType = contentState.getBlockMap().first().getType();
      if (firstBlockType !== "unstyled") {
        setHasHiddenPlaceholder(true);
        return;
      }
      setHasHiddenPlaceholder(false);
    }
  }, [editorState, wordBox]);

  useEffect(() => {
    if (hasCreateList) onCreateList();
  }, [hasCreateList]);

  useEffect(() => {
    if (hasCreateBreakLine) onCreateBreakLine();
  }, [hasCreateBreakLine]);

  useEffect(() => {
    if (inlineBtn != "link") onRemoveLink();
  }, [inlineBtn]);

  return (
    <Box className={classes.root}>
      <Editor
        ref={editor}
        placeholder={hasHiddenPlaceholder ? null : getLabel("P_CREATE_REVIEW_CONTENT")}
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        blockRendererFn={onRenderBlock}
        handleKeyCommand={onHandleKeyCommand}
      />
      <CustomInlineToolbar
        inlineBtn={inlineBtn}
        onChangeInlineBtn={onChangeInlineBtn}
        onOpenLinkInput={onOpenLinkInput}
        urlValue={urlValue}
        onChangeUrlValue={onChangeUrlValue}
        onCloseLinkInput={onCloseLinkInput}
        onSubmitUrlValue={onSubmitUrlValue}
        onRemoveLink={onRemoveLink}
        anchorLinkInput={anchorLinkInput}
        editorState={editorState}
      />
      <Hidden mdDown>
        <CustomSideToolbar
          editorState={editorState}
          onCreateBreakLine={onCreateBreakLine}
          onCreateList={onCreateList}
        />
      </Hidden>
    </Box>
  );
};

export const { InlineToolbar } = inlineToolbarPlugin;
export const { SideToolbar } = sideToolbarPlugin;
export const { UndoButton, RedoButton } = undoPlugin;
const DividerBlock = () => <Divider />;

CustomEditor.propTypes = {
  onChangeContent: PropTypes.func,
};

export default CustomEditor;

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
    "& .DraftEditor-root": {
      fontSize: 16,
    },
    "& .public-DraftEditorPlaceholder-root": {
      color: theme.palette.grey[500],
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
  },
}));
