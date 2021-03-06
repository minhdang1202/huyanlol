import React from "react";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Popover, Typography, makeStyles } from "@material-ui/core";

const CharCountPopover = props => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);

  return (
    <Popover
      classes={{
        root: classes.root,
        paper: classes.paper,
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      disableRestoreFocus
      {...props}
    >
      <Typography className="grey-text">{getLabel("L_CHARACTERS")}</Typography>
      <Typography id={CHAR_BOX_ID} variant="h5">
        {localStorage.getItem("charCount") || 0}
      </Typography>
    </Popover>
  );
};

export const CHAR_BOX_ID = "char-count";

const useStyles = makeStyles(theme => ({
  root: {
    pointerEvents: "none",
  },
  paper: {
    boxShadow: "none",
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(-2),
    padding: theme.spacing(1.5, 2),
    borderRadius: 6,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export default CharCountPopover;
