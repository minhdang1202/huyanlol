import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import {
  Menu,
  Box,
  MenuItem as MuiMenuItem,
  ListItemText as MuiListItemText,
  ListItemIcon as MuiListItemIcon,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { BreakIcon } from "icons";
import ArticleCreateActions from "redux/articleCreate.redux";

const SidebarMenu = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onCreateList = () => dispatch(ArticleCreateActions.createList());
  const onCreateBreakLine = () => dispatch(ArticleCreateActions.createBreakLine());

  return (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      classes={{ paper: classes.paper, list: classes.list }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      {...props}
    >
      <ImageButton onClick={() => console.log("Coming soon :)")} />
      <ListButton onClick={onCreateList} />
      <BreakButton onClick={onCreateBreakLine} />
    </Menu>
  );
};

export const ImageButton = forwardRef((props, ref) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  return (
    <MenuItem {...props} ref={ref}>
      <ListItemIcon>
        <Box className="ic-image" />
      </ListItemIcon>
      <ListItemText primary={getLabel("TXT_IMAGE")} />
    </MenuItem>
  );
});

ImageButton.displayName = "ImageButton";

export const ListButton = ({ className, ...otherProps }) => {
  const isActive = localStorage.getItem("isUnOrderList") === "true";
  const classes = useStyles({ isActive });
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  return (
    <MenuItem className={clsx(classes.listButton, className)} {...otherProps}>
      <ListItemIcon>
        <Box className="ic-list" />
      </ListItemIcon>
      <ListItemText primary={getLabel("TXT_LIST")} />
    </MenuItem>
  );
};

ListButton.propTypes = {
  className: PropTypes.string,
};

export const BreakButton = props => {
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  return (
    <MenuItem {...props}>
      <ListItemIcon>
        <BreakIcon />
      </ListItemIcon>
      <ListItemText primary={getLabel("TXT_BREAK")} />
    </MenuItem>
  );
};

export default SidebarMenu;

const MenuItem = withStyles(theme => ({
  root: {
    flexFlow: "column",
    justifyContent: "center",
    borderRadius: 5,
    width: 92,
    height: 92,
    padding: 0,
    "&:hover": {
      background: theme.palette.grey[100],
    },
  },
}))(MuiMenuItem);

const ListItemIcon = withStyles(theme => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    height: 30,
    color: theme.palette.text.primary,
    "& svg": {
      fill: theme.palette.text.primary,
    },
  },
}))(MuiListItemIcon);

const ListItemText = withStyles(() => ({
  root: {
    flex: 0,
  },
}))(MuiListItemText);

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: 6,
    border: `1px solid ${theme.palette.grey[500]}`,
    marginTop: theme.spacing(2.5),
  },
  list: {
    padding: theme.spacing(2),
    display: "flex",
  },
  listItemText: {
    flex: 0,
  },
  listButton: {
    border: ({ isActive }) => (isActive ? `1px solid ${theme.palette.primary.main}` : "none"),
  },
}));
