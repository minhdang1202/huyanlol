import React, { useState } from "react";
import { makeStyles, DialogContent, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Dialog, { PADDING_X_DIALOG } from "components/DialogLayout";
import DialogTitle from "components/DialogLayout/DialogTitle";
import { LangConstant } from "const";
import PreviewArticle from "./PreviewArticle";
import SettingDialogActions from "./SettingDialogActions";
import SettingOptions from "./SettingOptions";
import SettingThumbnails from "./SettingThumbnails";
import { getTitleByIdFromArray } from "utils";

const SettingPopup = ({
  onClose,
  rate,
  isReviewType,
  title,
  content,
  bookName,
  categoryId,
  categoryList,
  onChangeCategoryId,
  tagsSuggestion,
  tagsList,
  onChangeTagsList,
  booksSuggestion,
  booksList,
  onChangeBooksList,
  defaultCover,
  isDisabled,
  currentCover,
  currentThumbnail,
  coverList,
  thumbnailList,
  onChangeCurrentCover,
  onChangeCurrentThumbnail,
  ...otherProps
}) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  const [type, setType] = useState(0);

  const onChangeType = (e, newType) => {
    setType(newType);
  };

  return (
    <Dialog onBackdropClick={() => onClose()} {...otherProps} classes={{ paper: classes.paper }}>
      <DialogTitle title={getLabel("TXT_SETTING_TITLE")} />
      <DialogContent className={classes.dialogContent}>
        <Grid container className={classes.contentWrapper}>
          <Grid item xs={12} lg={6}>
            <SettingOptions
              categoryId={categoryId}
              categoryList={categoryList}
              onChangeCategoryId={onChangeCategoryId}
              booksSuggestion={booksSuggestion}
              booksList={booksList}
              onChangeBooksList={onChangeBooksList}
              isReviewType={isReviewType}
              tagsSuggestion={tagsSuggestion}
              tagsList={tagsList}
              onChangeTagsList={onChangeTagsList}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <SettingThumbnails
              currentThumbnail={type == 0 ? currentThumbnail : currentCover}
              thumbnailList={type == 0 ? thumbnailList : coverList}
              onChangeCurrentThumbnail={type == 0 ? onChangeCurrentThumbnail : onChangeCurrentCover}
            />
            <PreviewArticle
              type={type}
              rate={rate}
              title={title}
              content={content}
              isReviewType={isReviewType}
              bookName={bookName}
              tagsList={tagsList}
              currentThumbnail={type == 0 ? currentThumbnail : currentCover}
              onChangeType={onChangeType}
              categoryTitle={!isReviewType ? getTitleByIdFromArray(categoryId, categoryList) : null}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <SettingDialogActions isDisabled={isDisabled} onClose={onClose} />
    </Dialog>
  );
};

SettingPopup.propTypes = {
  onClose: PropTypes.func,
  rate: PropTypes.number,
  isReviewType: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  bookName: PropTypes.string,
  categoryId: PropTypes.number,
  categoryList: PropTypes.array,
  tagsSuggestion: PropTypes.array,
  tagsList: PropTypes.array,
  onChangeCategoryId: PropTypes.func,
  onChangeTagsList: PropTypes.func,
  booksSuggestion: PropTypes.array,
  booksList: PropTypes.array,
  onChangeBooksList: PropTypes.func,
  defaultCover: PropTypes.string,
  isDisabled: PropTypes.bool,
  currentCover: PropTypes.object,
  currentThumbnail: PropTypes.object,
  coverList: PropTypes.array,
  thumbnailList: PropTypes.array,
  onChangeCurrentCover: PropTypes.func,
  onChangeCurrentThumbnail: PropTypes.func,
};

export default SettingPopup;

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 980,
    height: 675,
    maxHeight: "90%",
    [theme.breakpoints.down("md")]: {
      maxWidth: 670,
      maxHeight: "90%",
      height: 780,
    },
  },
  dialogContent: {
    paddingBottom: 0,
  },
  contentWrapper: {
    minHeight: `calc(100% - ${theme.spacing(1)}px)`,
    "&>*:nth-child(1)": {
      marginTop: theme.spacing(2),
      paddingRight: theme.spacing(3),
    },
    "&>*:nth-child(2)": {
      padding: theme.spacing(0, 0, 2, 2),
      position: "relative",
      "&:before": {
        background: theme.palette.grey[100],
        content: '""',
        width: `calc(100% + ${PADDING_X_DIALOG})`,
        height: `calc(100% + ${theme.spacing(2)}px)`,
        top: theme.spacing(-1),
        left: 0,
        position: "absolute",
        zIndex: 0,
        [theme.breakpoints.down("md")]: {
          width: `calc(100% + ${PADDING_X_DIALOG} * 2)`,
          left: `-${PADDING_X_DIALOG}`,
        },
      },
    },
    [theme.breakpoints.down("md")]: {
      "&>*": {
        paddingRight: "0 !important",
        paddingLeft: "0 !important",
      },
    },
  },
}));
