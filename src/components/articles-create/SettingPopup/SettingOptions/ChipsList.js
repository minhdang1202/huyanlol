import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Chip from "components/Chip";
import { Box, makeStyles } from "@material-ui/core";

const ChipsList = ({ chipsList, onChangeChipsList, isDisabled }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {chipsList.map((chip, index) => {
        const label = chip.title || chip;
        const isLastChip = index === chipsList.length - 1;
        return (
          <Chip
            key={index}
            className={clsx("mb-8", !isLastChip && "mr-12")}
            label={`#${label}`}
            onDelete={() => {
              if (!isDisabled) onChangeChipsList(chipsList.filter(entry => entry !== chip));
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
  isDisabled: PropTypes.bool,
};

export default ChipsList;

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    overflowY: "scroll",
  },
}));
