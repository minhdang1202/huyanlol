import React from "react";
import PropTypes from "prop-types";
import { DialogLayout } from "components";
import { DialogContent, DialogTitle, makeStyles } from "@material-ui/core";
import ReplyItem from "./ReplyItem";
import AddingReply from "./AddingReply";

const ArticleReplyDialog = props => {
  const classes = useStyles();

  return (
    <DialogLayout className={classes.root} maxWidth="md" {...props}>
      <DialogTitle disableTypography>
        <AddingReply />
      </DialogTitle>
      <DialogContent dividers>
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
        <ReplyItem />
      </DialogContent>
    </DialogLayout>
  );
};

ArticleReplyDialog.propTypes = {
  open: PropTypes.bool,
  onReply: PropTypes.func,
};

export default ArticleReplyDialog;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 670,
  },
}));
