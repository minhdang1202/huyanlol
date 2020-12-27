import React, { useState } from "react";
import { Box, makeStyles, Tabs, Tab, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import StringFormat from "string-format";
import SearchBar from "layouts/MainLayout/components/CustomAppBar/SearchBar";
import PropTypes from "prop-types";

const MobileSearchScreen = ({ onChangeScreen }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [searchObject, setSearchObject] = useState(0);
  const onChangeSearchObject = (event, value) => {
    setSearchObject(value);
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.appBar}>
        <Box className="ic-chevron-left" onClick={e => onChangeScreen(e, 0)} />
        <Box className={classes.searchBarContainer}>
          <SearchBar haveSelect={false} />
        </Box>
      </Box>
      <Box className={classes.tab}>
        <Tabs
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          value={searchObject}
          onChange={onChangeSearchObject}
        >
          <Tab
            icon={<Typography variant="body1">{getLabel("TXT_APPBAR_BOOK")}</Typography>}
            aria-label="phone"
            className={classes.tabItem}
          />
          <Tab
            icon={<Typography variant="body1">{getLabel("TXT_APPBAR_AUTHOR")}</Typography>}
            aria-label="favorite"
            className={classes.tabItem}
          />
          <Tab
            icon={<Typography variant="body1">{getLabel("TXT_APPBAR_USER")}</Typography>}
            aria-label="person"
            className={classes.tabItem}
          />
        </Tabs>
      </Box>
      <Box className={classes.content}>
        <Typography variant="body1" color="textSecondary">
          {StringFormat(getLabel("FM_RESULT"), 0)}
        </Typography>
      </Box>
    </Box>
  );
};
MobileSearchScreen.propTypes = {
  onChangeScreen: PropTypes.func,
};
export default MobileSearchScreen;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    background: theme.palette.white,
  },
  appBar: {
    height: 64,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    display: "flex",
    alignItems: "center",
    fontSize: 18,
  },
  searchBarContainer: {
    height: 44,
    width: "100%",
    paddingLeft: theme.spacing(2),
  },
  tab: {
    height: 56,
    width: "100%",
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    "&>*:first-child": {
      height: "100%",
      "&>*:first-child": {
        height: "100%",
        "&>*:first-child": {
          height: "100%",
        },
      },
    },
  },
  tabItem: {
    textTransform: "none !important",
  },
  content: {
    padding: theme.spacing(2),
    height: "100%",
  },
}));
