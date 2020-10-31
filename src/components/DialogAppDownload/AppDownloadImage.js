import React from "react";
import { Hidden, Avatar, makeStyles } from "@material-ui/core";

const AppDownloadImage = () => {
  const classes = useStyles();
  return (
    <Hidden xsDown>
      <Avatar variant="square" src="/images/img-app-download-gat.png" className={classes.root}>
        Gat app
      </Avatar>
    </Hidden>
  );
};

const TOP_DIALOG = "28vh";

export const TOP_IMAGE_SMALL = `calc(${TOP_DIALOG} - 100px)`;
export const TOP_IMAGE_MEDIUM = `calc(${TOP_DIALOG} - 130px)`;
export const TOP_IMAGE_LARGE = `calc(${TOP_DIALOG} - 110px)`;

export const HEIGHT_IMAGE_SMALL = "280px";
export const HEIGHT_IMAGE_MEDIUM = "300px";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    width: "inherit",
    height: HEIGHT_IMAGE_MEDIUM,
    top: TOP_IMAGE_LARGE,
    left: "50%",
    transform: "translate(-50%, 0)",
    "&>*": {
      height: "100%",
      objectFit: "contain",
    },
    [theme.breakpoints.down("md")]: {
      top: TOP_IMAGE_MEDIUM,
    },
    [theme.breakpoints.down("sm")]: {
      height: HEIGHT_IMAGE_SMALL,
      top: TOP_IMAGE_SMALL,
    },
  },
}));

export default AppDownloadImage;
