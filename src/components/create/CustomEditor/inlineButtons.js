import React from "react";
import { Box } from "@material-ui/core";
import { createBlockStyleButton } from "draft-js-buttons";
import { QuoteIcon } from "icons";

export const BlockquoteButton = createBlockStyleButton({
  blockType: "blockquote",
  children: <QuoteIcon />,
});

export const HeadlineFiveButton = createBlockStyleButton({
  blockType: "header-five",
  children: (
    <Box fontSize={26} fontWeight="bold">
      T
    </Box>
  ),
});

export const HeadlineSixButton = createBlockStyleButton({
  blockType: "header-six",
  children: (
    <Box fontSize={18} fontWeight="bold">
      T
    </Box>
  ),
});
