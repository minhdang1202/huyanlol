import React from "react";
import {
  makeStyles,
  Typography,
  Paper,
  Box,
  Button,
  Avatar,
  useTheme,
  useMediaQuery,
  Badge,
  Link,
} from "@material-ui/core";
import clsx from "clsx";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import Router from "next/router";
const PositiveMember = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
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
        <Member place={1} />
        <Member place={2} />
        <Member place={3} />
        <Member place={4} />
        {!isTablet && <Member place={5} />}
      </Box>
    </Paper>
  );
};

const Member = ({ place }) => {
  const classes = useStyles();
  const certificate = place => {
    switch (place) {
      case 1:
        return classes.first;
      case 2:
        return classes.second;
      case 3:
        return classes.third;
      default:
        return classes.fourth;
    }
  };
  const onClickAvatar = () => {
    Router.push("/#");
  };
  return (
    <Box className={classes.member}>
      <Badge
        badgeContent={
          <Box className={classes.badgeContainer}>
            <Typography variant="subtitle2">{place}</Typography>
            <Box className={clsx(classes.badge, certificate(place), "ic-certificate")} />
          </Box>
        }
      >
        <Avatar alt="Trump" src="/images/img-avatar.jpg" className={classes.avatar} onClick={onClickAvatar} />
      </Badge>

      <Typography variant="subtitle1" className={classes.name}>
        <Link href="#">name</Link>
      </Typography>
      <Typography variant="body2">xxx</Typography>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(3),
    borderRadius: "10px",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
      padding: theme.spacing(2),
    },
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
      margin: theme.spacing(1),
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
  name: {
    "&>*": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: "-8px",
    },
  },
  badgeContainer: {
    color: theme.palette.white,
    "&>*:nth-child(1)": {
      position: "relative",
      margin: "0 0 -28px -8px",
      zIndex: 2,
    },
  },
  badge: {
    position: "relative",
    margin: "0 0 -20px -20px",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  first: {
    backgroundImage: "linear-gradient(to top, #ffdf00, #ffbb00)",
  },
  second: {
    backgroundImage: "linear-gradient(to top, #00ffe0, #01dacd)",
  },
  third: {
    backgroundImage: "linear-gradient(to top, #ffb800, #c88400)",
  },
  fourth: {
    backgroundImage: "linear-gradient(to top, #d4d4d4, #767676)",
  },
}));
export default PositiveMember;
