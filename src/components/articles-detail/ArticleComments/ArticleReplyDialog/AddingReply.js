import React, { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, CardContent, CardHeader, Divider, makeStyles, Typography } from "@material-ui/core";
import { Avatar, AuthDialog } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { getImageById } from "utils";
import MentionInput from "../MentionInput";
import { downMentionPlugins } from "../MentionInput/MentionPlugins";

const AddingReply = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const { getCommonKey } = LangConstant;
  const { isAuth } = useSelector(({ authRedux }) => authRedux);
  const { profile } = useSelector(({ userRedux }) => userRedux);
  const [isOpenAuthDialog, setIsOpenAuthDialog] = useState(false);
  const [content, setContent] = useState({});
  const [hasContent, setHasContent] = useState(false);

  const onAddReply = event => {
    event.stopPropagation();
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
              onChangeContent={onChangeContent}
              className={classes.input}
              placeholder={getLabel("P_ARTICLE_WRITE_COMMENT")}
              {...downMentionPlugins}
            />
          )}
          <Divider />
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          disabled={!hasContent}
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
      padding: 0,
    },
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
  },
  sendBtn: {
    width: 132,
    minHeight: 33,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  input: {
    padding: theme.spacing(1.5, 0),
    width: "100%",
    "& .DraftEditor-root": {
      width: "100%",
      overflow: "auto",
      maxHeight: 88,
      fontSize: 16,
    },
  },
}));
