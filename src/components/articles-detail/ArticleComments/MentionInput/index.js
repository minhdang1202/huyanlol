import React, { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import clsx from "clsx";
import { AppConstant, PathConstant } from "const";
import { Box, makeStyles } from "@material-ui/core";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import EditionEntry from "./EditionEntry";
import UserEntry from "./UserEntry";
import { removeLastBlankBlocks, getMentionMap, getPlainText, addMention } from "utils/editor";
import { getRedirectPath, debounce, uuid } from "utils";
import ArticleActions from "redux/article.redux";
import EditionActions from "redux/edition.redux";
import UserActions from "redux/user.redux";
import createMentionPlugin from "draft-js-mention-plugin";
import Mention from "./Mention";

const MentionInput = forwardRef(
  ({ className, onChangeContent, placeholder, disabled, isTopSuggestion, ...otherProps }, ref) => {
    const [{ plugins, MentionUserSuggestions, MentionEditionSuggestions }] = useState(() => {
      const mentionUserPlugin = createMentionPlugin({
        mentionTrigger: "@",
        mentionComponent: Mention,
        entityMutability: "IMMUTABLE",
        supportWhitespace: true,
        positionSuggestions: settings => {
          const top = isTopSuggestion ? settings.decoratorRect.top - 25 + "px" : settings.decoratorRect.top + 25 + "px";
          const transform = isTopSuggestion ? "scale(1) translateY(-100%)" : "scale(1)";
          return {
            left: settings.decoratorRect.left + "px",
            top: top,
            transform,
            maxHeight: HEIGHT_USER_SUGGESTIONS,
            width: WIDTH_USER_SUGGESTIONS,
          };
        },
      });
      const mentionEditionPlugin = createMentionPlugin({
        mentionTrigger: "&",
        mentionComponent: Mention,
        entityMutability: "IMMUTABLE",
        supportWhitespace: true,
        positionSuggestions: settings => {
          const top = isTopSuggestion ? settings.decoratorRect.top - 25 + "px" : settings.decoratorRect.top + 25 + "px";
          const transform = isTopSuggestion ? "scale(1) translateY(-100%)" : "scale(1)";

          return {
            left: settings.decoratorRect.left + "px",
            top,
            transform,
            maxHeight: HEIGHT_EDITION_SUGGESTIONS,
            width: WIDTH_EDITION_SUGGESTIONS,
          };
        },
      });
      const plugins = [mentionEditionPlugin, mentionUserPlugin];
      const { MentionSuggestions: MentionUserSuggestions } = mentionUserPlugin;
      const { MentionSuggestions: MentionEditionSuggestions } = mentionEditionPlugin;
      return {
        plugins,
        MentionUserSuggestions,
        MentionEditionSuggestions,
      };
    });
    const classes = useStyles();
    const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
    const editorRef = useRef();
    const dispatch = useDispatch();
    const [userSuggestionRedux, editionSuggestionRedux, isPostCommentSuccess, isTypingReply, replyInfo] = useSelector(
      ({ editionRedux, userRedux, articleRedux }) => [
        userRedux.suggestions,
        editionRedux.suggestions,
        articleRedux.isPostCommentSuccess,
        articleRedux.isTypingReply,
        articleRedux.replyInfo,
      ],
      shallowEqual,
    );
    const userId = replyInfo?.user?.userId;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [searchUser, setSearchUser] = useState();
    const [searchEdition, setSearchEdition] = useState();
    const [userSuggestions, setUserSuggestions] = useState([]);
    const [editionSuggestions, setEditionSuggestions] = useState([]);

    const onChange = newEditorState => {
      setEditorState(newEditorState);
      let modifiedEditorState = removeLastBlankBlocks(newEditorState);
      const content = convertToHTML(convertMap)(modifiedEditorState.getCurrentContent());
      const mentionMap = getMentionMap(modifiedEditorState);
      const hasContent = Boolean(getPlainText(newEditorState));
      const editionIds = [];
      const userIds = [];
      mentionMap.forEach(mention => {
        const { editionId, userId } = mention;
        if (editionId && !editionIds.includes(editionId)) editionIds.push(editionId);
        if (userId && !userIds.includes(userId)) userIds.push(userId);
      });
      if (isTypingReply && !userIds.includes(userId)) userIds.push(userId);
      onChangeContent({ userIds, editionIds, content, hasContent });
    };

    const onSetSearchUser = useCallback(
      debounce(value => {
        setSearchUser(value);
      }, AppConstant.TYPING_WAIT_TIME),
      [],
    );

    const onSetSearchEdition = useCallback(
      debounce(value => {
        setSearchEdition(value);
      }, AppConstant.TYPING_WAIT_TIME),
      [],
    );

    const onSearchUser = ({ value }) => {
      onSetSearchUser(value);
    };

    const onSearchEdition = ({ value }) => {
      onSetSearchEdition(value);
    };

    const onFocus = () => {
      editorRef.current.focus();
    };

    useEffect(() => {
      if (searchUser) {
        dispatch(
          UserActions.requestUserSuggestion({
            keyword: searchUser,
            size: AppConstant.USER_SUGGESTION,
            type: AppConstant.VALUE_TYPE.name,
          }),
        );
      }
    }, [searchUser]);

    useEffect(() => {
      if (searchEdition) {
        dispatch(
          EditionActions.requestGetEditionSuggestion({
            keyword: searchEdition,
            size: AppConstant.BOOK_SUGGESTION,
            type: AppConstant.VALUE_TYPE.title,
          }),
        );
      }
    }, [searchEdition]);

    useEffect(() => {
      const newEditionSuggestion = [];
      if (editionSuggestionRedux.length) {
        editionSuggestionRedux.forEach(edition => {
          // Mention plugin only supports name field to display
          newEditionSuggestion.push({ ...edition, name: edition.title, id: uuid() });
        });
      }
      setEditionSuggestions(newEditionSuggestion);
    }, [editionSuggestionRedux]);

    useEffect(() => {
      const newUserSuggestion = [];
      if (userSuggestionRedux.length) {
        userSuggestionRedux.forEach(user => {
          newUserSuggestion.push({ ...user, id: uuid() });
        });
      }
      setUserSuggestions(newUserSuggestion);
    }, [userSuggestionRedux]);

    useEffect(() => {
      if (isPostCommentSuccess) {
        onChange(EditorState.createEmpty());
        dispatch(ArticleActions.finishPostComment());
      }
    }, [isPostCommentSuccess]);

    useEffect(() => {
      if (isTypingReply) {
        onFocus();
        onChange(addMention(replyInfo));
        return;
      }
    }, [isTypingReply, replyInfo]);

    useEffect(() => {
      if (disabled) {
        onChange(EditorState.createEmpty());
        editorRef.current.blur();
        console.log("disabled");
      }
    }, [disabled]);

    return (
      <Box className={clsx(classes.root, className)} ref={ref} onClick={onFocus} {...otherProps}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          placeholder={placeholder || getLabel("P_ARTICLE_WRITE_COMMENT")}
        />
        <MentionUserSuggestions
          onSearchChange={onSearchUser}
          suggestions={userSuggestions}
          entryComponent={UserEntry}
        />
        <MentionEditionSuggestions
          onSearchChange={onSearchEdition}
          suggestions={editionSuggestions}
          entryComponent={EditionEntry}
        />
      </Box>
    );
  },
);

const convertMap = {
  entityToHTML: (entity, originalText) => {
    if (entity.type === AppConstant.DRAFT_TYPE.mention || entity.type === AppConstant.DRAFT_TYPE.mentionEdition) {
      const { editionId, userId, title, name } = entity.data.mention;
      const path = editionId
        ? getRedirectPath(PathConstant.FM_BOOK_DETAIL, editionId, title)
        : getRedirectPath(PathConstant.FM_USER_DETAIL, userId);
      const href = AppConstant.WEBSITE_URL + path;
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {name || title}
        </a>
      );
    }
    return originalText;
  },
};

const HEIGHT_USER_SUGGESTIONS = "200px";
const WIDTH_USER_SUGGESTIONS = "250px";
const HEIGHT_EDITION_SUGGESTIONS = "245px";
const WIDTH_EDITION_SUGGESTIONS = "250px";

MentionInput.propTypes = {
  className: PropTypes.string,
  onChangeContent: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  isTopSuggestion: PropTypes.bool,
};

MentionInput.displayName = "MentionInput";

export default MentionInput;

const useStyles = makeStyles(theme => ({
  root: {
    "& .DraftEditor-root": {
      fontSize: 16,
    },
    "& .public-DraftEditorPlaceholder-root": {
      color: theme.palette.grey[500],
    },
    "& [class^='draftJsMentionPlugin__mentionSuggestions']": {
      overflowY: "scroll",
      display: "block",
      position: "fixed",
      padding: 0,
      borderRadius: 8,
      border: `1px solid ${theme.palette.grey[100]}`,
      boxShadow: "none",
    },
  },
}));
