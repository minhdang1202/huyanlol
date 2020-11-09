import React from "react";
import { makeStyles, Typography, Paper, Box, Button, Avatar } from "@material-ui/core";
import clsx from "clsx";
const IMG_HEIGHT = 378;

const ChallengeCover = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Avatar alt="cover" src="/images/img-goal.jpg" variant="square" className={classes.img} />
      <Paper elevation={1} className={classes.coverBack}></Paper>
      <Paper elevation={1} className={classes.content}>
        <Box className={classes.detail}>
          <Typography variant="subtitle1">Quá trình</Typography>

          <Box className={clsx(classes.icLine, "ic-bullseye")}>
            <Typography variant="body1" component="span">
              Đã đọc 0/13 cuốn sách
            </Typography>
          </Box>
          <Box className={clsx(classes.icLine, "ic-calendar-alt")}>
            <Typography variant="body1" component="span">
              Còn 30 ngày nữa
            </Typography>
          </Box>
        </Box>

        <Button fullWidth size="large" color="primary" variant="contained" className={classes.btn}>
          Cập nhật tiến độ
        </Button>
      </Paper>
    </Box>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
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
  },
  joinBtn: {
    width: "100%",
    height: "45px",
    color: theme.palette.white,
    backgroundColor: theme.palette.text.link,
  },
  detail: {
    marginBottom: theme.spacing(2),
    "&>:nth-child(3)": {
      color: theme.palette.text.secondary,
    },
  },
  icLine: {
    "&>:first-child": {
      margin: theme.spacing(1),
    },
  },
}));
export default ChallengeCover;
