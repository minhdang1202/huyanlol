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

const SettingPopup = ({
  onClose,
  rate,
  isReviewType,
  title,
  content,
  bookName,
  categoryId,
  categoriesList,
  onChangeCategoryId,
  tagsList,
  onChangeTagsList,
  booksList,
  onChangeBooksList,
  isDisabled,
  coverId,
  thumbnailId,
  thumbnailList,
  onChangeCoverId,
  onChangeThumbnailId,
  onChangeThumbnailList,
  onClickPostArticle,
  onClickSaveDraft,
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
              categoriesList={categoriesList}
              onChangeCategoryId={onChangeCategoryId}
              booksList={booksList}
              onChangeBooksList={onChangeBooksList}
              tagsList={tagsList}
              isReviewType={isReviewType}
              onChangeTagsList={onChangeTagsList}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <SettingThumbnails
              thumbnailId={type == 0 ? thumbnailId : coverId}
              thumbnailList={thumbnailList}
              onChangeThumbnailId={type == 0 ? onChangeThumbnailId : onChangeCoverId}
              onChangeThumbnailList={onChangeThumbnailList}
            />
            <PreviewArticle
              type={type}
              rate={rate}
              title={title}
              content={content}
              isReviewType={isReviewType}
              bookName={bookName}
              tagsList={tagsList}
              thumbnailId={type == 0 ? thumbnailId : coverId}
              onChangeType={onChangeType}
              categoryTitle={!isReviewType ? getTitleByIdFromArray(categoryId, categoriesList) : null}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <SettingDialogActions
        isDisabled={isDisabled}
        onClose={onClose}
        onClickPostArticle={onClickPostArticle}
        onClickSaveDraft={onClickSaveDraft}
      />
    </Dialog>
  );
};

const getTitleByIdFromArray = (id, array) => {
  if (array.length) {
    const result = array.filter(obj => obj.categoryId === id);
    if (result.length) return result[0].title;
  }
};

SettingPopup.propTypes = {
  onClose: PropTypes.func,
  rate: PropTypes.number,
  isReviewType: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  bookName: PropTypes.string,
  categoryId: PropTypes.number,
  categoriesList: PropTypes.array,
  tagsList: PropTypes.array,
  onChangeCategoryId: PropTypes.func,
  onChangeTagsList: PropTypes.func,
  booksList: PropTypes.array,
  onChangeBooksList: PropTypes.func,
  isDisabled: PropTypes.bool,
  coverId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  thumbnailId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  thumbnailList: PropTypes.array,
  onChangeCoverId: PropTypes.func,
  onChangeThumbnailId: PropTypes.func,
  onChangeThumbnailList: PropTypes.func,
  onClickPostArticle: PropTypes.func,
  onClickSaveDraft: PropTypes.func,
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
