import React, { useState } from "react";
import StringFormat from "string-format";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Toolbar, makeStyles, IconButton, Button, Box, Divider, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppBar";
import { ArrowRightIcon, ArrowLeftIcon } from "icons";
import WordCountPopover from "./WordCountPopover";

const CreateToolbar = ({ isDisabled }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const onOpenPopover = event => {
    setAnchorEl(event.currentTarget);
  };
  const onClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar className={classes.root}>
      <IconButton edge="start">
        <Box className={clsx("ic-plus", classes.icon)} />
      </IconButton>
      <IconButton>
        <ArrowLeftIcon />
      </IconButton>
      <IconButton>
        <ArrowRightIcon />
      </IconButton>
      <Divider orientation="vertical" />
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        className={clsx("grey-text", classes.popoverButton)}
        onMouseEnter={onOpenPopover}
        onMouseLeave={onClosePopover}
      >
        {StringFormat(getLabel("FM_CHARACTERS"), 34)}
      </Typography>
      <WordCountPopover id="mouse-over-popover" open={open} anchorEl={anchorEl} onClose={onClosePopover} />
      <IconButton>
        <Box className={clsx("ic-cog", classes.icon)} />
      </IconButton>
      <Button disabled={isDisabled} variant="contained" className={clsx(classes.postButton, "dark-blue-button")}>
        {getLabel("TXT_CREATE_POST")}
      </Button>
    </Toolbar>
  );
};

CreateToolbar.propTypes = {
  isDisabled: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  root: {
    height: HEIGHT_APP_BAR,
    padding: 0,
    "&>:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
    "& button": {
      height: "fit-content",
    },
    "& button:not(:last-child)": {
      width: 40,
      height: 40,
    },
    "& hr": {
      height: "60%",
      width: 2,
    },
  },
  postButton: {
    padding: theme.spacing(0, 1.5),
      // background: theme.palette.grey[300],
      // color: theme.palette.white,
  },
  icon: {
    fontSize: 20,
    color: theme.palette.text.secondary,
  },
  popoverButton: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(1.5),
    height: "100%",
  },
}));

export default CreateToolbar;
