import React from "react";
import PropTypes from "prop-types";
import { DialogLayout } from "components";
import { Box, CircularProgress, DialogContent, DialogTitle, makeStyles, Typography, Hidden } from "@material-ui/core";
import ReplyLayout from "./ReplyLayout";
import AddingReply from "./AddingReply";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import SortSelect from "./SortSelect";

const ArticleReplyDialog = ({ sortValue, onChangeSort, ...otherProps }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);

  return (
    <Hidden xsDown>
      <DialogLayout className={classes.root} maxWidth="md" {...otherProps}>
        <DialogTitle disableTypography>
          <AddingReply />
        </DialogTitle>
        <DialogContent dividers>
          <Box className="space-between-root" mb={2}>
            <Typography variant="subtitle1" className={classes.listComments}>
              {getLabel("TXT_ARTICLE_LIST_COMMENTS")}
            </Typography>
            <SortSelect value={sortValue} onChange={e => onChangeSort(e.target.value)} />
          </Box>
          <ReplyLayout />
          <ReplyLayout />
          <Box className="center-root" p={2}>
            <CircularProgress className={classes.loading} />
          </Box>
        </DialogContent>
      </DialogLayout>
    </Hidden>
  );
};

ArticleReplyDialog.propTypes = {
  open: PropTypes.bool,
  sortValue: PropTypes.number,
  onChangeSort: PropTypes.func,
};

export default ArticleReplyDialog;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 670,
  },
  loading: {
    width: "26px !important",
    height: "26px !important",
    "&, svg": {
      color: theme.palette.primary.main,
    },
  },
}));
