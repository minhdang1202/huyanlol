import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import clsx from "clsx";
import { makeStyles, Avatar, Button, Typography, Box, Hidden } from "@material-ui/core";
import { convertUnitToKm } from "utils";
import { AddressIcon } from "icons";
import DialogAppDownload from "components/DialogAppDownload";

const Lender = ({ name, avatar, distanceToUser, address }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
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
      <Box display="flex" width="100%" justifyContent="space-between" alignItems="center" py={2}>
        <Box display="flex" mr={{ xs: 1.5, sm: 3, md: 5 }}>
          <Button
            size="large"
            disabled
            classes={{ disabled: classes.disabledButton }}
            startIcon={<Avatar src={avatar} className={classes.avatar} />}
          >
            <Box display="flex" flexDirection="column" flexGrow={1}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <span className={clsx("eclipse", classes.alignLeft)}>{name}</span>
                <Hidden xsDown>
                  <Distance distance={distanceToUser} />
                </Hidden>
              </Box>
              <Typography variant="body2" className={clsx("eclipse-2", "grey-text")} align="left">
                {address}
              </Typography>
              <Hidden smUp>
                <Distance distance={distanceToUser} className="mt-8" />
              </Hidden>
            </Box>
          </Button>
        </Box>
        <Button variant="contained" className={clsx("dark-blue-button", classes.button)} onClick={onOpenDownload}>
          {getLabel("TXT_EDITION_BORROW_BOOK")}
        </Button>
      </Box>
    </>
  );
};

const Distance = ({ distance, ...otherProps }) => {
  return (
    <Box display="flex" alignItems="center" minWidth="fit-content" {...otherProps}>
      <Box className={clsx("mr-4", "ic-address")} />
      <Typography variant="body2">{convertUnitToKm(distance)}</Typography>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 60,
    height: 60,
    marginRight: theme.spacing(1.5),
    [theme.breakpoints.down("xs")]: {
      width: 42,
      height: 42,
    },
  },
  alignLeft: {
    textAlign: "left",
  },
  addressIcon: {
    width: 11,
    height: 14,
  },
  button: {
    minWidth: "fit-content",
    padding: theme.spacing(0, 1.5),
    height: 43,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0, 1),
      height: 33,
    },
  },
  disabledButton: {
    color: `${theme.palette.text.primary} !important`,
    width: "100%",
    justifyContent: "flex-start",
  },
}));

Distance.propTypes = {
  distance: PropTypes.number,
};

Lender.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  avatar: PropTypes.string,
  distanceToUser: PropTypes.number,
};

export default Lender;
