import React from "react";
import PropTypes from "prop-types";
import { DialogLayout } from "components";
import { Box, CircularProgress, DialogContent, DialogTitle, makeStyles, Typography } from "@material-ui/core";
import ReplyLayout from "./ReplyLayout";
import AddingReply from "./AddingReply";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";

const ArticleReplyDialog = props => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);

  return (
    <DialogLayout className={classes.root} maxWidth="md" {...props}>
      <DialogTitle disableTypography>
        <AddingReply />
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" className={classes.listComments}>
          {getLabel("TXT_ARTICLE_LIST_COMMENTS")}
        </Typography>
        <ReplyLayout />
        <ReplyLayout />
        <Box className="center-root" p={2}>
          <CircularProgress className={classes.loading} />
        </Box>
      </DialogContent>
    </DialogLayout>
  );
};

ArticleReplyDialog.propTypes = {
  open: PropTypes.bool,
};

export default ArticleReplyDialog;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 670,
  },
  listComments: {
    marginBottom: 16,
  },
  loading: {
    width: "26px !important",
    height: "26px !important",
    "&, svg": {
      color: theme.palette.primary.main,
    },
  },
}));
