import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Typography, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { getBase64 } from "utils";
import UserActions from "redux/user.redux";
import { Snackbar } from "components";

const UploadButton = ({ onChangeThumbnailId, onChangeThumbnailList }) => {
  const classes = useStyles();
  const inputRef = useRef();

  const dispatch = useDispatch();
  const { imageId, error } = useSelector(({ userRedux }) => userRedux);
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);

  const onUploadImage = async e => {
    const file = e.target.files[0];
    if (file && file.type.indexOf("image/") === 0) {
      dispatch(UserActions.requestImage(await getBase64(file)));
    }
  };

  useEffect(() => {
    if (imageId) {
      onChangeThumbnailId(imageId);
      onChangeThumbnailList(imageId);
      dispatch(UserActions.userSuccess());
    }
  }, [imageId]);

  return (
    <label htmlFor="setting-upload-thumbnail">
      <input
        ref={inputRef}
        hidden
        id="setting-upload-thumbnail"
        name="setting-upload-thumbnail"
        type="file"
        onChange={onUploadImage}
      />
      <Button
        className={classes.button}
        classes={{ label: classes.labelButton }}
        onClick={() => inputRef.current.click()}
      >
        <Box className="ic-plus" fontSize={24} mb="2px" />
        <Typography variant="subtitle2">{getLabel("TXT_ADD")}</Typography>
      </Button>
      {error && <Snackbar error message={error} />}
    </label>
  );
};

UploadButton.propTypes = {
  onChangeThumbnailId: PropTypes.func,
  onChangeThumbnailList: PropTypes.func,
};

export default UploadButton;

const useStyles = makeStyles(theme => ({
  button: {
    minWidth: 74,
    width: 74,
    height: 74,
    border: `1px dashed ${theme.palette.primary.main}`,
    marginRight: theme.spacing(1.25),
  },
  labelButton: {
    flexFlow: "column",
    color: theme.palette.primary.main,
  },
}));
