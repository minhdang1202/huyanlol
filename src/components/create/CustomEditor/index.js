import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import StringFormat from "string-format";
import { makeStyles, Box, Divider, Hidden, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { EditorState, ContentState, RichUtils, AtomicBlockUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import EditorUtils from "draft-js-plugins-utils";
import { stateToHTML } from "draft-js-export-html";
import createUndoPlugin from "draft-js-undo-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import { ArrowRightIcon, ArrowLeftIcon } from "icons";
import { BlockquoteButton, HeadlineFiveButton, HeadlineSixButton } from "./inlineButtons";
import LinkInput from "./LinkInput";
import { getCharCount, getWordCount } from "./editorUtils";
import { WORD_BOX_ID } from "../CreateToolbar";
import { CHAR_BOX_ID } from "../CreateToolbar/CharCountPopover";
import ArticleCreateActions from "redux/articleCreate.redux";

const sideToolbarPlugin = createSideToolbarPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const linkPlugin = createLinkPlugin();
const undoPlugin = createUndoPlugin({
  undoContent: <ArrowLeftIcon />,
  redoContent: <ArrowRightIcon />,
});
const plugins = [undoPlugin, inlineToolbarPlugin, linkPlugin, sideToolbarPlugin];

const CustomEditor = ({ onChangeContent }) => {
  const wordBox = document.getElementById(WORD_BOX_ID);
  const charBox = document.getElementById(CHAR_BOX_ID);
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
  const classes = useStyles();

  const editor = useRef();

  const dispatch = useDispatch();
  const onCreateListSuccess = () => dispatch(ArticleCreateActions.createListSuccess());
  const onCreateBreakLineSuccess = () => dispatch(ArticleCreateActions.createBreakLineSuccess());

  const hasCreateList = useSelector(state => state.articleCreateRedux.hasCreateList);
  const hasCreateBreakLine = useSelector(state => state.articleCreateRedux.hasCreateBreakLine);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [hasOpenLinkInput, setHasOpenLinkInput] = useState(false);

  const onOpenLinkInput = e => {
    console.log(e.currentTarget);
    setHasOpenLinkInput(true);
  };

  const onCloseLinkInput = () => {
    setHasOpenLinkInput(false);
  };

  const onChange = editorState => {
    setEditorState(editorState);
    const contentHtml = stateToHTML(editorState.getCurrentContent());
    const hasContent = editorState.getCurrentContent().hasText();
    onChangeContent(contentHtml, hasContent);
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

  useEffect(() => {
    if (wordBox && editorState) wordBox.innerText = StringFormat(getLabel("FM_WORDS"), getWordCount(editorState));
    if (charBox && editorState) charBox.innerText = getCharCount(editorState);

    //Fix: can't delete when contentType !== "unstyled"
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled")
        onChange(EditorState.createWithContent(ContentState.createFromText("")));
    }

    const hasLink = EditorUtils.hasEntity(editorState, "LINK");
    // Remove all blockType
  }, [editorState, wordBox, charBox]);

  useEffect(() => {
    if (hasCreateList) onCreateList();
  }, [hasCreateList]);

  useEffect(() => {
    if (hasCreateBreakLine) onCreateBreakLine();
  }, [hasCreateBreakLine]);

  return (
    <Box className={classes.root}>
      <Editor
        ref={editor}
        placeholder={getLabel("P_CREATE_REVIEW_CONTENT")}
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        blockRendererFn={onRenderBlock}
      />
      <InlineToolbar>
        {externalProps => (
          <>
            <HeadlineFiveButton {...externalProps} />
            <HeadlineSixButton {...externalProps} />
            <Divider orientation="vertical" className={classes.divider} flexItem />
            <BlockquoteButton {...externalProps} />
            {/* <LinkButton {...externalProps} /> */}
            <IconButton className={classes.linkButton} onClick={onOpenLinkInput}>
              <Box className={clsx("ic-link", "center-root")} />
            </IconButton>
            <LinkInput open={hasOpenLinkInput} onClose={onCloseLinkInput} />
          </>
        )}
      </InlineToolbar>
      <Hidden mdDown>
        <SideToolbar>{externalProps => <></>}</SideToolbar>
      </Hidden>
    </Box>
  );
};

const { InlineToolbar } = inlineToolbarPlugin;
const { SideToolbar } = sideToolbarPlugin;
// const { LinkButton } = linkPlugin;
export const { UndoButton, RedoButton } = undoPlugin;
const DividerBlock = () => <Divider />;

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
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
    "& [class^='draftJsToolbar__toolbar']": {
      "& [class*='separator']": {
        margin: 0,
        width: 2,
      },
      "& svg": {
        fill: theme.palette.text.primary,
      },
      "& [class*='active']": {
        color: theme.palette.primary.main,
        "& svg": {
          fill: theme.palette.primary.main,
        },
      },
      display: "flex",
      transform: "translate(-20%, -10%)  !important",
      alignItems: "center",
      justifyContent: "center",
      padding: 2,
      boxShadow: "none",
      borderRadius: 6,
      "&:after": {
        display: "none",
      },
      "&:before": {
        display: "none",
      },
      "& button": {
        color: theme.palette.text.primary,
        background: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        "&:hover": {
          "& svg": {
            fill: theme.palette.primary.main,
          },
          color: theme.palette.primary.main,
        },
        "& svg": {
          width: 16,
        },
      },
      "& button:last-child": {
        padding: theme.spacing(0, 1),
        // "& svg": {
        //   width: 20,
        // },
      },
      "& input": {
        height: 40,
        outline: "none",
        border: "none",
        width: "auto",
        minWidth: 200,
        padding: theme.spacing(0, 1.5),
        maxWidth: "100%",
        "&::placeholder": {
          color: theme.palette.grey[500],
        },
      },
    },
  },
  divider: {
    width: 1,
  },
}));

export default CustomEditor;
