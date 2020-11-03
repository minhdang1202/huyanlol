import React, { useState } from "react";
import { Paper, Typography, Box, Avatar, Button, Hidden, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import CustomRating from "../CustomRating";
import { LangConstant } from "const";
import { AvatarIcon } from "icons";

const WriteReview = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const currentDate = format(new Date(), "MM/dd/yyyy");

  const [isAuth, setIsAuth] = useState(false);
  const [rate, setRate] = useState();

  const onRate = (e, newValue) => {
    if (isAuth) setRate(newValue);
  };

  return (
    <Paper className={clsx("paper", classes.root)}>
      <Typography variant="h6">{getLabel("TXT_BOOKDETAIL_REVIEW")}</Typography>
      <Hidden xsDown>
        <Button
          size="large"
          disabled
          classes={{ startIcon: classes.startIcon, disabled: classes.disabled }}
          startIcon={
            isAuth ? (
              <Avatar src="/images/img-demo-avatar.jpg"></Avatar>
            ) : (
              <AvatarIcon width={46} height={46} className="mr-12" />
            )
          }
        >
          {isAuth ? "Trần Việt Phú" : null}
        </Button>
      </Hidden>
      <Box display="flex" alignItems="center">
        <Typography className="mr-12">{getLabel("TXT_BOOKDETAIL_YOUR_REVIEW")}</Typography>
        <CustomRating onChange={onRate} />
        <Typography variant="body2" className={classes.date}>
          {currentDate}
        </Typography>
      </Box>
      <Button size="large" className={clsx(classes.button, "blue-text")}>
        {getLabel("TXT_BOOKDETAIL_WRITE_REVIEW")}
      </Button>
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0 0 10px 10px !important",
    },
  },
  button: {
    marginLeft: theme.spacing(-1),
  },
  avatar: {
    width: 46,
    height: 46,
  },
  date: {
    color: theme.palette.text.secondary,
    marginLeft: "auto",
  },
  startIcon: {
    marginRight: theme.spacing(1.5),
    "&>*": {
      width: 46,
      height: 46,
    },
  },
  disabled: {
    color: `${theme.palette.text.primary} !important`,
    padding: "0 !important",
  },
}));

export default WriteReview;
