import React from "react";
import StringFormat from "string-format";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import { AppLink } from "components";

const ReactButtons = ({ reactCount, commentCount, articleUrl }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const onOpenGiversList = () => {
    localStorage.setItem("isOpenGiversList", true);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <AppLink className={classes.link} to={articleUrl}>
        <Button startIcon={<Box className={clsx("ic-heart", classes.heartIcon)} />} onClick={onOpenGiversList}>
          <Typography variant="body2" className={classes.greyText}>
            {reactCount}
          </Typography>
        </Button>
      </AppLink>
      <AppLink className={classes.link} to={articleUrl}>
        <Button>
          <Typography variant="body2" className={classes.greyText}>
            {StringFormat(getLabel("FM_COMMENT"), commentCount)}
          </Typography>
        </Button>
      </AppLink>
    </Box>
  );
};

ReactButtons.propTypes = {
  reactCount: PropTypes.number,
  commentCount: PropTypes.number,
  articleUrl: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  greyText: {
    textTransform: "lowercase",
    color: theme.palette.text.secondary,
  },
  heartIcon: {
    color: theme.palette.error.main,
    fontSize: "12px !important",
    marginRight: "-4px !important",
  },
  link: {
    "&:hover": {
      textDecoration: "none",
    },
    "& button": {
      padding: "4px !important",
      minWidth: "fit-content",
    },
  },
}));

export default ReactButtons;
