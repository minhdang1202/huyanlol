import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Divider, makeStyles } from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";
import { createBlockStyleButton } from "draft-js-buttons";
import { QuoteIcon } from "icons";
import ToggleButton from "./StyledToggleButton";
import { InlineToolbar } from "./index";
import LinkInput, { LINK_INPUT_ID } from "./LinkInput";
import { getEntityLink } from "../../../utils/editor";

const CustomInlineToolbar = ({
  editorState,
  inlineBtn,
  onChangeInlineBtn,
  onOpenLinkInput,
  urlValue,
  onChangeUrlValue,
  onCloseLinkInput,
  onSubmitUrlValue,
  onRemoveLink,
  anchorLinkInput,
}) => {
  const linkInput = document.getElementById(LINK_INPUT_ID);
  const classes = useStyles({ hasUrl: getEntityLink(editorState) });

  useEffect(() => {
    if (linkInput) {
      linkInput.focus();
    }
  }, [linkInput]);

  return (
    <Box className={classes.root}>
      <InlineToolbar>
        {externalProps => (
          <ToggleButtonGroup
            value={inlineBtn}
            exclusive
            onChange={(e, newInlineBtn) => onChangeInlineBtn(e, newInlineBtn)}
          >
            <ToggleButton value="h5" component="div">
              <HeadlineFiveButton {...externalProps} />
            </ToggleButton>
            <ToggleButton value="h6" component="div">
              <HeadlineSixButton {...externalProps} />
            </ToggleButton>
            <Divider orientation="vertical" className={classes.divider} flexItem />
            <ToggleButton value="blockquote" component="div">
              <BlockquoteButton {...externalProps} />
            </ToggleButton>
            <ToggleButton value="link" component="div" onClick={e => onOpenLinkInput(e)}>
              <LinkButton {...externalProps} />
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </InlineToolbar>
      <LinkInput
        open={Boolean(anchorLinkInput)}
        anchorEl={anchorLinkInput}
        onClose={() => onCloseLinkInput()}
        urlValue={urlValue}
        onChangeUrlValue={e => onChangeUrlValue(e)}
        onSubmitUrlValue={e => onSubmitUrlValue(e)}
        onRemoveLink={() => onRemoveLink()}
      />
    </Box>
  );
};

CustomInlineToolbar.propTypes = {
  inlineBtn: PropTypes.string,
  onChangeInlineBtn: PropTypes.func,
  onOpenLinkInput: PropTypes.func,
  urlValue: PropTypes.string,
  onChangeUrlValue: PropTypes.func,
  onCloseLinkInput: PropTypes.func,
  onSubmitUrlValue: PropTypes.func,
  onRemoveLink: PropTypes.func,
  anchorLinkInput: PropTypes.object,
  editorState: PropTypes.object,
};

const BlockquoteButton = createBlockStyleButton({
  blockType: "blockquote",
  children: <QuoteIcon />,
});

const HeadlineFiveButton = createBlockStyleButton({
  blockType: "header-five",
  children: (
    <Box fontSize={26} fontWeight="bold">
      T
    </Box>
  ),
});

const HeadlineSixButton = createBlockStyleButton({
  blockType: "header-six",
  children: (
    <Box fontSize={18} fontWeight="bold">
      T
    </Box>
  ),
});

const LinkButton = createBlockStyleButton({
  blockType: null,
  children: <Box className="ic-link" fontSize={16} />,
});

export default CustomInlineToolbar;

const useStyles = makeStyles(theme => ({
  root: {
    "& [class^='draftJsToolbar__toolbar']": {
      "& [class*='separator']": {
        margin: 0,
        width: 2,
      },
      "& svg": {
        fill: theme.palette.text.primary,
      },
      "& [class*='active']": {
        color: theme.palette.primary.main,
        "& .ic-link": { color: theme.palette.text.primary },
        "& svg": {
          fill: theme.palette.primary.main,
        },
      },
      "& .ic-link": {
        color: ({ hasUrl }) => (hasUrl ? theme.palette.primary.main : theme.palette.text.primary),
      },
      display: "flex",
      transform: "translate(-20%, -10%)  !important",
      alignItems: "center",
      justifyContent: "center",
      padding: 2,
      boxShadow: "none",
      borderRadius: 6,
      "&:after": {
        display: "none",
      },
      "&:before": {
        display: "none",
      },
      "& button": {
        color: theme.palette.text.primary,
        background: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        "&:hover": {
          "& svg": {
            fill: theme.palette.primary.main,
          },
          "& .ic-link": { color: theme.palette.primary.main },
          color: theme.palette.primary.main,
        },
        "& svg": {
          width: 16,
        },
      },
      "& button:last-child": {
        padding: theme.spacing(0, 1),
        width: 36,
        height: 34,
      },
      "& input": {
        height: 40,
        outline: "none",
        border: "none",
        width: "auto",
        minWidth: 200,
        padding: theme.spacing(0, 1.5),
        maxWidth: "100%",
        "&::placeholder": {
          color: theme.palette.grey[500],
        },
      },
    },
  },
  divider: {
    width: 1,
  },
}));
