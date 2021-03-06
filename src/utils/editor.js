import punycode from "punycode";
import { AppConstant } from "const";
import { EditorState, RichUtils, convertToRaw, AtomicBlockUtils, Modifier } from "draft-js";
import { MAIN_LAYOUT_ID } from "layouts/MainLayout";

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
    return entityKey !== null && contentState.getEntity(entityKey).getType() === AppConstant.DRAFT_TYPE.link;
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
  const contentStateWithEntity = contentState.createEntity(AppConstant.DRAFT_TYPE.link, "MUTABLE", { url: urlValue });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });
  return RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey);
};

export const insertBreakLine = editorState => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(AppConstant.DRAFT_TYPE.divider, "MUTABLE", { a: "b" });

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
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
      if (e.getType() === AppConstant.DRAFT_TYPE.unorderedList) result = true;
    }
  });
  return result;
};

export const removeLastBlankBlocks = editorState => {
  const contentState = editorState.getCurrentContent();
  let isLastBlankBlock = true;
  let newBlockMap = contentState.blockMap.reverse().filter((e, i) => {
    if (isLastBlankBlock) {
      if (e.text || e.getType() == AppConstant.DRAFT_TYPE.atomic) {
        isLastBlankBlock = false;
      } else {
        return false;
      }
    }
    return true;
  });
  const newContentState = contentState.set("blockMap", newBlockMap.reverse());
  return EditorState.push(editorState, newContentState);
};

export const getCurrentEl = editorState => {
  const startKey = editorState.getSelection().getStartKey();
  const currentEl = document.querySelector(`[data-offset-key="${startKey}-0-0"]`);
  return currentEl;
};

export const scrollWithSpecificSpace = editorState => {
  const contentState = editorState.getCurrentContent();
  const lastBlockKey = contentState.getBlockMap().last().getKey();
  const anchorKey = editorState.getSelection().anchorKey;
  const mainLayout = document.getElementById(MAIN_LAYOUT_ID);
  const currentEl = getCurrentEl(editorState);

  const currentTop = currentEl.offsetTop;
  const clientHeight = mainLayout.clientHeight;
  const currentScrollTop = mainLayout.scrollTop;

  if (lastBlockKey === anchorKey) {
    mainLayout.scrollTo({
      top: mainLayout.scrollHeight,
      behavior: "smooth",
    });
  } else {
    if (currentTop >= currentScrollTop + clientHeight - 420)
      mainLayout.scrollTo({
        top: currentScrollTop + 50,
        behavior: "smooth",
      });
  }
};

export const getMentionMap = editorState => {
  const contentState = editorState.getCurrentContent();
  let entities = [];
  contentState.getBlockMap().forEach(block => {
    block.findEntityRanges(character => {
      const charEntity = character.getEntity();
      if (charEntity) {
        const contentEntity = contentState.getEntity(charEntity);
        entities.push(contentEntity);
      }
    });
  });
  const mentionMap = [];
  entities.forEach((entity, i) => {
    if (
      entity.get("type") === AppConstant.DRAFT_TYPE.mention ||
      entity.get("type") === AppConstant.DRAFT_TYPE.mentionEdition
    ) {
      mentionMap.push(entity.get("data").mention);
    }
  });
  return mentionMap;
};

export const addMention = replyInfo => {
  const editorState = EditorState.createEmpty();
  const mention = { ...replyInfo };
  const contentStateWithEntity = editorState
    .getCurrentContent()
    .createEntity(AppConstant.DRAFT_TYPE.mention, "IMMUTABLE", { mention });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  let mentionReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    replyInfo.user.name,
    null,
    entityKey,
  );
  mentionReplacedContent = Modifier.insertText(mentionReplacedContent, mentionReplacedContent.getSelectionAfter(), " ");

  let newEditorState = EditorState.push(editorState, mentionReplacedContent, "insert-mention");
  return newEditorState;
};

export const focusCurrentEl = editorState => {
  const currentEl = getCurrentEl(editorState);
  if (currentEl) currentEl.scrollIntoView({ behavior: "smooth", block: "center" });
};
