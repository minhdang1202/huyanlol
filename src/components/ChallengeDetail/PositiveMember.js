import React from "react";
import { makeStyles, Typography, Paper, Box, Button, Avatar, useTheme, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
const PositiveMember = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Paper elevation={1} className={classes.root}>
      <Box className={classes.top}>
        <Box className={clsx("ic-trophy", classes.icLine)}>
          <Typography variant="h6" component="span">
            {getLabel("L_POSITIVE_MEMBER")}
          </Typography>
        </Box>

        <Button size="small" variant="text">
          {getLabel("L_MORE")}
        </Button>
      </Box>
      <Box className={classes.bottom}>
        <Member />
        <Member />
        <Member />
        <Member />
        {!isMobile && <Member />}
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
    color: theme.palette.warning.main,
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
    [theme.breakpoints.down("xs")]: {
      height: "55px",
      width: "55px",
    },
  },
  icLine: {
    fontSize: "24px",
    "&>:first-child": {
      margin: theme.spacing(2),
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
}));
export default PositiveMember;
