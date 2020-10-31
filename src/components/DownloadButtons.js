import React from "react";
import { makeStyles, Avatar, Button, Grid } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import { PathConstant } from "const";
import AppLink from "./AppLink";

const DownloadButtons = ({ className }) => {
  const classes = useStyles();
  return (
    <Grid container className={clsx(classes.root, className)}>
      <Grid item>
        <Button>
          <AppLink as={PathConstant.GAT_APPSTORE}>
            <Avatar className={classes.downloadBtn} variant="square" src="/images/img-app-store.png">
              App Store
            </Avatar>
          </AppLink>
        </Button>
      </Grid>
      <Grid item>
        <Button>
          <AppLink as={PathConstant.GAT_GGPLAY}>
            <Avatar className={classes.downloadBtn} variant="square" src="/images/img-gg-play.png">
              Google Play
            </Avatar>
          </AppLink>
        </Button>
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
