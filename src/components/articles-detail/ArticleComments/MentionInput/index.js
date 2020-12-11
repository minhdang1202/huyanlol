import React, { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import PropTypes from "prop-types";
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

const MentionInput = forwardRef(
  (
    {
      className,
      placeholder,
      onChangeContent,
      MentionUserSuggestions,
      MentionEditionSuggestions,
      plugins,
      ...otherProps
    },
    ref,
  ) => {
    const classes = useStyles();
    const editorRef = useRef();
    const dispatch = useDispatch();
    const [userSuggestionRedux, editionSuggestionRedux, isPostCommentSuccess, replyInfo] = useSelector(
      ({ editionRedux, userRedux, articleRedux }) => [
        userRedux.suggestions,
        editionRedux.suggestions,
        articleRedux.isPostCommentSuccess,
        articleRedux.replyInfo,
      ],
      shallowEqual,
    );
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
      if (searchUser)
        dispatch(
          UserActions.requestUserSuggestion({
            keyword: searchUser,
            size: AppConstant.USER_SUGGESTION,
            type: AppConstant.VALUE_TYPE.name,
          }),
        );
    }, [searchUser]);

    useEffect(() => {
      setEditionSuggestions([]);
      if (searchEdition)
        dispatch(
          EditionActions.requestGetEditionSuggestion({
            keyword: searchEdition,
            size: AppConstant.BOOK_SUGGESTION,
            type: AppConstant.VALUE_TYPE.title,
          }),
        );
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
      if (replyInfo?.user) {
        onChange(EditorState.moveSelectionToEnd(addMention(replyInfo)));
      }
    }, [replyInfo]);

    return (
      <Box className={clsx(classes.root, className)} ref={ref} onClick={onFocus} {...otherProps}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          placeholder={placeholder}
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

MentionInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeContent: PropTypes.func.isRequired,
  MentionUserSuggestions: PropTypes.elementType.isRequired,
  MentionEditionSuggestions: PropTypes.elementType.isRequired,
  plugins: PropTypes.array.isRequired,
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
