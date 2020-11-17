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
      <Box className={classes.imgContainer}>
        <Avatar alt="cover" src="/images/img-goal.jpg" variant="square" className={classes.img} />
      </Box>

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
  imgContainer: {
    gridRow: "1 / span 4",
    gridColumn: "1",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    height: IMG_HEIGHT,
    zIndex: "3",
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
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
