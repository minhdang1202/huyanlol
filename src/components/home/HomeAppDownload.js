import React from "react";
import { Box, List, ListItem, ListItemText, ListSubheader, makeStyles, Paper, Typography } from "@material-ui/core";
import { DownloadButtons } from "components";
import { useTranslation } from "react-i18next";
import { getCommonKey } from "const/lang.const";
import { LangConstant } from "const";

const HomeAppDownload = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);

  return (
    <Box className={classes.root}>
      <Paper className={classes.main}>
        <Typography variant="subtitle1">{getLabel(getCommonKey("TXT_HOMEPAGE"))}</Typography>
        <Typography variant="subtitle1" className={classes.secondary}>
          {getLabel("TXT_BOOK_SHELVES")}
        </Typography>

        <List
          aria-labelledby="nested-quick-refer"
          subheader={
            <ListSubheader component="div" id="nested-quick-refer" className={classes.shortcutHeader}>
              <Typography variant="subtitle2">{getLabel("TXT_SHORTCUT")}</Typography>
            </ListSubheader>
          }
          className={classes.shortcutContainer}
        >
          <ListItem button className={classes.shortcutItem}>
            <Box style={{}} />
            <ListItemText
              primary={<Typography variant="subtitle1">{getLabel(getCommonKey("TXT_GAT_UP"))}</Typography>}
            />
          </ListItem>
          <ListItem button className={classes.shortcutItem}>
            <Box />
            <ListItemText
              primary={<Typography variant="subtitle1">{getLabel(getCommonKey("TXT_GAT_COMMUNITY"))}</Typography>}
            />
          </ListItem>
        </List>
      </Paper>
      <Typography variant="subtitle2" className={classes.downloadTitle}>
        {getLabel("TXT_DOWNLOAD_APP")}
      </Typography>
      <DownloadButtons />
    </Box>
  );
};

HomeAppDownload.propTypes = {};

export default HomeAppDownload;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "sticky",
    top: theme.spacing(3),
  },
  main: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    padding: "16px 0",
    "& > *": { paddingRight: 16, paddingLeft: 16 },
  },
  secondary: {
    opacity: 0.48,
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  shortcutContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: 0,
    "& > *": { padding: 0 },
  },
  shortcutHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  shortcutItem: {
    marginLeft: -5,
    paddingLeft: 5,
    "&>*:first-child": {
      width: 25,
      height: 25,
      borderRadius: 2,
      background: "#d8d8d8",
      marginRight: 12,
    },
  },
  downloadTitle: {
    marginTop: theme.spacing(1),
    marginBottom: 12,
    color: "#9b9b9b",
    textTransform: "uppercase",
  },
}));
