import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, Avatar, Button, Typography, Box, Hidden } from "@material-ui/core";

const Lender = ({ name, avatar, distance, address }) => {
  const classes = useStyles();
  return (
    <Box display="flex" width="100%" justifyContent="space-between" alignItems="center" py={2}>
      <Box display="flex" mr={{ xs: 1.5, sm: 3, md: 5 }} width="100%">
        <Button
          size="large"
          disabled
          classes={{ disabled: classes.disabledButton }}
          startIcon={
            <Avatar src={avatar} className={classes.avatar}>
              {name}
            </Avatar>
          }
        >
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between" mb={1}>
              <span className={clsx("eclipse", classes.alignLeft)}>{name}</span>
              <Hidden xsDown>
                <Distance distance={distance} />
              </Hidden>
            </Box>
            <Typography variant="body2" className={clsx("eclipse", "eclipse-2", "grey-text")} align="left">
              {address}
            </Typography>
            <Hidden smUp>
              <Distance distance={distance} className="mt-8" />
            </Hidden>
          </Box>
        </Button>
      </Box>
      <Button variant="contained" className={clsx("dark-blue-button", classes.button)}>
        Mượn sách
      </Button>
    </Box>
  );
};

const Distance = ({ distance, ...otherProps }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" {...otherProps}>
      <Avatar className={clsx(classes.addressIcon, "mr-4")} src="/images/ic-address.png">
        Address icon
      </Avatar>
      <Typography variant="body2">{distance}</Typography>
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
    padding: theme.spacing(1.5, 2),
    minWidth: "fit-content",
    height: 43,
    [theme.breakpoints.down("xs")]: {
      height: 33,
      padding: theme.spacing(1, 1.5),
    },
  },
  disabledButton: {
    color: `${theme.palette.text.primary} !important`,
  },
}));

Distance.propTypes = {
  distance: PropTypes.string,
};

Lender.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  avatar: PropTypes.string,
  distance: PropTypes.string,
};

export default Lender;
