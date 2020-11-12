import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Paper, Box, Button, Avatar, useTheme, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import StringFormat from "string-format";
const IMG_HEIGHT = 378;

const ChallengeCover = ({ isDone, isEnd, joined }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Box className={classes.root}>
      <Avatar alt="cover" src="/images/img-goal.jpg" variant="square" className={classes.img} />
      {!isMobile && <Paper elevation={1} className={classes.coverBack} />}
      <Paper elevation={1} className={classes.content}>
        {joined && (
          <Box className={classes.detail}>
            {!isMobile && (
              <Typography variant="subtitle1" className="processLabel">
                {getLabel("L_PROCESS")}
              </Typography>
            )}
            {isDone ? (
              <Box className={clsx(!isMobile && [classes.icLine1, "ic-check"], isDone && classes.isDone)}>
                <Typography variant="body1" component="span">
                  {StringFormat(getLabel("FM_PROGRESS"), 0, 69)}
                </Typography>
              </Box>
            ) : (
              <Box className={!isMobile ? clsx(classes.icLine1, "ic-bullseye") : null}>
                <Typography variant="body1" component="span">
                  {StringFormat(getLabel("FM_PROGRESS"), 0, 69)}
                </Typography>
              </Box>
            )}

            <Box className={clsx(classes.icLine2, classes.gray, "ic-calendar-alt")}>
              {isEnd ? (
                <Typography variant={isMobile ? "body2" : "body1"} component="span">
                  {getLabel("L_END")}
                </Typography>
              ) : (
                <Typography variant={isMobile ? "body2" : "body1"} component="span">
                  {"Còn 30 ngày nữa"}
                </Typography>
              )}
            </Box>
          </Box>
        )}
        {joined ? (
          <Box className={classes.btnContainer}>
            <Button
              fullWidth
              size={isMobile ? "small" : "large"}
              color="primary"
              variant="contained"
              className={classes.btn}
            >
              {getLabel("L_UPDATE_PROGRESS")}
            </Button>
          </Box>
        ) : (
          <Button fullWidth size={isMobile ? "medium" : "large"} color="primary" variant="contained">
            {getLabel("L_JOIN")}
          </Button>
        )}
      </Paper>
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
    objectFit: "contain !important",
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
  content: {
    borderRadius: "0px 0px 10px 10px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    zIndex: 2,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
      justifyContent: "space-around",
      position: "absolute",
      bottom: "0",
      alignItems: "center",
      height: "75px",
    },
  },
  btnContainer: {
    width: "100%",
    minHeight: "45px",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      width: "40%",
    },
  },
  joinBtn: {
    height: "100%",
    backgroundColor: theme.palette.text.link,
    color: theme.palette.white,
  },
  detail: {
    marginBottom: theme.spacing(2),
    "&>:nth-child(n+2)": {
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
      "&>:nth-child(n+2)": {
        marginTop: 0,
      },
    },
  },
  icLine1: {
    "&>:first-child": {
      margin: "4px",
    },
  },
  icLine2: {
    "&>:first-child": {
      margin: theme.spacing(1),
    },
  },
  gray: {
    color: theme.palette.text.secondary,
  },
  isDone: {
    color: theme.palette.text.link,
  },
}));
export default ChallengeCover;
