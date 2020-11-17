import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Popover, Box, Typography, makeStyles } from "@material-ui/core";

const WordCountPopover = ({ words, characters, ...otherProps }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
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
      {...otherProps}
    >
      <Box mr={4}>
        <Typography className="grey-text">{getLabel("L_WORDS")}</Typography>
        <Typography id={WORDS_UPDATE_BOX_ID} variant="h5">
          {DEMO_WORDS}
        </Typography>
      </Box>
      <Box>
        <Typography className="grey-text">{getLabel("L_CHARACTERS")}</Typography>
        <Typography id={CHARACTERS_UPDATE_BOX_ID} variant="h5">
          {DEMO_CHARACTERS}
        </Typography>
      </Box>
    </Popover>
  );
};

const DEMO_WORDS = 50;
const DEMO_CHARACTERS = 340;
export const WORDS_UPDATE_BOX_ID = "words-update";
export const CHARACTERS_UPDATE_BOX_ID = "characters-update";

WordCountPopover.propTypes = {
  words: PropTypes.number,
  characters: PropTypes.number,
};

const useStyles = makeStyles(theme => ({
  root: {
    pointerEvents: "none",
  },
  paper: {
    display: "flex",
    boxShadow: "none",
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(-2),
    padding: theme.spacing(1.5, 2),
    borderRadius: 6,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export default WordCountPopover;
