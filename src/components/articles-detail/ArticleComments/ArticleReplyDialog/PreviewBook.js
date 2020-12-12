import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { HeartIcon } from "icons";
import { useTranslation } from "react-i18next";
import { AppConstant } from "const";
import clsx from "clsx";
import { AppLink } from "components";
import CustomRating from "components/CustomRating";

const PreviewBook = ({ data }) => {
  const classes = useStyles();

  return (
    <AppLink className={classes.disableUnderline}>
      <Paper className={classes.root} elevation={0}>
        <CardMedia className={classes.cover} title="Nếu chỉ còn một ngày để sống" component="img" />
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" component="p">
            Nếu chỉ còn một ngày để sống
          </Typography>
          <Typography variant="body2" component="p">
            Nếu chỉ còn một ngày để sống
          </Typography>
          <CustomRating readOnly={true} value={2} size="small" />
        </CardContent>
      </Paper>
    </AppLink>
  );
};

PreviewBook.propTypes = {
  data: PropTypes.object,
  isHiddenAction: PropTypes.bool,
};
PreviewBook.defaultProps = { isHiddenAction: false };

export default memo(PreviewBook);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    padding: 16,
    marginTop: 8,
    borderRadius: 8,
    border: "solid 1px " + theme.palette.background.default,
  },
  disableUnderline: {
    textDecoration: "unset",
    "&:hover": {
      textDecoration: "unset",
    },
  },
  cover: {
    width: 97,
    height: 142,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingRight: "50%",

    "& p": {
      lineHeight: "normal",
      marginBottom: 8,
    },
  },
}));
