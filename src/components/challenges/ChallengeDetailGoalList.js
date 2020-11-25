import React from "react";
import { makeStyles, Typography, Paper, Avatar, useTheme, useMediaQuery, Grid } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { getImageById } from "utils";
import { AppLink } from "components";
import { PathConstant } from "const";
import StringFormat from "string-format";
const GoalList = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  const editions = useSelector(state => state.challengeRedux.detail.detailInfo.editions);
  const data = editions.map(edition => {
    return { id: edition.editionId, img: edition.imageId, title: edition.title };
  });

  const renderImageCount = () => {
    let count;
    if (isMobile) {
      count = 5;
    } else if (isTablet) {
      count = 4;
    } else {
      count = 6;
    }
    if (count === data.length) {
      return count;
    } else {
      return count > data.length ? data.length : count - 1;
    }
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="subtitle1" className={classes.text}>
        {getLabel("L_GOAL_LIST")}
      </Typography>
      <Grid container direction="row" justify="space-around" alignItems="center">
        {data.map((item, index) => {
          const bookURL = StringFormat(PathConstant.FM_BOOK_DETAIL_ID, item.id);
          if (index < renderImageCount()) {
            return (
              <Grid item xs={2} sm={3} className={classes.goalContainer} key={item.id}>
                <AppLink to={bookURL}>
                  <Avatar alt="goal" src={getImageById(item.img)} variant="square" className={classes.goal} />
                </AppLink>
              </Grid>
            );
          }
        })}
        {renderImageCount() < data.length && (
          <Grid item xs={2} sm={3} className={clsx(classes.goalContainer, classes.more)}>
            <Avatar
              alt="goal"
              src={getImageById(data[renderImageCount() + 1].img)}
              variant="square"
              className={classes.goal}
            />
            <Typography variant={isMobile ? "h6" : "h5"}>{`+${data.length - renderImageCount()}`}</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0px 0px 10px 10px",
    marginTop: "2px",
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
      padding: theme.spacing(2),
    },
  },
  text: {
    marginBottom: "16px",
  },
  goalContainer: {
    maxWidth: "94px",
    height: "142px",
    color: theme.palette.white,
    borderRadius: "2px",
    [theme.breakpoints.down("xs")]: {
      maxHeight: "94px",
      maxWidth: "62px",
    },
  },
  goal: {
    width: "100%",
    height: "100%",
    borderRadius: "2px",
  },
  more: {
    cursor: "pointer",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    "&>:nth-child(2)": {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(2px)",
      "-webkit-backdrop-filter": "blur(2px)",
      marginTop: "-142px",
      [theme.breakpoints.down("xs")]: {
        marginTop: "-94px",
      },
    },
  },
}));

export default GoalList;
