import React, { useState } from "react";
import MainLayout from "layouts/MainLayout";
import { Box, makeStyles, Tabs, Tab, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import StringFormat from "string-format";
const MobileSearchScreen = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [searchObject, setSearchObject] = useState(0);
  const onChangeSearchObject = (event, value) => {
    setSearchObject(value);
  };
  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default MobileSearchScreen;

const useStyles = makeStyles(theme => ({
  tab: {
    height: 56,
    width: "100%",
    background: theme.palette.white,
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
  },
}));
