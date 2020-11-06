import React, { useState } from "react";
import { Typography, Box, Button, Avatar, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import clsx from "clsx";
import PropTypes from "prop-types";
import { convertUnitToKm } from "utils";
import DialogAppDownload from "components/DialogAppDownload";

const Lender = ({ name, avatar, address, distanceToUser }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const classes = useStyles();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const onOpenDownload = () => {
    setIsDownloadOpen(true);
  };

  const onCloseDownload = () => {
    setIsDownloadOpen(false);
  };

  return (
    <>
      <DialogAppDownload isOpen={isDownloadOpen} onClose={onCloseDownload} />
      <Box>
        <Avatar className={classes.avatar} src={avatar} />
        <Typography className={clsx("eclipse", "mt-12")} variant="subtitle1">
          {name}
        </Typography>
        <Typography className={clsx("eclipse", classes.address)} variant="body2">
          {address}
        </Typography>
        <Box display="flex" mb={1.5}>
          <Avatar className={classes.icon} src="/images/ic-address.png" variant="square" />
          <Typography className="eclipse" variant="body2">
            {convertUnitToKm(distanceToUser)}
          </Typography>
        </Box>
        <Button
          size="small"
          variant="contained"
          className={clsx("light-blue-button", classes.button)}
          onClick={onOpenDownload}
        >
          {getLabel("TXT_EDITION_BORROW_BOOK")}
        </Button>
      </Box>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  icon: {
    width: 12,
    height: 16,
    marginRight: theme.spacing(1),
  },
  avatar: {
    width: 72,
    height: 72,
  },
  address: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1.5),
  },
  button: {
    padding: theme.spacing(1.5, 2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5),
    },
  },
}));

Lender.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  address: PropTypes.string,
  distanceToUser: PropTypes.number,
};

export default Lender;
