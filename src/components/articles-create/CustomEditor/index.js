import React, { useState, useEffect, useRef } from "react";
import StringFormat from "string-format";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Box, Divider, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { EditorState, RichUtils, CompositeDecorator } from "draft-js";
import Editor from "draft-js-plugins-editor";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import createUndoPlugin from "draft-js-undo-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createImagePlugin from "draft-js-image-plugin";
import { ArrowRightIcon, ArrowLeftIcon } from "icons";
import CustomInlineToolbar from "./CustomInlineToolbar";
import CustomSideToolbar from "./CustomSideToolbar";
import InsertLink from "./InsertLink";
import {
  getCharCount,
  getWordCount,
  findLinkEntities,
  getEntityLink,
  insertLink,
  getPlainText,
  checkIfUnOrderList,
  removeLastBlankBlocks,
  insertBreakLine,
  scrollWithSpecificSpace,
  getCurrentEl,
  getContentSelection,
} from "utils/editor";
import { getImageById } from "utils";
import { WORD_BOX_ID } from "../CreateToolbar";
import ArticleCreateActions from "redux/articleCreate.redux";
import UserActions from "redux/user.redux";
import { Snackbar } from "components";

const CustomEditor = ({ onChangeContent, onChangeThumbnailList, initialHtml }) => {
  const wordBox = document.getElementById(WORD_BOX_ID);
  const editor = useRef();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  const dispatch = useDispatch();

  const [
    hasCreateList,
    hasCreateBreakLine,
    hasInsertImage,
    imageId,
    error,
    article,
  ] = useSelector(({ articleCreateRedux, userRedux }) => [
    articleCreateRedux.screen_hasCreateList,
    articleCreateRedux.screen_hasCreateBreakLine,
    articleCreateRedux.screen_hasInsertImage,
    userRedux.imageId,
    userRedux.error,
    articleCreateRedux.article,
  ]);

  const [hasFocus, setHasFocus] = useState(false);
  const [editorState, setEditorState] = useState(
    initialHtml ? EditorState.createWithContent(stateFromHTML(initialHtml)) : EditorState.createEmpty(),
  );
  const [anchorLinkInput, setAnchorLinkInput] = useState(null);
  const [inlineBtn, setInlineBtn] = useState();
  const [urlValue, setUrlValue] = useState("");
  const [hasHiddenPlaceholder, setHasHiddenPlaceholder] = useState(false);
  const [anchorSideToolbar, setAnchorSideToolbar] = useState(null);

  const classes = useStyles({ hasUrl: getEntityLink(editorState) });

  const onOpenLinkInput = e => {
    e.preventDefault();
    setAnchorLinkInput(e.currentTarget);
    onPromptForLink();
  };

  const onCloseLinkInput = () => {
    setAnchorLinkInput(null);
  };

  const onCloseSideToolbar = () => {
    setAnchorSideToolbar(null);
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
    let newEditorState = removeLastBlankBlocks(editorState);
    const contentHtml = stateToHTML(newEditorState.getCurrentContent());
    const hasContent = editorState.getCurrentContent().hasText();
    const intro = getPlainText(editorState);
    onChangeContent({ contentHtml, hasContent, intro });
  };

  const onChangeInlineBtn = (e, newInlineBtn) => {
    setInlineBtn(newInlineBtn);
  };

  const onCreateList = () => {
    onChange(RichUtils.toggleBlockType(editorState, "unordered-list-item"));
    dispatch(ArticleCreateActions.articleCreateSuccess());
  };

  const onInsertImage = src => {
    onChange(imagePlugin.addImage(editorState, src));
    dispatch(UserActions.userSuccess());
    dispatch(ArticleCreateActions.articleCreateSuccess());
  };

  const onCreateBreakLine = () => {
    onChange(insertBreakLine(editorState));
    dispatch(ArticleCreateActions.articleCreateSuccess());
  };

  const onRenderBlock = contentBlock => {
    const type = contentBlock.getType();
    const content = editorState.getCurrentContent();
    if (type === "atomic") {
      const entityKey = contentBlock.getEntityAt(0);
      const entity = content.getEntity(entityKey);
      if (entity != null && entity.getType() === "DIVIDER")
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
    setAnchorSideToolbar(getCurrentEl(editorState));

    if (hasFocus) scrollWithSpecificSpace(editorState);

    if (wordBox && editorState) wordBox.innerText = StringFormat(getLabel("FM_WORDS"), getWordCount(editorState));
    if (editorState) localStorage.setItem("charCount", getCharCount(editorState));
    const contentState = editorState.getCurrentContent();
    if (editorState) localStorage.setItem("isUnOrderList", checkIfUnOrderList(editorState));
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
    if (hasInsertImage && imageId) {
      onInsertImage(getImageById(imageId));
      onChangeThumbnailList(imageId);
    }
  }, [hasInsertImage, imageId]);

  useEffect(() => {
    if (inlineBtn != "link") onRemoveLink();
  }, [inlineBtn]);

  useEffect(() => {
    if (!article.articleId) {
      onChange(EditorState.createEmpty());
    }
  }, [article]);

  return (
    <Box className={classes.root}>
      <Editor
        ref={editor}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
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
          open={!getContentSelection(editorState) && Boolean(anchorSideToolbar)}
          anchorEl={anchorSideToolbar}
          onClose={onCloseSideToolbar}
        />
      </Hidden>
      {error && <Snackbar error message={error} />}
    </Box>
  );
};

const inlineToolbarPlugin = createInlineToolbarPlugin();
const imagePlugin = createImagePlugin();
const undoPlugin = createUndoPlugin({
  undoContent: <ArrowLeftIcon />,
  redoContent: <ArrowRightIcon />,
});
const plugins = [undoPlugin, inlineToolbarPlugin, imagePlugin];
const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: InsertLink,
  },
]);

export const { InlineToolbar } = inlineToolbarPlugin;
export const { UndoButton, RedoButton } = undoPlugin;
const DividerBlock = () => <Divider />;

CustomEditor.propTypes = {
  onChangeContent: PropTypes.func,
  onChangeThumbnailList: PropTypes.func,
  initialHtml: PropTypes.string,
};

export default CustomEditor;

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(20),
    "& .DraftEditor-root": {
      fontSize: 16,
      "& a": {
        color: theme.palette.primary.main,
      },
      "& img": {
        display: "block",
        maxWidth: "100%",
        margin: "0 auto",
      },
    },
    "& .public-DraftEditorPlaceholder-root": {
      color: theme.palette.grey[500],
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
  },
}));
