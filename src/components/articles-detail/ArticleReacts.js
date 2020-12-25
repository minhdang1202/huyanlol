import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import clsx from "clsx";
import StringFormat from "string-format";
import { useTranslation } from "react-i18next";
import { Button, Typography, Box, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import GiversList from "./GiversList";
import PropTypes from "prop-types";
import { AppConstant } from "const";

const ArticleReacts = ({ tempReactCount }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { reactCount, commentCount, articleId } = useSelector(({ articleRedux }) => articleRedux.article, shallowEqual);
  const { t: getLabel } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [isOpenGivers, setIsOpenGivers] = useState(false);

  const onOpenGiversList = () => {
    setIsOpenGivers(true);
  };

  const onCloseGiversList = () => {
    setIsOpenGivers(false);
    localStorage.removeItem("isOpenGiversList");
  };

  const getTotalReactCount = (base, temp) => {
    if (!base) base = 0;
    return temp <= AppConstant.USER_MAX_REACT_COUNT ? base + temp : base + AppConstant.USER_MAX_REACT_COUNT;
  };

  useEffect(() => {
    const hasOpenGivers = localStorage.getItem("isOpenGiversList");
    if (hasOpenGivers) setIsOpenGivers(true);
  }, []);

  return (
    <>
      {isOpenGivers && (
        <GiversList
          isOpen={true}
          onClose={onCloseGiversList}
          reactCount={getTotalReactCount(reactCount, tempReactCount)}
          articleId={articleId}
        />
      )}
      {isMobile ? (
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button
            className={clsx(classes.loveButton, classes.button)}
            startIcon={<Box className="ic-heart" />}
            onClick={onOpenGiversList}
          >
            <Typography variant="body2" className="grey-text">
              {getTotalReactCount(reactCount, tempReactCount)}
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
          <Typography>{StringFormat(getLabel("FM_LOVE"), getTotalReactCount(reactCount, tempReactCount))}</Typography>
        </Button>
      )}
    </>
  );
};

ArticleReacts.propTypes = {
  tempReactCount: PropTypes.number,
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
