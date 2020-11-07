import React from "react";
import { makeStyles, Avatar, Button, Grid } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppConstant } from "const";
import AppLink from "./AppLink";

const DownloadButtons = ({ className }) => {
  const classes = useStyles();
  return (
    <Grid container className={clsx(classes.root, className)}>
      <Grid item>
        <AppLink target="_blank" as={AppConstant.GAT_APP_STORE}>
          <Button>
            <Avatar className={classes.downloadBtn} variant="square" src="/images/img-app-store.png">
              App Store
            </Avatar>
          </Button>
        </AppLink>
      </Grid>
      <Grid item>
        <AppLink target="_blank" as={AppConstant.GAT_GG_PLAY}>
          <Button>
            <Avatar className={classes.downloadBtn} variant="square" src="/images/img-gg-play.png">
              Google Play
            </Avatar>
          </Button>
        </AppLink>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      width: "calc(50% - 4px)",
    },
    "& button": {
      padding: "0 !important",
      width: "fit-content",
    },
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  downloadBtn: {
    width: "100%",
    height: "auto",
    "& > *": {
      objectFit: "contain",
    },
  },
}));

DownloadButtons.propTypes = {
  className: PropTypes.string,
};

export default DownloadButtons;
