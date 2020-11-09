import React from "react";
import { makeStyles, Typography, Paper, Box, Button, Avatar, useTheme, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
const IMG_HEIGHT = 378;

const ChallengeCover = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Box className={classes.root}>
      <Avatar alt="cover" src="/images/img-goal.jpg" variant="square" className={classes.img} />
      {!isMobile && <Paper elevation={1} className={classes.coverBack} />}
      <Paper elevation={1} className={classes.content}>
        <Box className={classes.detail}>
          {!isMobile && <Typography variant="subtitle1">{getLabel("L_PROCESS")}</Typography>}
          <Box className={!isMobile && clsx(classes.icLine, "ic-bullseye")}>
            <Typography variant="body1" component="span">
              Đã đọc 0/13 cuốn sách
            </Typography>
          </Box>
          <Box className={clsx(classes.icLine, classes.gray, "ic-calendar-alt")}>
            <Typography variant={isMobile ? "body2" : "body1"} component="span">
              Còn 30 ngày nữa
            </Typography>
          </Box>
        </Box>
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
      </Paper>
    </Box>
  );
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
    background: "lightblue",
    borderRadius: "10px",
    zIndex: "10",
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
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
      justifyContent: "space-around",
      position: "absolute",
      bottom: "0",
      alignItems: "center",
      height: "75px",
      zIndex: 1,
    },
  },
  btnContainer: {
    width: "100%",
    height: "45px",
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

    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
  },
  icLine: {
    "&>:first-child": {
      margin: theme.spacing(1),
    },
  },
  gray: {
    color: theme.palette.text.secondary,
  },
}));
export default ChallengeCover;
