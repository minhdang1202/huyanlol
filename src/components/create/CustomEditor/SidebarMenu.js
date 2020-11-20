import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
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
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
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
      <MenuItem>
        <ListItemIcon>
          <Box className="ic-image" />
        </ListItemIcon>
        <ListItemText primary={getLabel("TXT_IMAGE")} />
      </MenuItem>
      <MenuItem onClick={onCreateList}>
        <ListItemIcon>
          <Box className="ic-list" />
        </ListItemIcon>
        <ListItemText primary={getLabel("TXT_LIST")} />
      </MenuItem>
      <MenuItem onClick={onCreateBreakLine}>
        <ListItemIcon>
          <BreakIcon />
        </ListItemIcon>
        <ListItemText primary={getLabel("TXT_BREAK")} />
      </MenuItem>
    </Menu>
  );
};

SidebarMenu.propTypes = {
  buttonList: PropTypes.array,
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
      background: "none",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}))(MuiMenuItem);

const ListItemIcon = withStyles(() => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    height: 30,
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
}));
