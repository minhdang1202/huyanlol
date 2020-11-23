import React from "react";
import PropTypes from "prop-types";
import Chip from "components/Chip";
import { Box, makeStyles } from "@material-ui/core";

const ChipsList = ({ chipsList, onChangeChipsList }) => {
  return (
    <Box mt={2}>
      {chipsList.map((chip, index) => {
        const label = chip.title || chip;
        const isLastChip = index === chipsList.length - 1;
        return (
          <Chip
            key={index}
            className={isLastChip ? null : "mr-16"}
            label={`#${label}`}
            onDelete={() => {
              onChangeChipsList(chipsList.filter(entry => entry !== chip));
            }}
          />
        );
      })}
    </Box>
  );
};

ChipsList.propTypes = {
  chipsList: PropTypes.array,
  onChangeChipsList: PropTypes.func,
};

export default ChipsList;
