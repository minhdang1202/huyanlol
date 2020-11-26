import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Button, Divider, makeStyles, OutlinedInput } from "@material-ui/core";
import ReplyItem from "./ReplyItem";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { uuid } from "utils";

const ReplyLayout = props => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const inputRef = useRef();

  const onReply = () => {
    inputRef.current.focus();
  };

  return (
    <Box className={classes.root}>
      <ReplyItem onReply={onReply} />
      <Box className={classes.listReplies}>
        {[...Array(3)].map(_ => (
          <Box key={uuid()} className={classes.replyItem}>
            <ReplyItem onReply={onReply} />
          </Box>
        ))}
        <Divider orientation="vertical" className={classes.listRepliesBorderLeft} />
      </Box>
      <Box className={classes.typing}>
        <Avatar />
        <OutlinedInput
          inputRef={inputRef}
          classes={{ root: classes.typingInputRoot, input: classes.typingInput, notchedOutline: classes.typingOutline }}
          placeholder={getLabel("TXT_ARTICLE_WRITE_REPLY")}
        />
      </Box>
      <Box className={classes.action}>
        <Button variant="contained" color="primary" disabled>
          {getLabel("TXT_ARTICLE_REPLY_BUTTON")}
        </Button>
        <Button variant="contained" color="primary" className="light-blue-button">
          {getLabel("TXT_ARTICLE_CANCEL")}
        </Button>
      </Box>
    </Box>
  );
};

ReplyLayout.propTypes = {
  open: PropTypes.bool,
  onReply: PropTypes.func,
};

export default ReplyLayout;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: 8,
  },
  listReplies: {
    position: "relative",
    paddingLeft: 18,
  },
  listRepliesBorderLeft: {
    position: "absolute",
    top: 0,
    width: 2,
    height: "calc(100% - 50px)",
    background: theme.palette.grey[300],
  },
  replyItem: {
    paddingLeft: 14,
  },
  typing: {
    display: "flex",
    alignItems: "center",
  },
  typingInputRoot: {
    flexGrow: 1,
    marginLeft: 14,
    "&.Mui-focused $typingOutline": {
      "&, &:hover": { borderColor: theme.palette.primary.main },
    },
    "&:hover": {
      "& $typingOutline": { borderColor: theme.palette.grey[300] },
    },
  },
  typingInput: {
    padding: "12px 16px",
  },
  typingOutline: {
    borderColor: theme.palette.grey[100],
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: 12,
    paddingBottom: 12,

    "& button": {
      minHeight: 33,
      padding: "6px 16px",
      marginLeft: 8,
    },

    "& button:disabled": {
      background: theme.palette.grey[300],
      color: "white",
    },
  },
  disabledButton: {
    background: theme.palette.grey[300],
    color: "white",
  },
}));
