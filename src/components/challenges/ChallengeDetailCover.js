import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Paper, Box, Avatar, useTheme, useMediaQuery } from "@material-ui/core";
import Footer from "./ChallengeDetailFooter";
const ChallengeCover = ({ isDone, isEnd, joined }) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Box className={classes.root}>
      <Avatar alt="cover" src="/images/img-goal.jpg" variant="square" className={classes.img} />
      {!isMobile && <Paper elevation={1} className={classes.coverBack} />}
      <Footer isDone={isDone} isEnd={isEnd} joined={joined} />
    </Box>
  );
};

ChallengeCover.propTypes = {
  isDone: PropTypes.bool,
  isEnd: PropTypes.bool,
  joined: PropTypes.bool,
};

ChallengeCover.defaultProps = {
  isDone: false,
  isEnd: false,
  joined: true,
};
const IMG_HEIGHT = 378;
const useStyles = makeStyles(theme => ({
  root: {
    alignItems: "center",
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
    overflow: "hidden",
  },
  img: {
    gridRow: "1 / span 4",
    gridColumn: "1",
    margin: " 0px 5% 0px 5%",
    width: "90%",
    height: IMG_HEIGHT,
    borderRadius: "10px",
    zIndex: "3",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: " 0px",
      borderRadius: "0px",
    },
  },
  coverBack: {
    gridRow: "3  / span 4",
    gridColumn: "1",
    borderRadius: "10px 10px 0px 0px ",
    width: "100%",
    height: IMG_HEIGHT / 2,
  },
}));
export default ChallengeCover;
