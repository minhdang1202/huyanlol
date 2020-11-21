import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Menu, Box, IconButton, makeStyles } from "@material-ui/core";

const LinkInput = ({ urlValue, onSubmitUrlValue, onChangeUrlValue, onRemoveLink, ...otherProps }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
  const onClick = e => {
    e.preventDefault();
    onRemoveLink();
    otherProps.onClose();
  };

  const onKeyDown = e => {
    if (e.which === 13) {
      onSubmitUrlValue(e);
      otherProps.onClose();
    }
  };

  return (
    <Menu elevation={0} getContentAnchorEl={null} classes={{ paper: classes.paper }} {...otherProps}>
      <IconButton edge="start" onClick={onClick}>
        <Box className="ic-times-circle-light" fontSize={22} width={22} height={22} />
      </IconButton>
      <input
        id={LINK_INPUT_ID}
        placeholder={getLabel("P_CREATE_LINK")}
        value={urlValue}
        onKeyDown={onKeyDown}
        onChange={onChangeUrlValue}
      />
    </Menu>
  );
};

export const LINK_INPUT_ID = "link-input";

LinkInput.propTypes = {
  urlValue: PropTypes.string,
  onSubmitUrlValue: PropTypes.func,
  onChangeUrlValue: PropTypes.func,
  onRemoveLink: PropTypes.func,
};

export default LinkInput;

const WIDTH_INLINE_TOOLBAR = "150px";
const HEIGHT_INLINE_TOOLBAR = "40px";
const WIDTH_INLINE_BUTTON = "40px";

const useStyles = makeStyles(theme => ({
  paper: {
    boxShadow: "none",
    borderRadius: 6,
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: theme.spacing(0, 2),
    height: HEIGHT_INLINE_TOOLBAR,
    display: "flex",
    alignItems: "center",
    marginLeft: `calc(-${WIDTH_INLINE_TOOLBAR} + ${WIDTH_INLINE_BUTTON})`,
    "&>ul": {
      display: "flex",
      padding: 0,
      "& button": {
        marginRight: theme.spacing(1),
        "& *": {
          color: theme.palette.grey[400],
        },
        "&:hover": {
          background: "none",
          "& *": {
            color: theme.palette.grey[500],
          },
        },
      },
      "& input": {
        border: "none",
        "&:focus": {
          outline: "none",
        },
        "&::placeholder": {
          color: theme.palette.grey[500],
        },
      },
    },
  },
}));
