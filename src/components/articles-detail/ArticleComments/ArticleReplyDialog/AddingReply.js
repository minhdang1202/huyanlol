import React, { memo, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Button, Card, CardContent, CardHeader, Divider, makeStyles, Typography } from "@material-ui/core";
import { Avatar, AuthDialog } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { getImageById } from "utils";
import MentionInput from "../MentionInput";
import ArticleActions from "redux/article.redux";

const AddingReply = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const { getCommonKey } = LangConstant;
  const dispatch = useDispatch();
  const { isAuth } = useSelector(({ authRedux }) => authRedux);
  const { profile } = useSelector(({ userRedux }) => userRedux);
  const [articleId, isPostingComment, isTypingReply] = useSelector(
    ({ articleRedux }) => [articleRedux.article.articleId, articleRedux.isPostingComment, articleRedux.isTypingReply],
    shallowEqual,
  );
  const [isOpenAuthDialog, setIsOpenAuthDialog] = useState(false);
  const [content, setContent] = useState({});
  const [hasContent, setHasContent] = useState(false);

  const onAddReply = event => {
    event.stopPropagation();
    dispatch(ArticleActions.requestPostComment({ ...content, articleId }));
  };

  const onChangeContent = ({ hasContent, ...newContent }) => {
    setContent(newContent);
    setHasContent(hasContent);
  };

  const onOpenAuthDialog = () => {
    setIsOpenAuthDialog(true);
  };

  const onCloseAuthDialog = () => {
    setIsOpenAuthDialog(false);
  };

  const onClick = () => {
    dispatch(ArticleActions.cancelReply());
  };

  return (
    <>
      <AuthDialog isOpen={isOpenAuthDialog} onClose={onCloseAuthDialog} />
      <Card className={classes.root}>
        <CardHeader
          classes={{ avatar: classes.headerAvatar }}
          avatar={isAuth && <Avatar src={getImageById(profile.imageId)} aria-label="avatar" />}
          title={
            <Typography variant="subtitle2" component="p" className={classes.headerTitle}>
              {isAuth ? profile.name : getLabel("TXT_ARTICLE_LOGIN_TO_COMMENT")}
            </Typography>
          }
        />
        <CardContent className={classes.main}>
          {isAuth && (
            <MentionInput
              disabled={isTypingReply}
              onClick={onClick}
              onChangeContent={onChangeContent}
              className={classes.input}
              placeholder={getLabel("P_ARTICLE_WRITE_COMMENT")}
            />
          )}
          <Divider />
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          disabled={!hasContent || isPostingComment}
          className={classes.sendBtn}
          onClick={isAuth ? onAddReply : onOpenAuthDialog}
        >
          {isAuth ? getLabel("TXT_ARTICLE_SEND_COMMENT") : getLabel(getCommonKey("TXT_LOGIN"))}
        </Button>
      </Card>
    </>
  );
};

AddingReply.defaultProps = { isHiddenAction: false };

export default memo(AddingReply);

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "unset",
    "&, & > *": {
      padding: theme.spacing(1),
    },
    height: 252,
    display: "flex",
    flexDirection: "column",
    border: `solid 1px ${theme.palette.grey[100]}`,
    marginBottom: theme.spacing(3),
  },
  headerAvatar: { marginRight: 12 },
  headerTitle: { fontSize: 18 },
  main: {
    paddingTop: theme.spacing(1),

    "& > *": {
      display: "flex",
      marginBottom: 8,
    },
    "&>:last-child": {
      background: theme.palette.grey[100],
    },
    height: "100%",
  },
  sendBtn: {
    width: 132,
    minHeight: 33,
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  input: {
    padding: theme.spacing(1.5, 0),
    width: "100%",
    height: "100%",
    "& .DraftEditor-root": {
      width: "100%",
      overflow: "auto",
      height: 65,
      maxHeight: 65,
      fontSize: 16,
    },
  },
}));
