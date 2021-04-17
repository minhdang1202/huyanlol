import React from "react";
import { Box, makeStyles, Typography, Paper } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";

const FaqSearchList = ({ searchResults, setExpandedId, setSearchValue, setSearchResults }) => {
  const classes = useStyles();

  const onClickOpenQuestion = (questionId) => {
    return () => {
      setExpandedId(questionId);
      setSearchValue("");
      setSearchResults([]);
    }
  }

  return (
    <Paper className={classes.root}>
      {searchResults.length ? 
        searchResults.map((searchItem, index) => (
          <Box key={index} className={classes.searchListItem} onClick={onClickOpenQuestion(searchItem.id)}>
            <Box className={clsx("ic-search center-root", classes.icon)}/>
            <Typography className="semiBold-lg-txt">{searchItem.title}</Typography>
          </Box>
        ))
        : ""
      }
    </Paper>
  );
};

export default FaqSearchList;

FaqSearchList.propTypes = {
  searchResults: PropTypes.array,
  setExpandedId: PropTypes.func,
  setSearchValue: PropTypes.func,
  setSearchResults: PropTypes.func,
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    padding: 0,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    borderRadius: 10,
    position: "absolute",
    width: "100%",
    zIndex: 10,
    maxHeight: 300,
    overflow: "auto"
  },
  searchListItem: {
    display: "flex",
    alignItems: "center", 
    padding: theme.spacing(2),
    cursor: "pointer",
    "&>*:first-child": {
      marginRight: theme.spacing(2),
    },
    "&:hover": {
      backgroundColor: theme.palette.primary[100],
      "& $icon": {
        backgroundColor: theme.palette.primary.light,
      }
    },
  },
  icon: {
    width: 44,
    height: 44,
    minWidth: 44,
    borderRadius: "50%",
    color: theme.palette.white,
    backgroundColor: theme.palette.grey[300],
  }
}));
