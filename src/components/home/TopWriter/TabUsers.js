import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, makeStyles, Tab, Tabs } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";

const TabUsers = ({ data, ...otherProps }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setListUsers(data);
    }
  }, [data]);

  return (
    <Tabs
      {...otherProps}
      aria-label={getLabel("TXT_LIST_WRITERS")}
      classes={{ root: classes.root, indicator: classes.indicator }}
      TabIndicatorProps={{ style: { left: (otherProps.value - 1) * 64 + 24 } }}
    >
      {listUsers.map((user, index) => (
        <Tab
          value={index + 1}
          label={
            <Avatar src={user.avatar} className={classes.avatar}>
              {(user.name || "").charAt(0)}
            </Avatar>
          }
          key={user.id}
          classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
        />
      ))}
    </Tabs>
  );
};

TabUsers.propTypes = {
  data: PropTypes.array,
};
TabUsers.defaultProps = {};

export default memo(TabUsers);

const useStyles = makeStyles(theme => ({
  root: {},
  indicator: {
    width: "16px !important",
    height: 4,
    borderRadius: 2.5,
    backgroundColor: theme.palette.primary.main,
  },
  tabRoot: {
    minWidth: "max-content",
    padding: 6,
    marginBottom: 8,
  },
  tabSelected: {
    "& $avatar": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
      borderStyle: "solid",
    },
  },
  avatar: {
    width: 52,
    height: 52,
  },
}));
