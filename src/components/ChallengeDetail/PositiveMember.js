import React from "react";
import { makeStyles, Typography, Paper, Box, Button, Avatar } from "@material-ui/core";
const PositiveMember = () => {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.root}>
      <Box className={classes.top}>
        <Typography variant="h6">sdfsdf</Typography>
        <Button size="small" variant="text">
          More
        </Button>
      </Box>
      <Box className={classes.bottom}>
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
      </Box>
    </Paper>
  );
};

const Member = () => {
  const classes = useStyles();
  return (
    <Box className={classes.member}>
      <Avatar alt="Trump" src="/images/img-avatar.jpg" className={classes.avatar} />
      <Typography variant="subtitle1">name</Typography>
      <Typography variant="body2">xxx</Typography>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "240px",
    padding: theme.spacing(3),
    borderRadius: "10px",
  },
  top: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(3),
    "&>:nth-child(2)": {
      color: theme.palette.text.link,
    },
  },
  bottom: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  member: {
    width: "105px",
    height: "132px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    "&>:nth-child(3)": {
      color: theme.palette.text.secondary,
    },
  },
  avatar: {
    height: "77px",
    width: "77px",
  },
}));
export default PositiveMember;
