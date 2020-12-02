import React, { memo } from "react";
import { Box, makeStyles } from "@material-ui/core";
import CollectionSort from "./CollectionSort";
import ListBooks from "./ListBooks";

const CollectionBooks = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CollectionSort />
      <ListBooks />
    </Box>
  );
};

CollectionBooks.propTypes = {};

export default memo(CollectionBooks);

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
});
