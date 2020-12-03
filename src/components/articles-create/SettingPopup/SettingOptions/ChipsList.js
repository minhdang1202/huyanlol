import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Chip from "components/Chip";
import { Box, makeStyles } from "@material-ui/core";

const ChipsList = ({ chipsList, onChangeChipsList, isDisabled, isTag }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {chipsList.map((chip, index) => {
        const label = isTag ? chip.tagName || chip : chip.title;
        const isLastChip = index === chipsList.length - 1;
        const onDelete = () => {
          onChangeChipsList(chipsList.filter(entry => entry !== chip));
        };
        return (
          <Chip
            key={index}
            className={clsx("mb-8", !isLastChip && "mr-12")}
            label={isTag ? `#${label}` : `&${label}`}
            onDelete={!isDisabled ? onDelete : null}
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
  isTag: PropTypes.bool,
};

export default ChipsList;

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    overflowY: "scroll",
  },
}));
