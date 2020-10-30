import React from "react";
import { makeStyles, Typography, Paper, Box, Button } from "@material-ui/core";
const ChallengeCover = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.img}>img</Box>
      <Paper elevation={1} className={classes.btnContainer}>
        <Button className={classes.joinBtn}>Join Challenge</Button>
      </Paper>
    </Box>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    alignItems: "center",
    display: "grid",
    gridTemplateRows: "4fr 3fr 1fr 2fr 3fr",
  },
  img: {
    gridRow: "1 / span 4",
    gridColumn: "1",
    margin: " 0px 5% 0px 5%",
    width: "90%",
    height: "377.5px",
    background: "lightblue",
    position: "relative",
    borderRadius: "10px",
  },
  btnContainer: {
    gridRow: "2  / span 5",
    gridColumn: "1",
    borderRadius: "10px",
    width: "100%",
    height: "305px",
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "space-end",
    padding: "16px",
    marginBottom: "20px",
  },

  joinBtn: {
    width: "100%",
    height: "51px",
    color: theme.palette.white,
    backgroundColor: theme.palette.text.link,
    "&:hover": {
      backgroundColor: "#3aa0cc",
    },
  },
}));
export default ChallengeCover;
