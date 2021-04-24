import React from "react";
import { makeStyles, List, ListItem, ListItemText, Divider, Avatar, Box } from "@material-ui/core";
import { AppConstant, LangConstant, PathConstant } from "const";
import { useTranslation } from "react-i18next";
import { AppLink } from "components";
import PropTypes from "prop-types";

const MobileDrawer = ({ anchor, toggleDrawer }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ABOUT_US);
  const NAV_LIST = [
    { title: getLabel("TXT_HOME"), linkTo: AppConstant.WEBSITE_URL },
    { title: getLabel("TXT_INTRODUCTION"), linkTo: PathConstant.ABOUT_US },
    { title: getLabel("TXT_FAQ"), linkTo: PathConstant.INTRODUCTIONS },
  ];

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box className="space-between-root" mb={3}>
        <AppLink target="_self" to={AppConstant.WEBSITE_URL} className="no-style-link">
          <Avatar variant="square" src="/images/logo-white.png" className={classes.logo} />
        </AppLink>
        <Box className="ic-times" color="white" fontSize={24} onCLick={toggleDrawer} />
      </Box>
      <List className={classes.listRoot}>
        {NAV_LIST.map(({ title, linkTo }, index) => (
          <>
            <AppLink key={`mobile-nav-${index}`} target="_blank" to={linkTo} className="no-style-link">
              <ListItem button className={classes.listItemRoot}>
                <ListItemText primary={title} className={classes.navItemText} />
              </ListItem>
            </AppLink>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
};

export default MobileDrawer;

MobileDrawer.propTypes = {
  anchor: PropTypes.string,
  toggleDrawer: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  listRoot: {
    margin: theme.spacing(0, -2),
  },
  listItemRoot: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logo: {
    width: 69,
    height: 36,
  },
  navItemText: {
    color: theme.palette.white,
  },
  iconClose: {
    height: 25,
  },
}));
