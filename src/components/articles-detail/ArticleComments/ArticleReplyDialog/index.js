import React, { memo } from "react";
import { DialogLayout } from "components";
import PropTypes from "prop-types";
import { Box, DialogContent, DialogTitle, makeStyles, Typography, Hidden, Divider } from "@material-ui/core";
import AddingReply from "./AddingReply";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import SortSelect from "./SortSelect";
import CommentWrapper from "../CommentWrapper";

const ArticleReplyDialog = ({ sortValue, hasSortChange, onChangeSort, onScroll, ...otherProps }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);

  return (
    <Hidden xsDown>
      <DialogLayout className={classes.root} maxWidth="md" {...otherProps}>
        <DialogTitle disableTypography>
          <AddingReply />
        </DialogTitle>
        <Divider className={classes.divider} />
        <Box className="space-between-root" mb={2} mx={3}>
          <Typography variant="subtitle1" className={classes.listComments}>
            {getLabel("TXT_ARTICLE_LIST_COMMENTS")}
          </Typography>
          <SortSelect value={sortValue} onChange={e => onChangeSort(e.target.value)} />
        </Box>
        <DialogContent onScroll={onScroll}>
          <CommentWrapper sortValue={sortValue} isPopup hasSortChange={hasSortChange} />
        </DialogContent>
      </DialogLayout>
    </Hidden>
  );
};

ArticleReplyDialog.propTypes = {
  sortValue: PropTypes.number,
  hasSortChange: PropTypes.bool,
  onChangeSort: PropTypes.func,
  onScroll: PropTypes.func,
};

export default memo(ArticleReplyDialog);

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 670,
  },
  divider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(-1),
  },
}));
