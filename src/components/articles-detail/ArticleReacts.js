import React, { useState, useEffect } from "react";
import clsx from "clsx";
import StringFormat from "string-format";
import { useTranslation } from "react-i18next";
import { Button, Typography, Box, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import PropTypes from "prop-types";
import GiversList from "./GiversList";

const ArticleReacts = ({ reactCount, commentCount, articleId }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t: getLabel } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const loveButton = StringFormat(getLabel("FM_LOVE"), reactCount);

  const [isOpenGivers, setIsOpenGivers] = useState(false);

  const onOpenGiversList = () => {
    setIsOpenGivers(true);
  };

  const onCloseGiversList = () => {
    setIsOpenGivers(false);
    localStorage.removeItem("isOpenGiversList");
  };

  useEffect(() => {
    const hasOpenGivers = localStorage.getItem("isOpenGiversList");
    if (hasOpenGivers) setIsOpenGivers(true);
  }, []);

  return (
    <>
      {isOpenGivers && <GiversList isOpen={true} onClose={onCloseGiversList} reactCount={reactCount} articleId={articleId} />}
      {isMobile ? (
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button
            className={clsx(classes.loveButton, classes.button)}
            startIcon={<Box className="ic-heart" />}
            onClick={onOpenGiversList}
          >
            <Typography variant="body2" className="grey-text">
              {reactCount}
            </Typography>
          </Button>
          <Button className={classes.button}>
            <Typography variant="body2" className="grey-text">
              {StringFormat(getLabel("FM_COMMENT"), commentCount)}
            </Typography>
          </Button>
        </Box>
      ) : (
        <Button
          className={clsx(classes.loveButton, classes.button)}
          startIcon={<Box className="ic-heart" />}
          onClick={onOpenGiversList}
        >
          <Typography>{loveButton}</Typography>
        </Button>
      )}
    </>
  );
};

ArticleReacts.propTypes = {
  reactCount: PropTypes.number,
  commentCount: PropTypes.number,
  articleId: PropTypes.number,
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2, 0, 1, 0),
  },
  loveButton: {
    color: theme.palette.error.main,
    "& .ic-heart": {
      fontSize: 20,
      [theme.breakpoints.down("md")]: {
        fontSize: 16,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
      },
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(-1),
    },
  },
}));

export default ArticleReacts;
