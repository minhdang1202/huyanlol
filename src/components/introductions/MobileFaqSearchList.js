import React from "react";
import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";

const MobileFaqSearchList = ({ searchResults, isExistSearchResult, setExpandedId, setSearchValue, setSearchResults }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);
  
  const onClickOpenQuestion = (questionId) => {
    return () => {
      setExpandedId(questionId);
      setSearchValue("");
      setSearchResults([]);
    }
  }

  return (
    <Box className={clsx({[classes.root]: !isExistSearchResult})}>
      {searchResults?.length ? 
        searchResults.map((searchItem, index) => (
          <Box key={index} className={classes.searchListItem} onClick={onClickOpenQuestion(searchItem.id)}>
            <Box className={clsx("ic-search center-root", classes.icon)}/>
            <Typography className="semiBold-lg-txt">{searchItem.title}</Typography>
          </Box>
        ))
        : ""
      }
      {!isExistSearchResult && (
        <Button
          variant="contained"
          className={clsx("dark-blue-button pl-24 pr-24", classes.button)}
          startIcon={<Box className="ic-comment-alt" fontWeight={400} />}
        >
          {getLabel("TXT_MESSAGE_WITH_GAT")}
        </Button>
      )}
    </Box>
  );
};

export default MobileFaqSearchList;

MobileFaqSearchList.propTypes = {
  searchResults: PropTypes.array,
  isExistSearchResult: PropTypes.bool,
  setExpandedId: PropTypes.func,
  setSearchValue: PropTypes.func,
  setSearchResults: PropTypes.func,
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "calc(100% - 80px)"
  },
  searchListItem: {
    display: "flex",
    alignItems: "center", 
    padding: theme.spacing(1.5, 0),
    "&>*:first-child": {
      marginRight: theme.spacing(2),
    }
  },
  icon: {
    width: 34,
    height: 34,
    minWidth: 34,
    borderRadius: "50%",
    color: theme.palette.white,
    backgroundColor: theme.palette.grey[300],
    "&:before": {
      fontSize: "16px"
    }
  },
  button: {
    margin: theme.spacing(0, 11.25)
  }
}));
