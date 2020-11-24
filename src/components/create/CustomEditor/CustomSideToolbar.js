import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { SideToolbar } from "./index";
import { getContentSelection } from "./editorUtils";
import { ImageButton, ListButton, BreakButton } from "./SidebarMenu";

const CustomSideToolbar = ({ editorState, onCreateBreakLine, onCreateList }) => {
  const classes = useStyles({ hasHidden: getContentSelection(editorState) });

  return (
    <Box className={classes.root}>
      <SideToolbar>
        {() => (
          <>
            <ImageButton />
            <ListButton onClick={() => onCreateList()} />
            <BreakButton onClick={() => onCreateBreakLine()} />
          </>
        )}
      </SideToolbar>
    </Box>
  );
};

CustomSideToolbar.propTypes = {
  onCreateBreakLine: PropTypes.func,
  onCreateList: PropTypes.func,
  editorState: PropTypes.object,
};

export default CustomSideToolbar;

const WIDTH_SIDEBAR_BUTTON = "40px";
const WIDTH_SIDEBAR = "308px";

const useStyles = makeStyles(theme => ({
  root: {
    display: ({ hasHidden }) => (hasHidden ? "none" : "block"),
    "& [class^='draftJsToolbar__wrapper']": {
      zIndex: 20,
      marginLeft: theme.spacing(2),
      "&:hover": {
        "& [class^='draftJsToolbar__blockType']": {
          transform: "rotate(-45deg)",
        },
      },
    },
    "& [class^='draftJsToolbar__popup']": {
      borderRadius: 6,
      border: `1px solid ${theme.palette.grey[500]}`,
      "&:before": {
        display: "none",
      },
      "&:after": {
        display: "none",
      },
      height: 124,
      width: "fit-content",
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 2),
      top: `calc(${WIDTH_SIDEBAR} * -0.15)`,
      left: `calc(${WIDTH_SIDEBAR_BUTTON} + ${WIDTH_SIDEBAR} / 2 + 5px)`,
    },
    "& [class^='draftJsToolbar__blockType']": {
      border: `1px solid ${theme.palette.grey[300]}`,
      width: WIDTH_SIDEBAR_BUTTON,
      height: WIDTH_SIDEBAR_BUTTON,
      borderRadius: "50%",
      "&:before": {
        content: '"+"',
        fontSize: 25,
        fontWeight: 500,
        position: "absolute",
        top: -1,
        left: 0,
        width: "100%",
        height: "100%",
        color: theme.palette.grey[300],
      },
      "& svg": {
        display: "none",
      },
    },
  },
}));
