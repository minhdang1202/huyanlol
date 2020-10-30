import React from "react";
import { makeStyles, Typography, useTheme, useMediaQuery, Paper, Box, Button } from "@material-ui/core";
const ChallengeDetail = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <div>
      <Paper elevation={1} className={classes.root}>
        <Box className={classes.img}>img</Box>
        <Button className={classes.joinBtn}>Join Challenge</Button>
      </Paper>
    </div>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "180px",
    borderRadius: "10px",
    width: "330px",
    height: "305px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-start",
  },
  img: {
    width: "298px",
    height: "377.5px",
    background: "lightblue",
    position: "absolute",
    top: "163px",
    borderRadius: "10px",
  },
  joinBtn: {
    width: "298px",
    height: "51px",
    position: "relative",
    top: "242px",
    color: theme.palette.white,
    backgroundColor: theme.palette.text.link,
    "&:hover": {
      backgroundColor: "#3aa0cc",
    },
  },
}));
export default ChallengeDetail;
