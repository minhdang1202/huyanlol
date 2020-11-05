import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Paper, Typography, Box, Avatar, Button, Hidden, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { convertFormat } from "utils/date";
import { useTranslation } from "react-i18next";
import CustomRating from "../CustomRating";
import { LangConstant } from "const";
import { AvatarIcon } from "icons";
import DialogAppDownload from "components/DialogAppDownload";
import { EditionTypes } from "redux/edition.redux";

const WriteReview = ({ name, avatar, rate, review }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const currentDate = convertFormat(new Date(), "dd/MM/yyyy");

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const onRate = (e, newValue) => {
    if (name) setIsDownloadOpen(true);
  };

  const onOpenDownload = () => {
    setIsDownloadOpen(true);
  };

  const onCloseDownload = () => {
    setIsDownloadOpen(false);
  };

  return (
    <>
      <DialogAppDownload isOpen={isDownloadOpen} onClose={onCloseDownload} />
      <Paper className={clsx("paper", classes.root)}>
        <Typography variant="h6">{getLabel("TXT_EDITION_REVIEW")}</Typography>
        <Hidden xsDown>
          <Button
            size="large"
            disabled
            classes={{ startIcon: classes.startIcon, disabled: classes.disabled }}
            startIcon={name ? <Avatar src={avatar}></Avatar> : <AvatarIcon width={46} height={46} className="mr-12" />}
          >
            {name ? name : null}
          </Button>
        </Hidden>
        <Box display="flex" alignItems="center">
          <Typography className="mr-12">{getLabel("TXT_EDITION_YOUR_REVIEW")}</Typography>
          <CustomRating onChange={onRate} value={rate ? rate : 0} />
          <Typography variant="body2" className={classes.date}>
            {currentDate}
          </Typography>
        </Box>
        <Button size="large" className={clsx(classes.button, "blue-text")} onClick={onOpenDownload}>
          {review ? getLabel("TXT_EDITION_EDIT_REVIEW") : getLabel("TXT_EDITION_WRITE_REVIEW")}
        </Button>
      </Paper>
    </>
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

const mapStateToProps = state => {
  const { name, avatar, rate, review } = state.editionRedux;
  return {
    name,
    avatar,
    rate,
    review,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLendersList: editionId => dispatch({ type: EditionTypes.REQUEST_GET_SELF_REVIEW, editionId: editionId }),
  };
};

WriteReview.propTypes = {
  name: PropTypes.string,
  rate: PropTypes.number,
  review: PropTypes.string,
  avatar: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteReview);
