import React from "react";
import { IconButton, Box, makeStyles } from "@material-ui/core";

const HeartBadge = () => {
  const classes = useStyles();
  return (
    <IconButton disabled className={classes.root} component="div">
      <Box className="ic-heart" fontSize={10} color="white" />
    </IconButton>
  );
};

export default HeartBadge;

const useStyles = makeStyles(theme => ({
  root: {
    width: 18,
    height: 18,
    border: `1px solid ${theme.palette.white}`,
    background: "radial-gradient(82.39% 62.87% at 50% 0%, #FA9393 0%, #F45A5A 100%)",
  },
}));
