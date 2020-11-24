import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, DialogContent, DialogActions, Button, Grid, Typography, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Dialog from "components/DialogLayout";
import DialogTitle from "components/DialogLayout/DialogTitle";
import { LangConstant } from "const";
import SettingTypeTabs from "./SettingTypeTabs";
import PreviewArticle from "./PreviewArticle";
import CategorySelect from "./CategorySelect";
import TagAutocomplete from "./TagAutocomplete";
import BookAutocomplete from "./BookAutocomplete";
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
  ...otherProps
}) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
  const [type, setType] = useState(0);

  const onChangeType = (e, newType) => {
    setType(newType);
  };

  return (
    <Dialog onBackdropClick={() => onClose()} {...otherProps} classes={{ paper: classes.paper }}>
      <DialogTitle title={getLabel("TXT_SETTING_TITLE")} onClose={onClose} />
      <DialogContent>
        <Grid container className={classes.contentWrapper}>
          <Grid item xs={12} lg={6}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">{getLabel("TXT_PREVIEW_ARTICLE")}</Typography>
              <SettingTypeTabs value={type} onChange={onChangeType} />
            </Box>
            <PreviewArticle
              type={type}
              rate={rate}
              title={title}
              content={content}
              isReviewType={isReviewType}
              bookName={bookName}
              tagsList={tagsList}
              defaultCover={defaultCover}
              categoryTitle={!isReviewType ? getTitleByIdFromArray(categoryId, categoryList) : null}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CategorySelect
              categoryId={categoryId}
              categoryList={categoryList}
              onChangeCategoryId={onChangeCategoryId}
            />
            <Box mt={4} mb={3}>
              <Typography variant="subtitle1">{getLabel("TXT_SETTING_TITLE")}</Typography>
            </Box>
            <BookAutocomplete
              booksSuggestion={booksSuggestion}
              booksList={booksList}
              onChangeBooksList={onChangeBooksList}
              isReviewType={isReviewType}
            />
            <TagAutocomplete tagsSuggestion={tagsSuggestion} tagsList={tagsList} onChangeTagsList={onChangeTagsList} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="large"
          className={clsx("light-blue-button", classes.button)}
          onClick={() => onClose()}
        >
          {getLabel("TXT_SAVE_DRAFT")}
        </Button>
        <Button
          disabled={isDisabled}
          variant="contained"
          size="large"
          className={clsx("dark-blue-button", classes.button)}
        >
          {getLabel("TXT_POST_ARTICLE")}
        </Button>
      </DialogActions>
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
};

export default SettingPopup;

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 980,
    height: 570,
    maxHeight: "90%",
    [theme.breakpoints.down("md")]: {
      maxWidth: 670,
      maxHeight: "90%",
      height: 780,
    },
  },
  button: {
    height: 45,
    width: 160,
    padding: 0,
  },
  contentWrapper: {
    marginTop: theme.spacing(2),
    "&>*:nth-child(1)": {
      paddingRight: theme.spacing(3),
    },
    "&>*:nth-child(2)": {
      paddingLeft: theme.spacing(3),
    },
    [theme.breakpoints.down("md")]: {
      flexFlow: "column-reverse",
      "&>*": {
        paddingRight: "0 !important",
        paddingLeft: "0 !important",
      },
    },
  },
}));
